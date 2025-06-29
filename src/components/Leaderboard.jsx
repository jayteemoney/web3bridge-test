import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    try {
      const savedScores = localStorage.getItem('quizScores');
      if (savedScores) {
        setScores(JSON.parse(savedScores));
      }
    } catch (error) {
      console.error('Error loading scores:', error);
      setScores([]);
    }
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-100 mb-4 animate-bounce">
        Leaderboard
      </h3>
      {scores.length === 0 ? (
        <p className="text-yellow-200">No scores yet.</p>
      ) : (
        <ul className="space-y-2">
          {scores
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((score) => (
              <li
                key={score.id}
                className="p-2 bg-blue-100 rounded-md border border-blue-300 text-gray-800"
              >
                Score: {score.score} - {new Date(score.date).toLocaleString()}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;