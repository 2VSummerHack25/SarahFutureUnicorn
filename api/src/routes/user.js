import express from 'express';
import prisma from '../tools/prisma.js';


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
    const { id } = request.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return response.status(404).json({
        error: {
          name: 'UserNotFound',
          message: `User with ID ${id} not found`,
        },
      });
    }

    response.json(user);
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

router.get('/:id/matches', async (request, response, next) => {
  try {
    response.json({
      message: `Retrieve matches for user by ID route is working for ID: ${request.params.id}`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
