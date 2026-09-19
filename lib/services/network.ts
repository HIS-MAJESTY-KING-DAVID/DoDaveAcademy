import { prisma } from '@/lib/prisma';

const MAX_NETWORK_LEVELS = 5;

type DistributionResult = {
  distributed: boolean;
  levels: number;
  points: number;
  message: string;
};

/**
 * Distributes referral rewards after a verified student completes a paid
 * subscription or course payment. The first parent receives the full base
 * reward; subsequent levels receive the configured student/instructor share.
 */
export async function distributeNetworkRewards(
  userId: number,
  basePoints: number,
): Promise<DistributionResult> {
  if (!Number.isFinite(basePoints) || basePoints <= 0) {
    return {
      distributed: false,
      levels: 0,
      points: 0,
      message: 'No network reward was configured for this payment.',
    };
  }

  return prisma.$transaction(async (tx) => {
    const [user, networkConfig] = await Promise.all([
      tx.user.findUnique({
        where: { id: userId },
        include: { person: true, student: true },
      }),
      tx.networkConfig.findFirst({ orderBy: { id: 'asc' } }),
    ]);

    if (!user?.isVerified || !user.person || !user.student) {
      return {
        distributed: false,
        levels: 0,
        points: 0,
        message: 'Network rewards require a verified student account.',
      };
    }

    if (!networkConfig) {
      return {
        distributed: false,
        levels: 0,
        points: 0,
        message: 'Network rewards are not configured.',
      };
    }

    let parentId = user.person.parentId;
    let level = 0;
    let levelPoints = basePoints;
    let distributedPoints = 0;

    while (parentId && level < MAX_NETWORK_LEVELS) {
      const parent = await tx.person.findUnique({
        where: { id: parentId },
        include: {
          user: {
            include: { student: true, instructor: true },
          },
        },
      });

      if (!parent?.user) break;

      level += 1;
      const percentage =
        level === 1
          ? 100
          : parent.user.student
            ? networkConfig.studentDistributionPercentage
            : parent.user.instructor
              ? networkConfig.instructorDistributionPercentage
              : 0;
      levelPoints = (levelPoints * percentage) / 100;

      if (levelPoints > 0) {
        const cashReward = levelPoints * networkConfig.exchangeRate;
        await tx.user.update({
          where: { id: parent.user.id },
          data: {
            points: { increment: levelPoints },
            cash: { increment: cashReward },
          },
        });
        distributedPoints += levelPoints;
      }

      parentId = parent.parentId;
    }

    return {
      distributed: distributedPoints > 0,
      levels: level,
      points: distributedPoints,
      message: distributedPoints > 0
        ? 'Network rewards distributed successfully.'
        : 'No eligible parent was found for this payment.',
    };
  });
}

export async function getNetworkConfig() {
  return prisma.networkConfig.findFirst({ orderBy: { id: 'asc' } });
}

export { MAX_NETWORK_LEVELS };
