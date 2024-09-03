import {
  AnswerType,
  Choices,
  InputType,
  QuestionType,
} from "../Types/questionnaire.ts";

export const dataQuestions: QuestionType[] = [
  {
    id: 1,
    question: "Does your business operate in CA?",
    choicesOption: {
      isMultiChoice: false,
      choices: [Choices.YES, Choices.NO],
    },
    validate: (answerChoice: Choices) => answerChoice !== Choices.NO,
  },
  {
    id: 2,
    question: "How many employees do you have?",
    textInputOptions: {
      type: InputType.Number,
    },
    validate: (answerText: string) =>
      parseInt(answerText, 10) > 0 && parseInt(answerText, 10) < 100,
  },
  {
    id: 3,
    question: "Do you serve food?",
    choicesOption: {
      isMultiChoice: false,
      choices: [Choices.YES, Choices.NO],
    },
    validate: (answerChoice: Choices) => answerChoice !== Choices.NO,
    gotoQuestionId: 6,
  },
  {
    id: 4,
    question: "Do you serve hot food?",
    choicesOption: {
      isMultiChoice: false,
      choices: [Choices.YES, Choices.NO],
    },
  },
  {
    id: 5,
    question: "Are you open past midnight?",
    choicesOption: {
      isMultiChoice: false,
      choices: [Choices.YES, Choices.NO],
    },
  },
  {
    id: 6,
    question: "Do you host live music?",
    choicesOption: {
      isMultiChoice: false,
      choices: [Choices.YES, Choices.NO],
    },
  },
];
