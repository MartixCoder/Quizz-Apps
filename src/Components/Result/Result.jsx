import React from 'react'
import '../Result/Result.scss';

const Result = ({result, totalQuestions, onTryAgain}) => {
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
          <>
              <h3>Enter Your Name Bellow To Save Your Score!</h3>
          </>
    </div>
  );
}

export default Result;