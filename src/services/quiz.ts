/* eslint-disable no-useless-catch */
import { Prisma } from '@prisma/client';
import { Quiz, Question, Choice, ID } from '../types';
import { prisma } from '../libs/prisma';
import { ValidationError, NotFoundError } from '../libs/errors';
import { quizSchema } from '../libs/joi';

type CreateQuizInput = Omit<Quiz, 'id' | 'questions'> & {
  questions: (Omit<Question, 'id' | 'choices'> & {
    choices: Omit<Choice, 'id'>[];
  })[];
};

const createQuiz = async (params: CreateQuizInput) => {
  try {
    await quizSchema.validateAsync(params, { abortEarly: false });

    await prisma.quiz.create({
      data: {
        ...params,
        questions: {
          create: params.questions.map((element) => {
            const { choices, ...question } = element;

            return {
              ...question,
              choices: {
                create: choices
              }
            };
          })
        }
      }
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const fields = error.meta?.target as any;

        throw new ValidationError(
          `There is a unique constraint violation, the quiz cannot be created with this ${fields}.`
        );
      }
    }

    if (error.name === 'ValidationError') {
      throw new ValidationError(
        error.message,
        error.details.map((error: any) => error.message)
      );
    }
    throw error;
  }
};

const readQuizzes = async () => {
  try {
    const quizzes = await prisma.quiz.findMany();

    return quizzes;
  } catch (error) {
    throw error;
  }
};

const readOneQuiz = async (id: ID) => {
  try {
    if (!id) {
      throw new ValidationError('ID is required');
    }

    const quiz = await prisma.quiz.findFirst({
      where: { id },
      include: {
        questions: {
          include: {
            choices: true
          }
        }
      }
    });

    if (!quiz) {
      throw new NotFoundError('Quiz not found.');
    }

    return quiz;
  } catch (error) {
    throw error;
  }
};

export { createQuiz, readQuizzes, readOneQuiz };
