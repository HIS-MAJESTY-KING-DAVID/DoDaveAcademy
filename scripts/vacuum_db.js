const { PrismaClient } = require('@prisma/client');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('=== Running VACUUM FULL & ANALYZE on PostgreSQL ===');
  
  console.log('Executing VACUUM FULL on lesson table...');
  try {
    await prisma.$executeRawUnsafe('VACUUM FULL lesson;');
    console.log('VACUUM FULL lesson completed successfully.');
  } catch (err) {
    console.log('Note on VACUUM FULL:', err.message);
    console.log('Running standard VACUUM ANALYZE instead...');
    await prisma.$executeRawUnsafe('VACUUM ANALYZE;');
  }

  console.log('Running ANALYZE...');
  await prisma.$executeRawUnsafe('ANALYZE;');

  const totalDbSizeResult = await prisma.$queryRaw`
    SELECT pg_size_pretty(pg_database_size(current_database())) as total_size,
           pg_database_size(current_database()) as total_bytes;
  `;
  console.log('\nNew Total Database Size:', totalDbSizeResult);

  const lessonTableSize = await prisma.$queryRaw`
    SELECT pg_size_pretty(pg_total_relation_size('lesson')) AS new_lesson_table_size;
  `;
  console.log('New Lesson Table Size:', lessonTableSize);
}

main()
  .catch((e) => {
    console.error('Vacuum error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
