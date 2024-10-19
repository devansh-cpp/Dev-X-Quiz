import React, { useMemo } from 'react';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Question = ({ question, handleAnswer, answer }) => {
  // Use useMemo to shuffle options only when question changes
  const shuffledOptions = useMemo(() => shuffleArray(question.options), [question]);

  const toggleAnswer = (option) => {
    // If the clicked option is already selected, unselect it by passing null
    if (answer === option) {
      handleAnswer(null); // Unselect the answer
    } else {
      handleAnswer(option); // Select the new answer
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="flex flex-col">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            className={`block my-2 p-2 border rounded w-full ${
              answer === option ? 'bg-blue-200' : 'bg-white'
            } transition`}
            onClick={() => toggleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
