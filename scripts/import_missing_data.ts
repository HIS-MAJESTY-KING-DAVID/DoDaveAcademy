import fs from 'fs';
import readline from 'readline';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DUMP_PATH = String.raw`C:\Users\KDave237\Downloads\Compressed\db_kulma2146700_2025-01-05_00-18.sql`;

// Levels of dependencies
const LEVELS = [
  // Level 1
  ['type_enseignement', 'sous_systeme', 'payment_method'],
  // Level 2
  ['filiere'],
  // Level 3
  ['specialite'],
  // Level 4
  ['classe', 'membre', 'forum'],
  // Level 5
  ['chapitre', 'exam', 'notification'],
  // Level 6
  ['lesson', 'quiz', 'evaluation', 'payment', 'media'],
  // Level 7
  ['lecture', 'quiz_result', 'evaluation_question']
];

// Sets for FK validation
const validIds = {
  users: new Set<number>(),
  courses: new Set<number>(),
  students: new Set<number>(),
  instructors: new Set<number>(),
  subscriptions: new Set<number>(),
  categories: new Set<number>(),
  skillLevels: new Set<number>(),
  
  // Populated during import
  teachingTypes: new Set<number>(),
  subSystems: new Set<number>(),
  paymentMethods: new Set<number>(),
  majors: new Set<number>(),
  specialties: new Set<number>(),
  classes: new Set<number>(),
  chapters: new Set<number>(),
  lessons: new Set<number>(),
  quizzes: new Set<number>(),
  evaluations: new Set<number>(),
  members: new Set<number>(),
  // Level 7 tables are leaf nodes, no need to store their IDs
};

async function loadBaseIds() {
  console.log('Loading base IDs...');
  const users = await prisma.user.findMany({ select: { id: true } });
  users.forEach(x => validIds.users.add(x.id));
  
  const courses = await prisma.course.findMany({ select: { id: true } });
  courses.forEach(x => validIds.courses.add(x.id));
  
  const students = await prisma.student.findMany({ select: { id: true } });
  students.forEach(x => validIds.students.add(x.id));
  
  const instructors = await prisma.instructor.findMany({ select: { id: true } });
  instructors.forEach(x => validIds.instructors.add(x.id));
  
  const subs = await prisma.subscription.findMany({ select: { id: true } });
  subs.forEach(x => validIds.subscriptions.add(x.id));
  
  const cats = await prisma.category.findMany({ select: { id: true } });
  cats.forEach(x => validIds.categories.add(x.id));
  
  const skills = await prisma.skillLevel.findMany({ select: { id: true } });
  skills.forEach(x => validIds.skillLevels.add(x.id));

  // Also load already imported IDs for resumption capability
  const teachingTypes = await prisma.teachingType.findMany({ select: { id: true } });
  teachingTypes.forEach(x => validIds.teachingTypes.add(x.id));

  const subSystems = await prisma.subSystem.findMany({ select: { id: true } });
  subSystems.forEach(x => validIds.subSystems.add(x.id));

  const paymentMethods = await prisma.paymentMethod.findMany({ select: { id: true } });
  paymentMethods.forEach(x => validIds.paymentMethods.add(x.id));

  const majors = await prisma.major.findMany({ select: { id: true } });
  majors.forEach(x => validIds.majors.add(x.id));

  const specialties = await prisma.specialty.findMany({ select: { id: true } });
  specialties.forEach(x => validIds.specialties.add(x.id));

  const classes = await prisma.class.findMany({ select: { id: true } });
  classes.forEach(x => validIds.classes.add(x.id));

  const chapters = await prisma.chapter.findMany({ select: { id: true } });
  chapters.forEach(x => validIds.chapters.add(x.id));

  const lessons = await prisma.lesson.findMany({ select: { id: true } });
  lessons.forEach(x => validIds.lessons.add(x.id));

  const quizzes = await prisma.quiz.findMany({ select: { id: true } });
  quizzes.forEach(x => validIds.quizzes.add(x.id));

  const evaluations = await prisma.evaluation.findMany({ select: { id: true } });
  evaluations.forEach(x => validIds.evaluations.add(x.id));
  
  const members = await prisma.member.findMany({ select: { id: true } });
  members.forEach(x => validIds.members.add(x.id));

  console.log(`Loaded base IDs. Users: ${validIds.users.size}, Courses: ${validIds.courses.size}, Students: ${validIds.students.size}`);
}

