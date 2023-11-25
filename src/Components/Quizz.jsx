import React, {useState} from "react";
import {resultInitialState} from "../data/Constants";

const Quizz = ({questions}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answarIdx, setAnswarIdx] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  const {question, choices, correctAnswer} = questions[currentQuestion];

  const onAnswarClick = (selectedAnswer, index) => {
    setAnswarIdx(index);
    if (selectedAnswer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const onClickNext = () => {
    console.log(selectedAnswer);
    setAnswarIdx();
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswars: prev.wrongAnswars + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };
  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };
  return (
    <div className="quiz-conatainer">
      {!showResult ? (
        <>
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnswarClick(choice, index)}
                key={choice}
                className={answarIdx === index ? "selected-answar" : null}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={onClickNext} disabled={answarIdx === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
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
        </div>
      )}
    </div>
  );
};

export default Quizz;
