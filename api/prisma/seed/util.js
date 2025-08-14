import prisma from '../../src/tools/prisma.js';

export async function clearDB() {
  // Delete in order of dependencies (child tables first)
  await prisma.feedback.deleteMany({});
  await prisma.matchParticipant.deleteMany({});
  await prisma.match.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('✅ Database cleared');
}
