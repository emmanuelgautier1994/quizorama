import React from "react";

type ControlsProps = {
  timerIsRunning: boolean;
  timerIsFull: boolean;
  pointsWereAwardedForCurrentQuestion: boolean;
  someoneHasWon: boolean;
  toggleTimer: () => void;
  wrongAnswer: () => void;
  rightAnswer: () => void;
  nextQuestion: () => void;
};

const Controls: React.FC<ControlsProps> = ({
  timerIsRunning,
  timerIsFull,
  pointsWereAwardedForCurrentQuestion,
  someoneHasWon,
  toggleTimer,
  wrongAnswer,
  rightAnswer,
  nextQuestion,
}) => {
  return (
    <>
      <button
        onClick={toggleTimer}
        disabled={someoneHasWon || pointsWereAwardedForCurrentQuestion}
        className={timerIsRunning ? "grey" : "green"}
      >
        {timerIsRunning ? "Pause" : "Top !"}
      </button>
      <button
        disabled={
          someoneHasWon ||
          timerIsFull ||
          timerIsRunning ||
          pointsWereAwardedForCurrentQuestion
        }
        onClick={wrongAnswer}
      >
        👎 La main passe
      </button>
      <button
        disabled={
          someoneHasWon ||
          timerIsFull ||
          timerIsRunning ||
          pointsWereAwardedForCurrentQuestion
        }
        onClick={rightAnswer}
      >
        👍 Bonne réponse !
      </button>
      <button disabled={someoneHasWon} onClick={nextQuestion}>
        Question suivante
      </button>
    </>
  );
};

export default Controls;
