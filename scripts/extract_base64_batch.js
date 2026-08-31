const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prisma = new PrismaClient();

const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads', 'lessons');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function getExtensionFromMime(mimeType) {
  switch (mimeType) {
    case 'image/png': return 'png';
    case 'image/jpeg':
    case 'image/jpg': return 'jpg';
    case 'image/webp': return 'webp';
    case 'image/gif': return 'gif';
    case 'image/svg+xml': return 'svg';
    default: return 'png';
  }
}

async function main() {
  console.log('=== Starting Batched Base64 Extraction & DB Compression ===');

  // Fetch only IDs of lessons containing data:image
  const matchingIds = await prisma.$queryRaw`
    SELECT id FROM lesson WHERE content LIKE '%data:image%' ORDER BY id ASC;
  `;

  console.log(`Found ${matchingIds.length} lesson IDs with embedded Base64 images.`);

  let totalImagesExtracted = 0;
  let totalBytesExtracted = 0;
  let lessonsProcessed = 0;

  const base64Regex = /src=["']data:(image\/[a-zA-Z0-9\+\-]+);base64,([^"']+)["']/g;

  for (let i = 0; i < matchingIds.length; i++) {
    const lessonId = matchingIds[i].id;

    // Fetch single lesson content
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, title: true, content: true },
    });

    if (!lesson || !lesson.content) continue;

    let imgIndex = 0;
    let newContent = lesson.content;
    let updated = false;

    base64Regex.lastIndex = 0;
    const replacements = [];
    let match;

    while ((match = base64Regex.exec(lesson.content)) !== null) {
      const fullMatch = match[0];
      const mimeType = match[1];
      const base64Data = match[2];

      imgIndex++;
      const ext = getExtensionFromMime(mimeType);
      const filename = `img_${lesson.id}_${imgIndex}_${Date.now()}.${ext}`;
      const filePath = path.join(UPLOADS_DIR, filename);
      const publicUrl = `/uploads/lessons/${filename}`;

      try {
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(filePath, buffer);

        totalImagesExtracted++;
        totalBytesExtracted += buffer.length;

        replacements.push({
          original: fullMatch,
          replacement: `src="${publicUrl}"`,
        });
        updated = true;
      } catch (err) {
        console.error(`[Error] Failed to save image for lesson ${lesson.id}:`, err.message);
      }
    }

    if (updated && replacements.length > 0) {
      for (const rep of replacements) {
        newContent = newContent.replace(rep.original, rep.replacement);
      }

      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { content: newContent },
      });
    }

    lessonsProcessed++;
    if (lessonsProcessed % 10 === 0 || lessonsProcessed === matchingIds.length) {
      console.log(`[Progress] ${lessonsProcessed}/${matchingIds.length} lessons processed. Extracted ${totalImagesExtracted} images (${(totalBytesExtracted / (1024 * 1024)).toFixed(2)} MB saved).`);
    }
  }

  console.log('\n=== Batched Extraction Finished ===');
  console.log(`Lessons updated: ${lessonsProcessed}`);
  console.log(`Total images extracted to disk: ${totalImagesExtracted}`);
  console.log(`Total raw image data removed from DB: ${(totalBytesExtracted / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Extracted images stored at: ${UPLOADS_DIR}`);
}

main()
  .catch((e) => {
    console.error('Fatal error during batched extraction:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
