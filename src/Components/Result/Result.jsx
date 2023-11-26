import React, { useEffect, useState } from "react";
import "../Result/Result.scss";

const Result = ({ result, totalQuestions, onTryAgain }) => {
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [showScores, setShowScores] = useState(false);
  const handleSave = () => {
    const score = {
      name,
      score: result.score,
    }
    const newHighScore = [...highScores, score].sort((a, b) => b.score = a.score);
    setHighScores(newHighScore);
    setShowScores(true);
    localStorage.setItem("highScores", JSON.stringify(newHighScore));
  }
  const handleTryAgain = () => {
    setShowScores(false);
    setHighScores([]);
    onTryAgain();
  }

  useEffect(() => {
    setHighScores(JSON.parse(localStorage.getItem('highScores')) || [])
  },[])

  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Question: <span>{totalQuestions}</span>
      </p>
      <p>
        Total Score: <span>{result.score}</span>
      </p>
      <p>
        Correct Answars: <span>{result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answars: <span>{result.wrongAnswars}</span>
      </p>
      <button onClick={onTryAgain}>Try Again</button>
      {!showScores ? (
        <>
          <h3>Enter Your Name Bellow To Save Your Score!</h3>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Scores</th>
              </tr>
            </thead>
              <tbody>
                {highScores.map((highScore, i) => {
                  return (
                    <tr key={`${highScore.score}${highScore.name}${i}`}>
                      <td>{ i + 1 }</td>
                      <td>{ highScore.name }</td>
                      <td>{ highScore.score }</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Result;
