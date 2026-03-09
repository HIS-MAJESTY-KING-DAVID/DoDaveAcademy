import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const decodeIfPossible = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const normalizeDatabaseUrl = (value: string | undefined) => {
  if (!value) {
    return value;
  }

  const trimmed = value.trim().replace(/^['"]|['"]$/g, '');

  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    const schemeIndex = trimmed.indexOf('://');
    const atIndex = trimmed.lastIndexOf('@');

    if (schemeIndex === -1 || atIndex === -1) {
      return trimmed;
    }

    const scheme = trimmed.slice(0, schemeIndex);
    const credentials = trimmed.slice(schemeIndex + 3, atIndex);
    const colonIndex = credentials.indexOf(':');

    if (colonIndex === -1) {
      return trimmed;
    }

    const user = credentials.slice(0, colonIndex);
    const password = credentials.slice(colonIndex + 1);
    const hostAndPath = trimmed.slice(atIndex + 1);
    const normalizedPassword = encodeURIComponent(decodeIfPossible(password));
    const rebuilt = `${scheme}://${user}:${normalizedPassword}@${hostAndPath}`;

    try {
      new URL(rebuilt);
      return rebuilt;
    } catch {
      return trimmed;
    }
  }
};

const normalizedDatabaseUrl = normalizeDatabaseUrl(
  process.env.DATABASE_URL_IPV4 || process.env.DATABASE_URL
);

if (normalizedDatabaseUrl) {
  process.env.DATABASE_URL = normalizedDatabaseUrl;
}

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: ['query', 'error', 'warn'],
};

if (normalizedDatabaseUrl) {
  prismaClientOptions.datasources = {
    db: {
      url: normalizedDatabaseUrl,
    },
  };
}

export const prisma =
  globalForPrisma.prisma || new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
