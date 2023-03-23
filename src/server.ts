import Logger from './libs/logger';
import prisma from './libs/prisma';
import express from 'express';

import controllerWrapper from './libs/controller-wrapper';
import * as QuizController from './controllers/quiz';

const logger = Logger.tag(['server']);

export default {
  async start(this: any) {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post('/api/quizzes', controllerWrapper(QuizController.postQuiz));
    app.get('/api/quizzes', controllerWrapper(QuizController.getQuizzes));
    app.get('/api/quizzes/:id', controllerWrapper(QuizController.getOneQuiz));

    await prisma.start();
    this.server = app.listen(process.env.PORT || 3000, () =>
      logger.info('Server started.')
    );
  },

  async stop(this: any) {
    await prisma.stop();
    this.server.close(() => logger.info('Server stopped.'));
  }
};
