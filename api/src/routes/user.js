import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

router.get('/', async (request, response, next) => {
  try {
    response.json({
      message: 'User routes are working',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    response.json({
      message: `Get user by ID route is working for ID: ${request.params.id}`,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (request, response, next) => {
  try {
    response.json({
      message: `Update user by ID route is working for ID: ${request.params.id}`,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (request, response, next) => {
  try {
    response.json({
      message: `Delete user by ID route is working for ID: ${request.params.id}`,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/matches', async (req, res, next) => {
  const { id } = req.params;

  try {
    const matches = await prisma.match.findMany({
      where: {
        participants: { some: { userId: id } },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        participants: {
          select: { userId: true },
        },
      },
    });

    //looping to save a list of user's matches
    const userIds = [];
    for (const m of matches) {
      for (const p of m.participants) {
        if (p.userId !== id) {
          userIds.push(p.userId);
        }
      }
    }
    res.json({ userIds });
  } catch (error) {
    next(error);
  }
});

export default router;
