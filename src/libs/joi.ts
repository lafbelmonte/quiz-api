import Joi from 'joi';
import { QuizStatus, Choice } from '../types';

const quizSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid(QuizStatus.Draft, QuizStatus.Published).required(),
  questions: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        mandatory: Joi.boolean().required(),
        choices: Joi.array()
          .items(
            Joi.object({
              description: Joi.string().required(),
              correct: Joi.boolean().required()
            })
          )
          .required()
          .custom((value: Omit<Choice, 'id'>[]) => {
            const trueCount = value.filter(
              (element) => element.correct === true
            ).length;

            if (trueCount > 1) {
              throw new Error(
                'only 1 element can have true value in correct field'
              );
            }

            return value;
          })
      })
    )
    .required()
});

export { quizSchema };
