import { Controller } from '../types';
import * as QuizService from '../services/quiz';

const postQuiz: Controller = async (_, body) => {
  try {
    await QuizService.createQuiz(body);

    return {
      statusCode: 201,
      data: null,
      errors: []
    };
  } catch (error: any) {
    return {
      statusCode: error.statusCode || 400,
      data: null,
      errors: [...(error.errors ? error.errors : [error.name])]
    };
  }
};

const getQuizzes: Controller = async () => {
  try {
    const data = await QuizService.readQuizzes();

    return {
      statusCode: 200,
      data,
      errors: []
    };
  } catch (error: any) {
    return {
      statusCode: error.statusCode || 400,
      data: null,
      errors: [...(error.errors ? error.errors : [error.name])]
    };
  }
};

const getOneQuiz: Controller = async (params) => {
  try {
    const data = await QuizService.readOneQuiz(params.id);

    return {
      statusCode: 200,
      data,
      errors: []
    };
  } catch (error: any) {
    return {
      statusCode: error.statusCode || 400,
      data: null,
      errors: [...(error.errors ? error.errors : [error.name])]
    };
  }
};

export { postQuiz, getQuizzes, getOneQuiz };
