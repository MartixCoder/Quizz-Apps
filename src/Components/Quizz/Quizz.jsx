import React, {useState} from "react";
import { resultInitialState } from "../../data/Constants";
import "../Quizz/quizz.scss"
import AnswarTimer from "../AnswarTimer/AnswarTimer";
import Result from "../Result/Result";

const Quizz = ({questions}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answarIdx, setAnswarIdx] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState('');

  const {question, choices, correctAnswer, type} = questions[currentQuestion];

  const onAnswarClick = (selectedAnswer, index) => {
    setAnswarIdx(index);
    if (selectedAnswer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const onClickNext = (finalAnsawr) => {
    setAnswarIdx(null);
    setShowAnswerTimer(false);
    setInputAnswer("");
    setResult((prev) =>
      finalAnsawr
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

    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };
  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };
  const handleTimeUp = () => {
    setSelectedAnswer(false);
    onClickNext(false);
  }
  const handleInputChange = (evt) => {
    setInputAnswer(evt.target.value);
    if (evt.target.value === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  }
  const getAnswerUI = () => {
    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handleInputChange} />;
    }
    return (
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
    );
  }
  return (
    <div className="quiz-conatainer">
      {!showResult ? (
        <>
          {showAnswerTimer && <AnswarTimer duration={5} onTimeUp={ handleTimeUp } />}
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI(type)}
          <div className="footer">
            <button onClick={()=>onClickNext(selectedAnswer)} disabled={answarIdx === null && !inputAnswer}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length}/>
      )}
    </div>
  );
};

export default Quizz;
