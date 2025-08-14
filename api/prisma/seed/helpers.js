import { MatchReason, Status } from '@prisma/client';

export function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomBoolean() {
  return Math.random() < 0.5;
}

export function getRandomMatchReason() {
  const reasons = Object.values(MatchReason);
  return reasons[getRandomNumber(0, reasons.length - 1)];
}

export function getRandomStatus() {
  const statuses = Object.values(Status);
  const weights = [0.5, 0.3, 0.2]; // 50% suggested, 30% accepted, 20% rejected
  const random = Math.random();

  if (random < weights[0]) return statuses[0]; // SUGGESTED
  if (random < weights[0] + weights[1]) return statuses[1]; // ACCEPTED
  return statuses[2]; // REJECTED
}

export function getRandomComment(rating) {
  const negativeComments = [
    'Had some communication issues and didn\'t feel like a good fit.',
    'The conversation didn\'t flow well and we didn\'t connect.',
    'Not what I was expecting from this match.',
    'Would prefer someone with different expertise.',
    'Didn\'t find the interaction very helpful.',
    'Our schedules didn\'t align well for meaningful collaboration.',
  ];

  const neutralComments = [
    'It was okay, nothing particularly stood out.',
    'Average interaction, could be better.',
    'The conversation was fine but not exceptional.',
    'Met my basic expectations.',
    'Decent person but not sure about long-term collaboration.',
    'Standard networking experience.',
    null, // Sometimes no comment for neutral
  ];

  const positiveComments = [
    'Great collaboration skills and very knowledgeable in their field.',
    'Really enjoyed our conversation about career development.',
    'Provided excellent mentorship and valuable insights.',
    'Looking forward to working together on future projects.',
    'Shared interests made for a very productive discussion.',
    'Professional and easy to work with.',
    'Brought fresh perspectives to the conversation.',
    'Would definitely recommend connecting with them.',
    'Exceptional experience, learned a lot from our interaction.',
    'Perfect match for my career goals and interests.',
    'Outstanding communication and very inspiring.',
    'Exactly what I was looking for in a mentor/connection.',
  ];

  let comments;
  if (rating <= 2) {
    comments = negativeComments;
  } else if (rating === 3) {
    comments = neutralComments;
  } else {
    comments = positiveComments;
  }

  return comments[getRandomNumber(0, comments.length - 1)];
}
