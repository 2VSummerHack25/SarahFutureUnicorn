export function extractMatchedUsers(matches, userId) {
  for (const match of matches) {
    extractMatchedUser(match, userId);
  }
}

export function extractMatchedUser(match, userId) {
  for (let index = 0; index < match.participants.length; index++) {
    const participant = match.participants[index];
    if (userId !== participant.userId) {
      match.matchedUser = participant.user;
    }
  }
}

/**
 * Utility function to create matches between two users
 * @param {Object} user1 - First user object
 * @param {Object} user2 - Second user object
 * @param {string} reason - Match reason (INTERESTS, CAREER_GOALS, or MENTORSHIP)
 * @returns {Object} Match object compatible with Prisma schema
 */
export function createMatch(user1, user2, reason = 'INTERESTS') {
  if (!user1 || !user2) {
    throw new Error('Both users are required to create a match');
  }

  if (!user1.id || !user2.id) {
    throw new Error('Both users must have valid IDs');
  }

  if (user1.id === user2.id) {
    throw new Error('Cannot create a match with the same user');
  }

  // Validate reason matches the enum
  const validReasons = ['INTERESTS', 'CAREER_GOALS', 'MENTORSHIP'];
  if (!validReasons.includes(reason)) {
    throw new Error(`Invalid reason. Must be one of: ${validReasons.join(', ')}`);
  }

  return {
    reason: reason,
    status: 'SUGGESTED', // Default status for new matches
    participants: [
      { userId: user1.id },
      { userId: user2.id }
    ]
  };
}

/**
 * Generate a unique match ID (if needed for external use)
 * @returns {string} Unique match identifier
 */
function generateMatchId() {
  return `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}