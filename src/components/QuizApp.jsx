import React, { useState, useEffect } from 'react';
import { FaRedo, FaClock, FaCheck, FaBars, FaTimes } from 'react-icons/fa';
import Question from '../components/Question';
import Performance from '../components/Performance';


const QuizApp = () => {
  const [selectedCategory,setSelectedCategory]= useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timer, setTimer] = useState(1200); // Start from 1200 seconds for countdown
  const [submitted, setSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const DataCat = useEffect ( ()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = queryParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      console.error('No category found in URL');
    }
  },[]);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    if (selectedCategory) {
      fetch('/data.json')
        .then((response) => response.json())
        .then((data) => {
          if (data.categories && data.categories[selectedCategory]) {
            setQuestions(data.categories[selectedCategory]);
          } else {
            console.error(`No questions found for category: ${selectedCategory}`);
            setQuestions([]); 
          }
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
          setQuestions([]); 
        });
    }
    
  }, [selectedCategory]);

  useEffect(() => {
    if (quizStarted) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmit(); 
            return 0;
          }
          return prev - 1; 
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [quizStarted]);
  
  const handleAnswer = (option) => {
    setAnswers((prevAnswers) => {
      const currentAnswer = prevAnswers[currentQuestionIndex];
    
      return {
        ...prevAnswers,
        [currentQuestionIndex]: currentAnswer === option ? null : option,
      };
    });
  };

  const handleMarkForReview = () => {
    setMarkedForReview((prev) => {
      const newMarkedForReview = new Set(prev);
      if (newMarkedForReview.has(currentQuestionIndex)) {
        newMarkedForReview.delete(currentQuestionIndex);
      } else {
        newMarkedForReview.add(currentQuestionIndex);
      }
      return newMarkedForReview;
    });
  };

  const handleNavigation = (direction) => {
    setCurrentQuestionIndex((prevIndex) => {
      if (direction === 'next') return Math.min(prevIndex + 1, questions.length - 1);
      if (direction === 'prev') return Math.max(prevIndex - 1, 0);
      return prevIndex;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    document.documentElement.requestFullscreen();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleSubmit();
      }
    };

    
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview(new Set());
    setTimer(1200);
    setSubmitted(false);
    setQuizStarted(false);
  };

 
 

  const getAnswerStatus = (index) => {
    if (markedForReview.has(index)) return 'bg-yellow-500 text-black'; // Marked for review
    if (answers[index]) return 'bg-green-500 text-black'; // Answered
    if (index === currentQuestionIndex) return 'bg-blue-500 text-white'; // Active
    return 'bg-gray-300 text-black'; // Not answered
  };

  const calculatePerformance = () => {
    const totalQuestions = questions.length;
    const correctAnswers = Object.values(answers).filter(
      (answer, index) => answer === questions[index]?.answer
    ).length;
    const wrongAnswers = Object.keys(answers).filter((index) => {
      const answer = answers[index];
      return answer !== questions[index]?.answer && answer !== null;
    }).length;
    const unanswered = totalQuestions - Object.keys(answers).filter(index => answers[index] !== null).length;

    return {
      total: totalQuestions,
      correct: correctAnswers,
      wrong: wrongAnswers,
      unanswered,
      attempted: totalQuestions - unanswered,
    };
  };

  const performanceData = calculatePerformance();

  return (
    <div className=" flex flex-col h-screen">
      {/* Start Quiz Modal */}
      {!quizStarted && !submitted && (
        <div className="absolute inset-0 flex items-center justify-center  bg-white bg-opacity-35  z-50 p-8">
          <div className="max-w-lg bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Quiz Instructions</h2>
            <p className="mb-4">Here are the instructions on how to attempt the quiz:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Read each question carefully.</li>
              <li>Select your answers from the options provided.</li>
              <li>You can mark questions for review if needed.</li>
              <li>Ensure all questions are answered before submitting.</li>
              <li>Once you start the quiz, it will be in fullscreen mode.</li>
            </ul>
            <p className="mb-4">Do not close or refresh the page during the quiz.</p>
            <button
              onClick={handleStartQuiz }
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}
  
      {/* Quiz Header */}
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <div className="flex space-x-2">
          <button
            onClick={handleRestartQuiz}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            <FaRedo className="inline mr-2" /> Restart Quiz
          </button>
          {/* Mobile Navigation Toggle */}
          <button
            onClick={toggleModal}
            className="block lg:hidden bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            <FaBars />
          </button>
        </div>
        {quizStarted && !submitted && (
          <div className="text-lg font-medium">
            <FaClock className="inline mr-2" />
            {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}
          </div>
        )}
      </div>
  
      <div className="flex flex-1">
        {/* Quiz Content */}
        <div className={`w-full lg:w-3/4 p-4 ${quizStarted ? '' : 'hidden'}`}>
          {quizStarted && !submitted && (
            <div>
              <h3 className="text-xl font-bold mb-2">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
              <Question
                question={questions[currentQuestionIndex]}
                handleAnswer={handleAnswer}
                answer={answers[currentQuestionIndex]}
              />
              <div className="flex justify-between mt-4">
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={() => handleNavigation('prev')}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={handleMarkForReview}
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
                >
                  Mark for Review
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={() => handleNavigation('next')}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                  >
                    <FaCheck className="inline mr-2" /> Submit
                  </button>
                )}
              </div>
            </div>
          )}
          {submitted && (
            <div className=" absolute inset-0 bg-white ">
              <div className="flex justify-center items-center w-full">
                <Performance 
                performanceData={performanceData} 
                questions={questions} 
                answers={answers}
                handleRestartQuiz={handleRestartQuiz}
                 
                />
              </div>
              
            </div>
          )}
        </div>
  
        {/* Sidebar Navigation */}
        <div className={`hidden lg:block w-1/4 p-4 bg-gray-200 border-l border-gray-300`}>
          {quizStarted && !submitted && (
            <div className="flex flex-col h-full">
              <div className="w-full mb-4">
                <h4 className="text-lg font-semibold mb-2">Question Navigation</h4>
                <div className="grid grid-cols-4 gap-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      className={`p-3 border rounded transition-colors ${getAnswerStatus(index)} ${index === currentQuestionIndex ? 'cursor-default' : 'hover:bg-gray-300'}`}
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition mt-auto"
              >
                <FaCheck className="inline mr-2" /> Submit
              </button>
            </div>
          )}
        </div>
      </div>
  
      {/* Mobile Navigation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Question Navigation</h4>
              <button
                onClick={toggleModal}
                className="text-gray-600 hover:text-gray-900"
              >
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`p-3 border rounded transition-colors ${getAnswerStatus(index)} ${index === currentQuestionIndex ? 'cursor-default' : 'hover:bg-gray-300'}`}
                  onClick={() => {
                    setCurrentQuestionIndex(index);
                    toggleModal(); // Close modal on selection
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default QuizApp;