function parseSqlValues(valuesStr: string): any[][] {
  const rows: any[][] = [];
  let currentRow: any[] = [];
  let startIndex = 0;
  let inQuote = false;
  let inParenthesis = false; 
  let escape = false;

  valuesStr = valuesStr.trim().replace(/;$/, '');

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (char === '\\') {
      escape = true;
      continue;
    }

    if (char === "'" && !escape) {
      inQuote = !inQuote;
      continue;
    }

    if (inQuote) {
      continue;
    }

    if (char === '(' && !inParenthesis) {
      inParenthesis = true;
      currentRow = [];
      startIndex = i + 1;
      continue;
    }

    if (char === ')' && inParenthesis) {
      inParenthesis = false;
      const val = valuesStr.substring(startIndex, i);
      currentRow.push(parseValue(val));
      rows.push(currentRow);
      continue;
    }

    if (char === ',' && inParenthesis) {
      const val = valuesStr.substring(startIndex, i);
      currentRow.push(parseValue(val));
      startIndex = i + 1;
      continue;
    }
  }

  return rows;
}

function parseValue(val: string): any {
  val = val.trim();
  if (val.toUpperCase() === 'NULL') return null;
  if (val.startsWith("'") && val.endsWith("'")) {
    // String literal: remove quotes and unescape
    return val.substring(1, val.length - 1)
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .replace(/\\r/g, "\r")
      .replace(/\\n/g, "\n");
  }
  if (val.match(/^-?\d+$/)) return parseInt(val, 10);
  if (val.match(/^-?\d+\.\d+$/)) return parseFloat(val);
  return val;
}

