
import fs from 'fs';
import readline from 'readline';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DUMP_PATH = String.raw`C:\Users\KDave237\Downloads\Compressed\db_kulma2146700_2025-01-05_00-18.sql`;

// Store data in memory
const dataStore: Record<string, any[]> = {
  pays: [],
  etablissement: [],
  categorie: [],
  skill_level: [],
  kulmapeck_user: [],
  enseignant: [],
  eleve: [],
  cours: [],
  abonnement: [],
};

// Robust SQL Value Parser
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
      currentRow.push(parseValue(currentVal));
      currentVal = '';
      rows.push(currentRow);
      continue;
    }

    if (char === ',' && inParenthesis) {
      currentRow.push(parseValue(currentVal));
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

function parseValue(val: string): any {
  val = val.trim();
  if (val.toUpperCase() === 'NULL') return null;
  if (val.match(/^\d+$/)) return parseInt(val, 10);
  if (val.match(/^\d+\.\d+$/)) return parseFloat(val);
  return val;
}

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

async function main() {
  console.log('Reading dump file...');
  
  const fileStream = fs.createReadStream(DUMP_PATH, { encoding: 'utf8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let currentTable = '';

  for await (const line of rl) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (trimmedLine.startsWith('INSERT INTO')) {
      const match = trimmedLine.match(/INSERT INTO `([^`]+)`/);
      if (match) {
        currentTable = match[1];
        if (dataStore[currentTable]) {
          const valuesIndex = trimmedLine.indexOf('VALUES');
          if (valuesIndex !== -1) {
             const valuesPart = trimmedLine.substring(valuesIndex + 6);
             const rows = parseSqlValues(valuesPart);
             dataStore[currentTable].push(...rows);
          }
        }
      }
    } else if (currentTable && trimmedLine.startsWith('(')) {
        if (dataStore[currentTable]) {
            const rows = parseSqlValues(trimmedLine);
            dataStore[currentTable].push(...rows);
        }
    } else {
        if (trimmedLine.startsWith('UNLOCK') || trimmedLine.startsWith('DROP') || trimmedLine.startsWith('CREATE')) {
            currentTable = '';
        }
    }
  }

  console.log('Data loaded into memory.');
  console.log(`Users: ${dataStore.kulmapeck_user.length}`);
  console.log(`Students: ${dataStore.eleve.length}`);
  console.log(`Instructors: ${dataStore.enseignant.length}`);
  console.log(`Courses: ${dataStore.cours.length}`);
  console.log(`Countries: ${dataStore.pays.length}`);
  console.log(`Institutions: ${dataStore.etablissement.length}`);

  // 1. Countries
  console.log('Importing Countries...');
  if (dataStore.pays.length > 0) {
      const countries = dataStore.pays
        .filter(row => row.length >= 3)
        .map(row => {
            const [id, code, name, slug] = row;
            return {
                id,
                name: name || 'Unknown',
                slug: slug || 'unknown',
                code: code || 'UN'
            };
        });
      
      for (const batch of chunk(countries, 100)) {
        await prisma.country.createMany({
            data: batch,
            skipDuplicates: true
        });
      }
  }

  // 2. Institutions
  console.log('Importing Institutions...');
  if (dataStore.etablissement.length > 0) {
      const institutions = dataStore.etablissement.map(row => {
          const [id, pays_id, name, ville] = row;
          return {
              id,
              countryId: pays_id,
              name,
              city: ville || 'Unknown'
          };
      });
      for (const batch of chunk(institutions, 100)) {
          await prisma.institution.createMany({
              data: batch,
              skipDuplicates: true
          });
      }
  }

  // 3. Import Users
  console.log('Importing Users...');
  if (dataStore.kulmapeck_user.length > 0) {
      const users = dataStore.kulmapeck_user.map(row => {
          const [id, email, roles, password, is_verified, is_blocked, is_admin, points, especes] = row;
          return {
            id,
            email,
            password, 
            roles: typeof roles === 'string' ? roles : JSON.stringify(roles),
            isVerified: is_verified === 1,
            isBlocked: is_blocked === 1,
            isAdmin: is_admin === 1,
            points: points || 0,
            cash: especes || 0,
          };
      });
      
      for (const batch of chunk(users, 500)) {
          await prisma.user.createMany({
              data: batch,
              skipDuplicates: true
          });
          console.log(`Imported batch of ${batch.length} users`);
      }
  }
  
  // Refresh valid user IDs
  const allUsers = await prisma.user.findMany({ select: { id: true } });
  const validUserIds = new Set(allUsers.map(u => u.id));
  console.log(`Total users in DB: ${validUserIds.size}`);

  // 4. Categories
  console.log('Importing Categories...');
  dataStore.categorie.sort((a, b) => a[0] - b[0]);
  if (dataStore.categorie.length > 0) {
      const categories = dataStore.categorie.map(row => {
          const [id, category_id, name, slug, image_file, is_sub_category] = row;
          return {
            id,
            name,
            slug,
            imageFile: image_file,
            isSubCategory: is_sub_category === 1,
            categoryId: category_id,
          };
      });
       for (const batch of chunk(categories, 100)) {
          await prisma.category.createMany({
              data: batch,
              skipDuplicates: true
          });
      }
  }

  // 5. Skill Levels
  console.log('Importing Skill Levels...');
  if (dataStore.skill_level.length > 0) {
      const skills = dataStore.skill_level.map(row => {
          const [id, name, slug] = row;
          return { id, name, slug };
      });
      for (const batch of chunk(skills, 100)) {
          await prisma.skillLevel.createMany({
              data: batch,
              skipDuplicates: true
          });
      }
  }

  // 6. Instructors
  console.log('Importing Instructors...');
  if (dataStore.enseignant.length > 0) {
      const instructors = dataStore.enseignant
        .filter(row => {
            const userId = row[1];
            if (!validUserIds.has(userId)) {
                console.warn(`Skipping Instructor ${row[0]}: User ${userId} not found`);
                return false;
            }
            return true;
        })
        .map(row => {
            const [id, utilisateur_id, etablissement_id, discipline_id, reference, diplome, recto_cni, verso_cni, selfie_cni, emploi_du_temps, is_validated, details, is_rejected, review, join_at, about_me, is_certified] = row;
            return {
                id,
                userId: utilisateur_id,
                categoryId: discipline_id,
                reference: String(reference), // Ensure string
                diploma: diplome ? String(diplome) : null,
                cniRecto: String(recto_cni),
                cniVerso: String(verso_cni),
                cniSelfie: String(selfie_cni),
                schedule: emploi_du_temps ? String(emploi_du_temps) : null,
                isValidated: is_validated === 1,
                details,
                isRejected: is_rejected === 1,
                review,
                joinAt: join_at ? new Date(join_at) : new Date(),
                aboutMe: about_me,
                isCertified: is_certified === 1,
                institutionId: etablissement_id 
            };
        });

      for (const batch of chunk(instructors, 100)) {
          await prisma.instructor.createMany({
              data: batch,
              skipDuplicates: true
          });
      }
  }

  // Refresh valid instructor IDs
  const allInstructors = await prisma.instructor.findMany({ select: { id: true } });
  const validInstructorIds = new Set(allInstructors.map(i => i.id));
  console.log(`Total instructors in DB: ${validInstructorIds.size}`);

  // 7. Students
  console.log('Importing Students...');
  if (dataStore.eleve.length > 0) {
      const students = dataStore.eleve
        .filter(row => {
             const userId = row[2];
             if (!validUserIds.has(userId)) {
                 console.warn(`Skipping Student ${row[0]}: User ${userId} not found`);
                 return false;
             }
             return true;
        })
        .map(row => {
            const [id, classe_id, utilisateur_id, etablissement_id, reference, join_at, is_premium] = row;
            return {
                id,
                userId: utilisateur_id,
                reference: String(reference), // Ensure string
                joinAt: join_at ? new Date(join_at) : new Date(),
                isPremium: is_premium === 1,
                institutionId: etablissement_id
            };
        });
        
       for (const batch of chunk(students, 500)) {
          await prisma.student.createMany({
              data: batch,
              skipDuplicates: true
          });
      }
  }

  // 8. Courses
  console.log('Importing Courses...');
  if (dataStore.cours.length > 0) {
      const courses = dataStore.cours
        .filter(row => {
            const instructorId = row[1];
            if (!validInstructorIds.has(instructorId)) {
                console.warn(`Skipping Course ${row[0]}: Instructor ${instructorId} not found`);
                return false;
            }
            return true;
        })
        .map(row => {
            const [id, enseignant_id, categorie_id, skill_level_id, intitule, slug, content, description, is_published, is_free, niveau_difficulte, duree_apprentissage, created_at, vues, is_validated, montant_abonnement, language, number_of_lessons, tags, is_rejected, review, updated_at, published_at] = row;
            return {
                id,
                instructorId: enseignant_id,
                categoryId: categorie_id,
                skillLevelId: skill_level_id,
                title: intitule,
                slug,
                content,
                description,
                isPublished: is_published === 1,
                isFree: is_free === 1,
                difficultyLevel: niveau_difficulte,
                duration: String(duree_apprentissage), // Ensure string
                createdAt: new Date(created_at),
                views: vues,
                isValidated: is_validated === 1,
                subscriptionPrice: montant_abonnement,
                language,
                numberOfLessons: number_of_lessons,
                tags,
                isRejected: is_rejected === 1,
                review,
                updatedAt: updated_at ? new Date(updated_at) : null,
                publishedAt: published_at ? new Date(published_at) : null,
            };
        });

      for (const batch of chunk(courses, 100)) {
          await prisma.course.createMany({
              data: batch,
              skipDuplicates: true
          });
      }
  }

  // 9. Subscriptions
  console.log('Importing Subscriptions...');
  if (dataStore.abonnement.length > 0) {
      const subs = dataStore.abonnement.map(row => {
          const [id, label, slug, montant, duree, is_recommended, nbre_point] = row;
          return {
            id,
            label,
            slug,
            amount: montant,
            duration: duree,
            isRecommended: is_recommended === 1,
            pointsCount: nbre_point
          };
      });
      await prisma.subscription.createMany({
          data: subs,
          skipDuplicates: true
      });
  }

  console.log('Import completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
