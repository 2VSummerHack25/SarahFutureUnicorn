import { faker } from '@faker-js/faker';
import { getRandomNumber } from './helpers.js';

export function generateUserFromSlackData(slackMember) {
  // Extract name and email from Slack data, fallback to faker if not available
  const realName = slackMember?.real_name || slackMember?.profile?.real_name || faker.person.fullName();
  const email = slackMember?.profile?.email || faker.internet.email(realName.split(' ')[0], realName.split(' ')[1]);

  return {
    name: realName,
    email: email,
    age: getRandomNumber(22, 65), // Random age between 22-65
  };
}

export function generateUsers(slackData, count = 500) {
  const users = [];
  let slackMemberIndex = 0;

  for (let i = 0; i < count; i++) {
    const slackMember = slackData.members[slackMemberIndex % slackData.members.length];
    slackMemberIndex++;
    users.push(generateUserFromSlackData(slackMember));
  }

  return users;
}
