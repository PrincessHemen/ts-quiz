export interface QuizQuestion {
  question: string;
  correct_answer: string;
  answers: string[];
}

export const fetchQuizQuestions = async (
  difficulty: string,
  numQuestions: number
): Promise<QuizQuestion[]> => {
  try {
    const categoryId = 21; // Sports category ID
    const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
    console.log("Fetching questions from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (data.response_code !== 0) {
      switch (data.response_code) {
        case 1:
          throw new Error("No results found for the specified query.");
        case 2:
          throw new Error("Invalid parameter: The provided arguments don't make sense.");
        case 3:
          throw new Error("Token not found.");
        case 4:
          throw new Error("Token has been used for too many requests.");
        default:
          throw new Error(`Unexpected API error with response_code ${data.response_code}`);
      }
    }

    return data.results.map((question: any) => ({
      question: question.question,
      correct_answer: question.correct_answer,
      answers: [...question.incorrect_answers, question.correct_answer].sort(),
    }));
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};
