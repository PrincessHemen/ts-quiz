// API.ts
export type QuizQuestion = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  
  export const fetchQuizQuestions = async (difficulty: string): Promise<QuizQuestion[]> => {
    const url = `https://opentdb.com/api.php?amount=10&category=17&type=multiple&difficulty=${difficulty}`;
    const response = await fetch(url);
    const data = await response.json();
  
    // Ensure data conforms to QuizQuestion type
    return data.results.map((question: any) => ({
      question: question.question,
      correct_answer: question.correct_answer,
      incorrect_answers: question.incorrect_answers,
    }));
  };
  