/* eslint-disable unicorn/no-array-push-push */
import { clearDB } from './util.js';
import { generateUsers } from './dataGenerators.js';
import { createUsersInDatabase, createMatchesWithFeedback } from './database.js';
import prisma from '../../src/tools/prisma.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seed() {
  console.log('🌱 Starting seed process...');

  // Clear existing data
  await clearDB();

  // Load Slack sample data
  const slackData = loadSlackData();

  // Generate and create users
  console.log('👤 Creating 500 users...');
  const users = generateUsers(slackData, 500);
  const usersInDb = await createUsersInDatabase(users);
  console.log(`✅ Created ${usersInDb.length} users`);

  // Create matches with participants and feedback
  console.log('🤝 Creating matches...');
  const matches = await createMatchesWithFeedback(usersInDb, 150);
  console.log(`✅ Created ${matches.length} matches`);

  console.log('🎉 Seed process completed successfully!');
}

function loadSlackData() {
  return JSON.parse(
    readFileSync(join(__dirname, '../sampleData/fake_slack_users.json'), 'utf-8')
  );
}

// Run the seed function
seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