// Map legacy table names to Prisma operations
const tableHandlers: Record<string, (rows: any[]) => Promise<void>> = {
  // Level 1
  'type_enseignement': async (rows) => {
    const items = rows.map(r => ({ id: r[0], name: r[1], slug: r[2] }));
    await prisma.teachingType.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.teachingTypes.add(i.id));
  },
  'sous_systeme': async (rows) => {
    const items = rows.map(r => ({ id: r[0], name: r[1], slug: r[2] }));
    await prisma.subSystem.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.subSystems.add(i.id));
  },
  'payment_method': async (rows) => {
    const items = rows.map(r => ({ id: r[0], label: r[1], code: r[2], slug: r[3] }));
    await prisma.paymentMethod.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.paymentMethods.add(i.id));
  },
  
  // Level 2
  'filiere': async (rows) => {
    const items = rows
      .filter(r => validIds.teachingTypes.has(r[1]))
      .map(r => ({ id: r[0], teachingTypeId: r[1], name: r[2], slug: r[3] }));
    if (items.length) await prisma.major.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.majors.add(i.id));
  },

  // Level 3
  'specialite': async (rows) => {
    const items = rows
      .filter(r => validIds.majors.has(r[1]))
      .map(r => ({ id: r[0], majorId: r[1], name: r[2], slug: r[3] }));
    if (items.length) await prisma.specialty.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.specialties.add(i.id));
  },

  // Level 4
  'classe': async (rows) => {
    const items = rows.map(r => ({
      id: r[0],
      specialtyId: validIds.specialties.has(r[1]) ? r[1] : null,
      skillLevelId: validIds.skillLevels.has(r[2]) ? r[2] : null,
      subSystemId: validIds.subSystems.has(r[3]) ? r[3] : null,
      name: r[4],
      slug: r[5]
    }));
    if (items.length) await prisma.class.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.classes.add(i.id));
  },
  'membre': async (rows) => {
    const items = rows
      .filter(r => validIds.users.has(r[1]))
      .map(r => ({ id: r[0], userId: r[1] }));
    if (items.length) await prisma.member.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.members.add(i.id));
  },
  'forum': async (rows) => {
    const items = rows
      .filter(r => validIds.courses.has(r[1]))
      .map(r => ({ id: r[0], courseId: r[1] }));
    if (items.length) await prisma.forum.createMany({ data: items, skipDuplicates: true });
  },

  // Level 5
  'chapitre': async (rows) => {
    const items = rows
      .filter(r => validIds.courses.has(r[1]))
      .map(r => ({
        id: r[0],
        courseId: r[1],
        title: r[2],
        slug: r[3],
        description: r[4],
        number: r[5]
      }));
    if (items.length) await prisma.chapter.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.chapters.add(i.id));
  },
  'exam': async (rows) => {
    const items = rows
      .filter(r => validIds.users.has(r[1]))
      .map(r => ({
        id: r[0],
        userId: r[1],
        classId: validIds.classes.has(r[2]) ? r[2] : null,
        categoryId: validIds.categories.has(r[3]) ? r[3] : null,
        subject: r[4],
        correction: r[5],
        title: r[6],
        description: r[7],
        publishedAt: r[8] ? new Date(r[8]) : new Date(),
        isPublished: r[9] === 1,
        reference: String(r[10]),
        isValidated: r[11] === 1,
        duration: String(r[12]),
        imageFile: r[13],
        language: r[14]
      }));
    if (items.length) await prisma.exam.createMany({ data: items, skipDuplicates: true });
  },
  'notification': async (rows) => {
    const items = rows
      .filter(r => validIds.users.has(r[1]))
      .map(r => ({
        id: r[0],
        recipientId: r[1],
        createdAt: r[2] ? new Date(r[2]) : new Date(),
        content: r[3],
        isRead: r[4] === 1,
        type: r[5],
        title: r[6]
      }));
    if (items.length) await prisma.notification.createMany({ data: items, skipDuplicates: true });
  },

  // Level 6
  'lesson': async (rows) => {
    const items = rows
      .filter(r => validIds.chapters.has(r[1]))
      .map(r => ({
        id: r[0],
        chapterId: r[1],
        title: r[2],
        slug: r[3],
        content: r[4],
        videoLink: r[5],
        number: r[6],
        poster: r[7],
        updatedAt: r[8] ? new Date(r[8]) : null
      }));
    if (items.length) await prisma.lesson.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.lessons.add(i.id));
  },
  'quiz': async (rows) => {
    const items = rows
      .filter(r => (r[1] && validIds.chapters.has(r[1])) || (r[2] && validIds.courses.has(r[2])))
      .map(r => ({
        id: r[0],
        chapterId: r[1] && validIds.chapters.has(r[1]) ? r[1] : null,
        courseId: r[2] && validIds.courses.has(r[2]) ? r[2] : null,
        question: r[3],
        reference: String(r[4]),
        proposition1: r[5],
        proposition2: r[6],
        proposition3: r[7],
        proposition4: r[8],
        correctPropositions: r[9]
      }));
    if (items.length) await prisma.quiz.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.quizzes.add(i.id));
  },
  'evaluation': async (rows) => {
    const items = rows
      .filter(r => validIds.categories.has(r[1]))
      .map(r => ({
        id: r[0],
        categoryId: r[1],
        title: r[2],
        description: r[3],
        startAt: r[4] ? new Date(r[4]) : null,
        endAt: r[5] ? new Date(r[5]) : null,
        duration: r[6] || 0,
        isGeneratedRandomQuestions: r[7] === 1,
        slug: r[8],
        isPassed: r[9] === 1,
        instructorId: validIds.instructors.has(r[10]) ? r[10] : null,
        isPublished: r[11] === 1
      }));
    if (items.length) await prisma.evaluation.createMany({ data: items, skipDuplicates: true });
    items.forEach(i => validIds.evaluations.add(i.id));
  },
  'payment': async (rows) => {
    const items = rows
      .filter(r => validIds.students.has(r[1]))
      .map(r => ({
        id: r[0],
        studentId: r[1],
        subscriptionId: validIds.subscriptions.has(r[2]) ? r[2] : null,
        courseId: validIds.courses.has(r[3]) ? r[3] : null,
        paymentMethodId: validIds.paymentMethods.has(r[4]) ? r[4] : null,
        paidAt: r[5] ? new Date(r[5]) : new Date(),
        isExpired: r[6] === 1,
        expiredAt: r[7] ? new Date(r[7]) : null,
        reference: String(r[8]),
        amount: r[9] ? parseFloat(r[9]) : 0,
        status: r[10],
        transactionReference: r[11]
      }));
    if (items.length) await prisma.payment.createMany({ data: items, skipDuplicates: true });
  },
  'media': async (rows) => {
    const items = rows
      .filter(r => validIds.courses.has(r[1]))
      .map(r => ({
        id: r[0],
        courseId: r[1],
        videoUrl: r[2],
        mp4File: r[3],
        webMFile: r[4],
        oggFile: r[5],
        imageFile: r[6] || ''
      }));
    if (items.length) await prisma.media.createMany({ data: items, skipDuplicates: true });
  },

  // Level 7
  'lecture': async (rows) => {
    const items = rows
      .filter(r => validIds.students.has(r[1]))
      .map(r => ({
        id: r[0],
        studentId: r[1],
        lessonId: validIds.lessons.has(r[2]) ? r[2] : null,
        chapterId: validIds.chapters.has(r[3]) ? r[3] : null,
        courseId: validIds.courses.has(r[4]) ? r[4] : null,
        startAt: r[5] ? new Date(r[5]) : new Date(),
        endAt: r[6] ? new Date(r[6]) : null,
        isFinished: r[7] === 1,
        reference: String(r[8]),
        note: r[9] ? parseFloat(r[9]) : null
      }));
    if (items.length) await prisma.lecture.createMany({ data: items, skipDuplicates: true });
  },
  'quiz_result': async (rows) => {
    const items = rows
      .filter(r => validIds.quizzes.has(r[1]) && validIds.students.has(r[2]))
      .map(r => ({
        id: r[0],
        quizId: r[1],
        studentId: r[2],
        result: r[3],
        createdAt: r[4] ? new Date(r[4]) : new Date(),
        isCorrect: r[5] === 1,
        score: r[6] ? parseFloat(r[6]) : 0,
        updatedAt: r[7] ? new Date(r[7]) : new Date()
      }));
    if (items.length) await prisma.quizResult.createMany({ data: items, skipDuplicates: true });
  },
  'evaluation_question': async (rows) => {
    const items = rows
      .filter(r => validIds.evaluations.has(r[1]))
      .map(r => ({
        id: r[0],
        evaluationId: r[1],
        question: r[2],
        proposition1: r[3],
        proposition2: r[4],
        proposition3: r[5],
        proposition4: r[6],
        correctPropositions: r[7]
      }));
    if (items.length) await prisma.evaluationQuestion.createMany({ data: items, skipDuplicates: true });
  }
};

