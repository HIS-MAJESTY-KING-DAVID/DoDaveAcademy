
import fs from 'fs';
import readline from 'readline';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DUMP_PATH = String.raw`C:\Users\KDave237\Downloads\Compressed\db_kulma2146700_2025-01-05_00-18.sql`;

// Robust SQL Value Parser (same as in import_legacy_db.ts)
function parseSqlValues(valuesStr: string): any[][] {
  const rows: any[][] = [];
  let currentRow: any[] = [];
  let currentVal = '';
  let inQuote = false;
  let inParenthesis = false; 
  let escape = false;

  valuesStr = valuesStr.trim().replace(/;$/, '');

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];

    if (escape) {
      currentVal += char;
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
      currentVal += char;
      continue;
    }

    if (char === '(' && !inParenthesis) {
      inParenthesis = true;
      currentRow = [];
      continue;
    }

    if (char === ')' && inParenthesis) {
      inParenthesis = false;
      currentRow.push(currentVal);
      currentVal = '';
      rows.push(currentRow);
      continue;
    }

    if (char === ',' && inParenthesis) {
      currentRow.push(currentVal);
      currentVal = '';
      continue;
    }

    if (char === ',' && !inParenthesis) {
      continue;
    }

    if (/\s/.test(char) && currentVal === '') continue;

    currentVal += char;
  }

  return rows;
}

async function getDumpCounts(): Promise<Record<string, number>> {
  const fileStream = fs.createReadStream(DUMP_PATH, { encoding: 'utf8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let currentTable = '';
  const counts: Record<string, number> = {};

  for await (const line of rl) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (trimmedLine.startsWith('INSERT INTO')) {
      const match = trimmedLine.match(/INSERT INTO `([^`]+)`/);
      if (match) {
        currentTable = match[1];
        if (!counts[currentTable]) counts[currentTable] = 0;
        
        const valuesIndex = trimmedLine.indexOf('VALUES');
        if (valuesIndex !== -1) {
             const valuesPart = trimmedLine.substring(valuesIndex + 6);
             const rows = parseSqlValues(valuesPart);
             counts[currentTable] += rows.length;
        }
      }
    } else if (currentTable && trimmedLine.startsWith('(')) {
        const rows = parseSqlValues(trimmedLine);
        if (counts[currentTable] !== undefined) {
             counts[currentTable] += rows.length;
        }
    } else {
        if (trimmedLine.startsWith('UNLOCK') || trimmedLine.startsWith('DROP') || trimmedLine.startsWith('CREATE')) {
            currentTable = '';
        }
    }
  }
  return counts;
}

async function getPrismaCounts() {
  const counts: Record<string, number> = {};
  
  try {
    counts['User (kulmapeck_user)'] = await prisma.user.count();
    counts['Student (eleve)'] = await prisma.student.count();
    counts['Instructor (enseignant)'] = await prisma.instructor.count();
    counts['Course (cours)'] = await prisma.course.count();
    counts['Country (pays)'] = await prisma.country.count();
    counts['Institution (etablissement)'] = await prisma.institution.count();
    counts['Category (categorie)'] = await prisma.category.count();
    counts['SkillLevel (skill_level)'] = await prisma.skillLevel.count();
    counts['Subscription (abonnement)'] = await prisma.subscription.count();
    
    // Add counts for tables not imported but present in dump if needed
    // For now, let's focus on the imported ones.
  } catch (error) {
    console.error('Error getting Prisma counts:', error);
  }
  
  return counts;
}

async function main() {
  console.log('Calculating counts from dump file...');
  const dumpCounts = await getDumpCounts();
  
  console.log('Fetching counts from Supabase (Prisma)...');
  const prismaCounts = await getPrismaCounts();

  console.log('\n--- Comparison Report ---');
  console.log('| Table (Dump Name) | Dump Count | Supabase Count | Difference | Status |');
  console.log('|---|---|---|---|---|');

  const mapping: Record<string, string> = {
    'kulmapeck_user': 'User (kulmapeck_user)',
    'eleve': 'Student (eleve)',
    'enseignant': 'Instructor (enseignant)',
    'cours': 'Course (cours)',
    'pays': 'Country (pays)',
    'etablissement': 'Institution (etablissement)',
    'categorie': 'Category (categorie)',
    'skill_level': 'SkillLevel (skill_level)',
    'abonnement': 'Subscription (abonnement)',
  };

  for (const [dumpTable, prismaLabel] of Object.entries(mapping)) {
    const dumpCount = dumpCounts[dumpTable] || 0;
    const prismaCount = prismaCounts[prismaLabel] || 0;
    const diff = dumpCount - prismaCount;
    let status = '✅ Match';
    if (diff > 0) status = `❌ Missing ${diff}`;
    if (diff < 0) status = `⚠️ Extra ${Math.abs(diff)} (in DB)`;

    console.log(`| ${dumpTable} | ${dumpCount} | ${prismaCount} | ${diff} | ${status} |`);
  }

  console.log('\n--- Other Dump Tables (Not Imported) ---');
  for (const [table, count] of Object.entries(dumpCounts)) {
    if (!mapping[table]) {
      console.log(`- ${table}: ${count} rows`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
