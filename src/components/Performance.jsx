import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaRegClipboard,
  FaHome,
  FaRedo,
} from 'react-icons/fa';

const Performance = ({
  performanceData,
  questions = [],
  answers = {},
  handleRestartQuiz,
  isDarkMode
}) => {
  const { correct, wrong, unanswered, attempted, total } = performanceData;
  const score = ((correct / total) * 100).toFixed(2); // Calculate percentage score

  const [showAnswers, setShowAnswers] = useState(false);

  const handleToggleAnswers = () => {
    setShowAnswers((prev) => !prev); // Toggle state
  };

  const bgColor = 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const circleBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  const circleBorderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  return (
    <div className={`w-full my-16 p-4 ${bgColor} `}>
      <h3 className={`text-xl font-bold ${textColor} mb-4 text-center`}>
        Quiz Performance
      </h3>

      {/* Score Display */}
      <div className="flex justify-center items-center mb-6">
        <div className={`relative flex items-center justify-center w-40 h-40 ${circleBgColor} border-8 rounded-full`} 
             style={{
               borderImage: `conic-gradient(#4caf50 ${score}%, ${circleBgColor} ${score}% 100%)`,
               borderImageSlice: 1
             }}>
          <div className={`absolute text-4xl font-bold ${textColor}`}>
            {score}%
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className={`flex flex-col w-full sm:w-96 space-y-4 mx-auto p-4 rounded-lg ${circleBgColor} ${circleBorderColor} border`}>
        <div className="flex items-center space-x-3">
          <FaCheckCircle className="text-green-500 text-2xl" />
          <div className={textColor}>
            <div className="text-lg font-semibold">Correct Answers</div>
            <div className="text-sm">{correct}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaTimesCircle className="text-red-500 text-2xl" />
          <div className={textColor}>
            <div className="text-lg font-semibold">Wrong Answers</div>
            <div className="text-sm">{wrong}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaQuestionCircle className="text-yellow-400 text-2xl" />
          <div className={textColor}>
            <div className="text-lg font-semibold">Unanswered</div>
            <div className="text-sm">{unanswered}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaRegClipboard className="text-blue-400 text-2xl" />
          <div className={textColor}>
            <div className="text-lg font-semibold">Total Attempted</div>
            <div className="text-sm">{attempted}</div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center items-center space-x-8 mt-8">
        <div className="flex flex-col items-center">
          <Link to={'/'}>
          <button
            // Assuming you want to navigate to home
            className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
          >
            <FaHome className="text-2xl" />
          </button>
          <span className={`mt-2 ${textColor}`}>Home</span>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleToggleAnswers}
            className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-yellow-600 transition"
          >
            <FaRegClipboard className="text-2xl" />
          </button>
          <span className={`mt-2 ${textColor}`}>Review Answers</span>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleRestartQuiz}
            className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-green-700 transition"
          >
            <FaRedo className="text-2xl" />
          </button>
          <span className={`mt-2 ${textColor}`}>Try Again</span>
        </div>
      </div>

      {/* Conditionally Render Question and Answer Details */}
      {showAnswers && (
        <div className={`mt-4 p-4 rounded-lg ${bgColor}`}>
          <h4 className={`text-lg font-semibold ${textColor} mb-2`}>Answers</h4>
          {questions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.answer;
            const answerStatusMessage = userAnswer
              ? isCorrect
                ? 'You have selected the right answer!'
                : `Wrong answer. The correct answer is: ${q.answer}`
              : 'You did not answer this question.';

            return (
              <div
                key={index}
                className={`p-4 border rounded-lg shadow-md mb-4 ${
                  isCorrect ? 'border-green-500' : 'border-red-500'
                } ${bgColor}`}
              >
                <div className={`text-lg font-semibold mb-2 ${textColor}`}>
                  {index + 1}. {q.question}
                </div>
                <div className="mb-2">
                  <span className={`font-medium ${textColor}`}>Correct Answer:</span>{' '}
                  <span className={`${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>{q.answer}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className={`font-medium ${textColor}`}>Your Answer:</span>{' '}
                  <span
                    className={`ml-2 ${
                      isCorrect
                        ? `${isDarkMode ? 'text-green-300' : 'text-green-600'}`
                        : `${isDarkMode ? 'text-red-300' : 'text-red-600'}`
                    } flex items-center`}
                  >
                    {userAnswer || 'Not answered'}
                    {userAnswer === q.answer ? (
                      <FaCheckCircle className="ml-2" />
                    ) : userAnswer ? (
                      <FaTimesCircle className="ml-2" />
                    ) : null}
                  </span>
                </div>
                <div
                  className={`text-sm ${
                    isCorrect
                      ? `${isDarkMode ? 'text-green-300' : 'text-green-600'}`
                      : `${isDarkMode ? 'text-red-300' : 'text-red-600'}`
                  } font-medium`}
                >
                  {answerStatusMessage}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Performance;
