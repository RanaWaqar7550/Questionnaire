import { createContext, useEffect, useMemo, useState, ReactNode } from "react";

import { dataQuestions } from "./questions.ts";
import {
  AnswerType,
  QuestionType,
  AnswersListType,
} from "../Types/questionnaire.ts";

export const QuestionnaireContext = createContext<{
  totalQuestionsLength: number;
  currentQuestion: QuestionType | null;
  answers: AnswerType[];
  updateAnswer: (answer: AnswerType) => void;
  showThankYouModal: boolean;
  onCloseThankYouModal: () => void;
  onPreviousQuestion: (id: number) => void;
  getAnswers: () => AnswersListType[];
}>({
  totalQuestionsLength: 0,
  currentQuestion: null,
  answers: [],
  showThankYouModal: false,
  updateAnswer: (answer: AnswerType) => {},
  onCloseThankYouModal: () => {},
  onPreviousQuestion: (id: number) => {},
  getAnswers: () => [],
});

const QuestionnaireProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<QuestionType[]>(dataQuestions);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [nextQuestionId, setNextQuestionId] = useState<number>(0);
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);

  const findQuestionById = (questionId: number): QuestionType =>
    questions.find(({ id }) => id === questionId);

  const onCloseThankYouModal = () => {
    setShowThankYouModal(false);
  };

  const getAnswers = (): AnswersListType[] =>
    answers.flatMap((answer) => {
      const question = questions.find((question) => question.id === answer.id);
      if (question) return { ...answer, ...question };
      return [];
    });

  const onPreviousQuestion = (currentId: number) => {
    let nextId = 0;
    const previousAnswer = answers.find(({ id }) => id === currentId);

    if (previousAnswer) nextId = previousAnswer.id - 1;
    else nextId = answers[answers.length - 1]?.id || 0;

    if (nextId) setNextQuestionId(nextId);
  };

  const updateAnswer = (answer: AnswerType) => {
    let answerId = answer.id;
    setAnswers((prevState) => {
      const newState = [...prevState];
      if (newState.some(({ id }) => id === answerId)) {
        return newState.map((data: AnswerType) => {
          if (data.id === answerId) {
            return { ...data, ...answer };
          }
          return data;
        });
      } else {
        newState.push(structuredClone({ ...answer }));
        return newState;
      }
    });

    const { validate = () => true, gotoQuestionId = 0 } =
      findQuestionById(answerId);
    const nextId = !validate(answer.answerChoice || answer.answerText)
      ? gotoQuestionId
      : ++answerId;

    if (nextId) {
      setNextQuestionId(nextId);
    } else if (!gotoQuestionId) {
      setNextQuestionId(-1);
      setShowThankYouModal(true);
    }
  };

  useEffect(() => {
    if (!nextQuestionId && questions.length) {
      const [firstQuestion] = questions;
      setNextQuestionId(firstQuestion.id);
    }
  }, [nextQuestionId, questions]);

  const currentQuestion = useMemo(() => {
    if (!nextQuestionId) return null;
    if (nextQuestionId > questions.length) {
      setShowThankYouModal(true);
      return null;
    }
    return findQuestionById(nextQuestionId);
  }, [nextQuestionId, questions]);

  return (
    <QuestionnaireContext.Provider
      value={{
        totalQuestionsLength: questions.length,
        currentQuestion,
        answers,
        showThankYouModal,
        updateAnswer,
        onCloseThankYouModal,
        onPreviousQuestion,
        getAnswers,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireProvider;
