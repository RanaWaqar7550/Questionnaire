export enum Choices {
  YES = "Yes",
  NO = "No",
}

export enum InputType {
  Number = "number",
  Text = "text",
}

export type QuestionType = {
  id: number;
  question: string;
  textInputOptions?: {
    type: InputType;
  };
  choicesOption?: {
    isMultiChoice: boolean;
    choices: Array<string>;
  };
  validate?: (data: string | number | undefined) => Boolean;
  gotoQuestionId?: number;
};

export type AnswerType = {
  id: number;
  answerChoice?: string;
  answerText?: string | number;
};

export type AnswersListType = (AnswerType & QuestionType) | null;
