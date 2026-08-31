import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prisma = new PrismaClient();

async function main() {
  const targetEmail = 'hismajestykingdavid@gmail.com';
  const newPassword = 'KDave237';

  console.log(`Hashing password for target email...`);
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: targetEmail },
        { email: 'hismajestykingdavid+dodave@gmail.com' }
      ]
    }
  });

  if (existingUser) {
    console.log(`Found user ID ${existingUser.id} (${existingUser.email}). Updating password...`);
    const updated = await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword }
    });
    console.log(`SUCCESS: Password updated for user ID ${updated.id} (${updated.email}).`);
  } else {
    console.log(`User ${targetEmail} not found. Creating user in DB...`);
    const newUser = await prisma.user.create({
      data: {
        email: targetEmail,
        password: hashedPassword,
        roles: JSON.stringify(['ROLE_USER', 'ROLE_ADMIN']),
        isVerified: true,
        isAdmin: true,
        cash: 0
      }
    });
    console.log(`SUCCESS: Created new user ID ${newUser.id} (${newUser.email}).`);
  }
}

main()
  .catch((err) => {
    console.error('ERROR updating password:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
