import React, { useState, useEffect } from 'react';
import { questions } from '../data/Question';
import Leaderboard from './Leaderboard';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(10); // Updated to 10 seconds

  useEffect(() => {
    if (timeLeft <= 0 && !showResult) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    setError('');
  };

  const handleSubmit = () => {
    if (!selectedAnswer && timeLeft > 0) {
      setError('Please select an answer!');
      return;
    }

    const isCorrect = selectedAnswer === questions[currentQuestion].answer;
    setFeedback(
      isCorrect
        ? 'Correct!'
        : `Incorrect. The correct answer is ${questions[currentQuestion].answer}.`
    );

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setFeedback('');
        setTimeLeft(10); // Reset to 10 seconds
      } else {
        try {
          const savedScores = localStorage.getItem('quizScores');
          const scores = savedScores ? JSON.parse(savedScores) : [];
          scores.push({
            id: Date.now(),
            score: isCorrect ? score + 1 : score,
            date: new Date().toISOString(),
          });
          localStorage.setItem('quizScores', JSON.stringify(scores));
        } catch (error) {
          console.error('Error saving score:', error);
        }
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowResult(false);
    setFeedback('');
    setError('');
    setTimeLeft(10);
  };

  if (!questions.length) {
    return (
      <div className="text-red-500 text-center text-lg animate-pulse">
        Error: No questions available!
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg shadow-lg animate-fadeIn">
      {showResult ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4 animate-bounce">
            Results
          </h2>
          <p className="text-lg text-white mb-6">
            You scored {score} out of {questions.length}
          </p>
          <Leaderboard />
          <button
            onClick={handleRestart}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition transform hover:scale-105 mt-6"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Question {currentQuestion + 1}/{questions.length}
          </h2>
          <p className="text-sm text-yellow-200 mb-4 animate-pulse">
            Time left: {timeLeft}s
          </p>
          <p className="text-lg text-white mb-6 animate-fadeIn">
            {questions[currentQuestion].question}
          </p>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`block p-3 rounded-md border cursor-pointer transition transform hover:scale-105 ${
                  selectedAnswer === option
                    ? 'bg-blue-300 border-blue-600'
                    : 'bg-white border-gray-300 hover:bg-blue-100'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswerSelect(option)}
                  className="mr-3 accent-blue-600"
                />
                {option}
              </label>
            ))}
          </div>
          {error && (
            <p className="text-red-500 mt-3 text-sm animate-pulse">{error}</p>
          )}
          {feedback && (
            <p
              className={`mt-3 text-sm ${
                feedback.includes('Correct')
                  ? 'text-green-500'
                  : 'text-red-500'
              } animate-fadeIn`}
            >
              {feedback}
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition transform hover:scale-105"
          >
            Submit
          </button>
          <p className="mt-4 text-yellow-200">Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;