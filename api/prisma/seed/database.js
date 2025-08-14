import prisma from '../../src/tools/prisma.js';
import { faker } from '@faker-js/faker';
import { Status } from '@prisma/client';
import {
  getRandomNumber,
  getRandomBoolean,
  getRandomMatchReason,
  getRandomStatus,
  getRandomComment
} from './helpers.js';

export async function createUsersInDatabase(users) {
  const usersInDb = [];

  for (const user of users) {
    try {
      const createdUser = await prisma.user.create({
        data: user,
      });
      usersInDb.push(createdUser);
    } catch (error) {
      // Handle duplicate email by generating a new one
      if (error.code === 'P2002') {
        const modifiedUser = {
          ...user,
          email: faker.internet.email(
            user.name.split(' ')[0],
            user.name.split(' ')[1],
            faker.internet.domainName()
          ),
        };
        const createdUser = await prisma.user.create({
          data: modifiedUser,
        });
        usersInDb.push(createdUser);
      } else {
        throw error;
      }
    }
  }

  return usersInDb;
}

export async function createMatch(reason, status) {
  return await prisma.match.create({
    data: { reason, status },
  });
}

export async function createMatchParticipants(matchId, userId1, userId2) {
  // Create match participants
  await prisma.matchParticipant.create({
    data: { matchId, userId: userId1 },
  });

  await prisma.matchParticipant.create({
    data: { matchId, userId: userId2 },
  });
}

export async function createFeedback(authorId, subjectId, matchId, reason, rating) {
  return await prisma.feedback.create({
    data: {
      userId: authorId,
      matchedUserId: subjectId,
      matchId: matchId,
      reason: reason,
      rating: rating,
      comment: getRandomComment(rating),
    },
  });
}

export async function createMatchesWithFeedback(usersInDb, numberOfMatches = 150) {
  const matches = [];

  for (let i = 0; i < numberOfMatches; i++) {
    const reason = getRandomMatchReason();
    const status = getRandomStatus();

    // Create match
    const createdMatch = await createMatch(reason, status);
    matches.push(createdMatch);

    // Select two different participants
    const participant1Index = getRandomNumber(0, usersInDb.length - 1);
    let participant2Index = getRandomNumber(0, usersInDb.length - 1);

    // Ensure participants are different
    while (participant2Index === participant1Index) {
      participant2Index = getRandomNumber(0, usersInDb.length - 1);
    }

    // Create match participants
    await createMatchParticipants(
      createdMatch.id,
      usersInDb[participant1Index].id,
      usersInDb[participant2Index].id
    );

    // Create feedback for accepted matches
    if (status === Status.ACCEPTED && getRandomBoolean()) {
      // Participant 1 feedback (50% chance)
      if (getRandomBoolean()) {
        const rating1 = getRandomNumber(1, 5);
        await createFeedback(
          usersInDb[participant1Index].id,
          usersInDb[participant2Index].id,
          createdMatch.id,
          reason,
          rating1
        );
      }

      // Participant 2 feedback (50% chance)
      if (getRandomBoolean()) {
        const rating2 = getRandomNumber(1, 5);
        await createFeedback(
          usersInDb[participant2Index].id,
          usersInDb[participant1Index].id,
          createdMatch.id,
          reason,
          rating2
        );
      }
    }
  }

  return matches;
}
