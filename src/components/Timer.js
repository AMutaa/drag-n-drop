import React, { useState, useEffect } from "react";
var startTime = Date.now();
export default function Timer(props) {
  const { start, increaseTime } = props;
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const [timeElapased, setTimeElapsed] = useState("");

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        var elapsedTime;
        elapsedTime = Date.now() - startTime + 5000;
        setTimeInSeconds(elapsedTime);
        // increaseTime
        //   ? setTimeInSeconds(elapsedTime + 5000)
        //   : setTimeInSeconds(elapsedTime);
      }, 100);
    } else if (!start && timeInSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start, timeInSeconds]);

  let time = (timeInSeconds / 1000).toFixed(3);
  let minutes = (
    "0" + Math.floor((timeInSeconds / 1000).toFixed(3) / 60)
  ).slice(-2);
  let seconds = ("0" + Math.floor(time.slice(0, 3) % 60)).slice(-2);

  let milliseconds = time.slice(-3);
  let timeToDisplay = `${minutes} : ${seconds}: ${milliseconds}`;

  return <>TIMER {timeToDisplay}</>;
}