const BATCH_SIZES: Record<string, number> = {
  'lesson': 50,
  'lecture': 500,
  'quiz_result': 500,
  'evaluation_question': 500,
  'default': 1000
};

async function processLevel(levelIdx: number, tables: string[]) {
  console.log(`\n=== Processing Level ${levelIdx + 1}: ${tables.join(', ')} ===`);
  const tableSet = new Set(tables);
  const buffers: Record<string, any[]> = {};
  tables.forEach(t => buffers[t] = []);

  const fileStream = fs.createReadStream(DUMP_PATH, { encoding: 'utf8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let currentTable = '';
  let lineCount = 0;
  let processedRows = 0;

  for await (const line of rl) {
    lineCount++;
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (trimmedLine.startsWith('INSERT INTO')) {
      const match = trimmedLine.match(/INSERT INTO `([^`]+)`/);
      if (match) {
        currentTable = match[1];
        if (tableSet.has(currentTable)) {
          const valuesIndex = trimmedLine.indexOf('VALUES');
          if (valuesIndex !== -1) {
             const valuesPart = trimmedLine.substring(valuesIndex + 6);
             const rows = parseSqlValues(valuesPart);
             buffers[currentTable].push(...rows);
             if (buffers[currentTable].length % 100 === 0) {
                 console.log(`  Buffered ${buffers[currentTable].length} rows for ${currentTable}`);
             }
             
             const batchSize = BATCH_SIZES[currentTable] || BATCH_SIZES['default'];
             if (buffers[currentTable].length >= batchSize) {
                await tableHandlers[currentTable](buffers[currentTable]);
                processedRows += buffers[currentTable].length;
                console.log(`  Imported ${processedRows} rows for ${currentTable}...`);
                buffers[currentTable] = [];
             }
          }
        }
      }
    } else if (currentTable && tableSet.has(currentTable) && trimmedLine.startsWith('(')) {
        // Continuation of insert
        const rows = parseSqlValues(trimmedLine);
        buffers[currentTable].push(...rows);
        if (buffers[currentTable].length % 100 === 0) {
            console.log(`  Buffered ${buffers[currentTable].length} rows for ${currentTable}`);
        }
        
        const batchSize = BATCH_SIZES[currentTable] || BATCH_SIZES['default'];
        if (buffers[currentTable].length >= batchSize) {
            await tableHandlers[currentTable](buffers[currentTable]);
            processedRows += buffers[currentTable].length;
            console.log(`  Imported ${processedRows} rows for ${currentTable}...`);
            buffers[currentTable] = [];
        }
    } else if (trimmedLine.startsWith('UNLOCK') || trimmedLine.startsWith('DROP') || trimmedLine.startsWith('CREATE')) {
        currentTable = '';
    }
  }

  // Flush remaining buffers
  for (const table of tables) {
    if (buffers[table].length > 0) {
        await tableHandlers[table](buffers[table]);
        console.log(`  Imported remaining ${buffers[table].length} rows for ${table}.`);
    }
  }
}

async function main() {
  await loadBaseIds();
  
  for (let i = 0; i < LEVELS.length; i++) {
    await processLevel(i, LEVELS[i]);
  }

  console.log('All levels imported successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
