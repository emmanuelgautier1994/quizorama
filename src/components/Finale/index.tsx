import React from "react";

import "./Finale.css";
import "./Confetti.css";

import { Player } from "../../types/Player";

import Timer from "./Timer";
import { Positions, INITIAL_TIMER_POSITIONS, Tier } from "./utils/timer";

import ChooseLeader from "./ChooseLeader";
import Controls from "./Controls";

import PlayerSilhouette from "../shared/PlayerSilhouette";
import PlayerScore from "../shared/PlayerScore";
import PlayerTag from "../shared/PlayerTag";

import BoxGradientDefinitions from "../shared/BoxGradientDefinitions";

const TIMER_SIZE = 15;

const Finale = ({
  players: [leftPlayer, rightPlayer],
}: {
  players: [Player, Player];
}) => {
  const [leader, setLeader] = React.useState<"left" | "right" | null>(null);
  const [winner, setWinner] = React.useState<"left" | "right" | null>(null);

  const [leftPlayerScore, setLeftPlayerScore] = React.useState(0);
  const [rightPlayerScore, setRightPlayerScore] = React.useState(0);
  const [
    pointsWereAwardedForCurrentQuestion,
    setPointsWereAwardedForCurrentQuestion,
  ] = React.useState(false);

  const [timer, setTimer] = React.useState(TIMER_SIZE);
  const [timerIsRunning, setTimerIsRunning] = React.useState(false);
  const [timerIntervalId, setTimerIntervalId] = React.useState<number | null>(
    null
  );
  const [timerPositions, setTimerPositions] = React.useState<Positions>(
    INITIAL_TIMER_POSITIONS
  );

  const currentTier = (
    timer / TIMER_SIZE > (3 + 2 + 1) / (4 + 3 + 2 + 1)
      ? 4
      : timer / TIMER_SIZE > (2 + 1) / (4 + 3 + 2 + 1)
      ? 3
      : timer / TIMER_SIZE > 1 / (4 + 3 + 2 + 1)
      ? 2
      : 1
  ) as Tier;

  const currentlyActivePlayer = timerPositions[currentTier];

  const toggleTimer = () => {
    if (timerIsRunning) {
      setTimerIsRunning(false);
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
        setTimerIntervalId(null);
      }
      return;
    } else {
      const intervalId = setInterval(() => {
        setTimer((t) => (TIMER_SIZE * (t - 1 / 100)) / TIMER_SIZE);
      }, 10);
      setTimerIntervalId(intervalId);
      setTimerIsRunning(true);
    }
  };

  const nextQuestion = () => {
    setTimer(TIMER_SIZE);
    setTimerIsRunning(false);
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
    setTimerPositions(INITIAL_TIMER_POSITIONS);

    setLeader(null);
    setPointsWereAwardedForCurrentQuestion(false);
  };

  const rightAnswer = () => {
    if (currentlyActivePlayer === "left") {
      if (leftPlayerScore + currentTier >= 12) setWinner("left");
      setLeftPlayerScore((s) => s + currentTier);
      setPointsWereAwardedForCurrentQuestion(true);
    } else {
      if (rightPlayerScore + currentTier >= 12) setWinner("right");
      setRightPlayerScore((s) => s + currentTier);
      setPointsWereAwardedForCurrentQuestion(true);
    }
  };

  const wrongAnswer = () => {
    const currentTierPosition = timerPositions[currentTier];
    const newPosition = currentTierPosition === "left" ? "right" : "left";

    let newPositions: Partial<Positions> = {};

    for (let tier = currentTier; tier >= 1; tier--) {
      if (timerPositions[tier] === currentTierPosition) {
        newPositions[tier as Tier] = newPosition;
      } else {
        break;
      }
    }
    setTimerPositions({
      ...timerPositions,
      ...newPositions,
    });
  };

  React.useEffect(() => {
    if (timer <= 0) {
      setTimer(0);
      setTimerIsRunning(false);
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
        setTimerIntervalId(null);
      }
      setPointsWereAwardedForCurrentQuestion(true);
    }
  }, [timer, timerIntervalId]);

  return (
    <div className="face-to-face-container">
      <div className="title-container">
        <h1>La Finale</h1>
      </div>
      <div className="timer-container">
        <div
          className={`confetti-launcher ${
            winner === "left"
              ? "confetti-left"
              : winner === "right"
              ? "confetti-right"
              : ""
          }`}
        />
        <svg
          viewBox="0 0 200 100"
          style={{ height: "100%" }}
          preserveAspectRatio="none"
        >
          <defs>
            <BoxGradientDefinitions />
          </defs>
          <Timer
            timerProgress={timer / TIMER_SIZE}
            timerPositions={timerPositions}
          />
          <g className={winner === "left" ? "confetti" : ""}>
            <PlayerSilhouette
              x={0}
              y={10}
              width={86}
              gradientHeight={70}
              type={leftPlayer.gender}
            />
            <PlayerTag x={42.5} y={80} name={leftPlayer.name} fontSize={7.5} />
            <PlayerScore
              x={35}
              y={87}
              width={15}
              height={8}
              fontSize={5}
              strokeWidth={0.7}
              score={leftPlayerScore}
              highlighted={currentlyActivePlayer === "left"}
            />
          </g>
          <g className={winner === "right" ? "confetti" : ""}>
            <PlayerSilhouette
              x={115}
              y={10}
              width={86}
              gradientHeight={70}
              type={rightPlayer.gender}
            />
            <PlayerTag
              x={157.5}
              y={80}
              name={rightPlayer.name}
              fontSize={7.5}
            />
            <PlayerScore
              x={150}
              y={87}
              width={15}
              height={8}
              fontSize={5}
              strokeWidth={0.7}
              score={rightPlayerScore}
              highlighted={currentlyActivePlayer === "right"}
            />
          </g>
        </svg>
      </div>
      <div className="controls-container">
        {leader === null ? (
          <ChooseLeader
            chooseLeft={() => {
              setLeader("left");
              setTimerPositions({
                4: "left",
                3: "right",
                2: "left",
                1: "right",
              });
            }}
            chooseRight={() => {
              setLeader("right");
              setTimerPositions({
                4: "right",
                3: "left",
                2: "right",
                1: "left",
              });
            }}
          />
        ) : (
          <Controls
            timerIsRunning={timerIsRunning}
            timerIsFull={timer === TIMER_SIZE}
            toggleTimer={toggleTimer}
            wrongAnswer={wrongAnswer}
            rightAnswer={rightAnswer}
            nextQuestion={nextQuestion}
            pointsWereAwardedForCurrentQuestion={
              pointsWereAwardedForCurrentQuestion
            }
            someoneHasWon={winner !== null}
          />
        )}
      </div>
    </div>
  );
};

export default Finale;
