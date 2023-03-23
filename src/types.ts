import { Request, Response } from 'express';
export type ID = string;

export enum QuizStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  status: QuizStatus;
};

export type Question = {
  id: ID;
  description: string;
  mandatory: boolean;
  choices: Choice[];
};

export type Choice = {
  id: ID;
  description: string;
  correct: boolean;
};

export type Controller = (
  params: any,
  body: any
) => Promise<{ statusCode: number; data: any; errors: string[] }>;

export type ControllerWrapper = (
  controller: Controller
) => (req: Request, res: Response) => Promise<any>;
