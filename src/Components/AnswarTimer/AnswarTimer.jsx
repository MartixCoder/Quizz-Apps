import React, {useEffect, useState, useRef} from "react";
import "./AnswarTimer.scss";

const AnswarTimer = ({duration, onTimeUp}) => {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalref = useRef();

  useEffect(() => {
    intervalref.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);
    return () => clearInterval(intervalref.current);
  }, []);
  useEffect(() => {
    setProgressLoaded(100 * (counter / duration));
    if (counter === duration) {
      clearInterval(intervalref.current);
      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter]);

  return (
    <div className="answae-timer-container">
      <div
        style={{
          width: `${progressLoaded}%`,
          backgroundColor: `${
            progressLoaded < 40
              ? "lightgreen"
              : progressLoaded < 70
              ? "orange"
              : "red"
          }`,
        }}
        className="progress"
      ></div>
    </div>
  );
};

export default AnswarTimer;
