export const fetchQuizQuestions = async () => {
  try {
    const response = await fetch('/data.json'); // Using local file for demo
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
};
