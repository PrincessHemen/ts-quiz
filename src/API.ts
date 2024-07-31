export interface QuizQuestion {
  question: string;
  answers: string[];
  correct_answer: string;
}

export const fetchQuizQuestions = async (difficulty: string, quizType: string, numQuestions: number): Promise<QuizQuestion[]> => {
  try {
    // Map quizType to the corresponding category ID
    const categoryMap: { [key: string]: number } = {
      general: 9,
      science: 17,
      history: 23,
      // Add other category mappings as needed
    };

    const categoryId = categoryMap[quizType.toLowerCase()] || 9; // Default to General Knowledge if not found
    const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
    console.log("Fetching questions from:", url); // Log the URL for debugging

    // Fetch the data from the API
    const response = await fetch(url);
    
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log("API Response:", data); // Log the raw API response

    // Check for API-specific errors
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

    // Map the API response to match QuizQuestion interface
    return data.results.map((question: any) => ({
      question: question.question,
      correct_answer: question.correct_answer,
      answers: [...question.incorrect_answers, question.correct_answer].sort(), // Include correct_answer and shuffle answers
    }));
  } catch (error) {
    console.error("Error fetching quiz questions:", error); // Log any errors
    throw error; // Re-throw the error to be caught in the calling component
  }
};
