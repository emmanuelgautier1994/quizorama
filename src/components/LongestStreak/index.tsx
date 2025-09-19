import React from "react";

import "./LongestStreak.css";
import { Player } from "../../types/Player";

import BoxGradientDefinitions from "../shared/BoxGradientDefinitions";
import PlayerSilhouette from "../shared/PlayerSilhouette";
import PlayerTag from "../shared/PlayerTag";
import PlayerScore from "../shared/PlayerScore";

const TIMER_SIZE = 40;

const LongestStreak = ({
  players,
  onProgressToKnockout,
  onComplete,
}: {
  players: [Player, Player, Player];
  onProgressToKnockout: (
    players: [Player, Player, Player],
    alreadyQualifiedPlayer: Player | null
  ) => void;
  onComplete: (players: [Player, Player]) => void;
}) => {
  const [currentlyActivePlayerIndex, setCurrentlyActivePlayerIndex] =
    React.useState(-1);
  const [playerScores, setPlayerScores] = React.useState([0, 0, 0]);

  const [timer, setTimer] = React.useState(TIMER_SIZE);
  const [timerIsRunning, setTimerIsRunning] = React.useState(false);
  const [timerIntervalId, setTimerIntervalId] = React.useState<number | null>(
    null
  );
  const [currentStreak, setCurrentStreak] = React.useState(0);

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
        setTimer((t) => t - 1);
      }, 1000);
      setTimerIntervalId(intervalId);
      setTimerIsRunning(true);
    }
  };

  React.useEffect(() => {
    if (timer <= 0 && timerIsRunning) {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
        setTimerIntervalId(null);
      }
      setTimerIsRunning(false);
    }
  }, [timer, timerIsRunning]);

  const nextPlayer = () => {
    setCurrentlyActivePlayerIndex(currentlyActivePlayerIndex + 1);
    setCurrentStreak(0);
    setTimer(TIMER_SIZE);
  };

  const rightAnswer = () => {
    const newScores = [...playerScores];
    newScores[currentlyActivePlayerIndex] = Math.max(
      currentStreak + 1,
      playerScores[currentlyActivePlayerIndex]
    );
    setPlayerScores(newScores);
    setCurrentStreak(currentStreak + 1);

    if (currentStreak + 1 === 4) {
      setTimer(0);
    }
  };

  const wrongAnswer = () => {
    setCurrentStreak(0);
  };

  const isRoundOver =
    currentlyActivePlayerIndex === players.length - 1 && timer <= 0;

  const goToNextRound = () => {
    const lowestScore = Math.min(...playerScores);
    const playersWithLowestScore = players.filter(
      (_, index) => playerScores[index] === lowestScore
    );
    if (playersWithLowestScore.length === 1) {
      // One player with the lowest score, they are eliminated
      const remainingPlayers = players.filter(
        (_, index) => playerScores[index] > lowestScore
      ) as [Player, Player];
      onComplete(remainingPlayers);
    } else if (playersWithLowestScore.length === 2) {
      // Two players with the lowest score, go to knockout with the top player already qualified
      const alreadyQualifiedPlayer = players.find(
        (_, index) => playerScores[index] > lowestScore
      ) as Player;
      onProgressToKnockout(players, alreadyQualifiedPlayer);
    } else {
      // All three players have the same score, go to knockout with no one qualified
      onProgressToKnockout(players, null);
    }
  };

  return (
    <div className="four-in-a-round-container">
      <div className="title-container">
        <h1>La série la plus longue</h1>
      </div>
      <div className="scene-container">
        <svg
          viewBox="0 0 200 100"
          style={{ height: "100%" }}
          preserveAspectRatio="none"
        >
          <defs>
            <BoxGradientDefinitions />
          </defs>
          {/* All players */}
          {players.map((player, index) => (
            <g key={index}>
              {index !== currentlyActivePlayerIndex && (
                <PlayerSilhouette
                  x={160}
                  y={index * 35}
                  width={30}
                  gradientHeight={23.5}
                  type={player.gender}
                />
              )}
              <PlayerTag
                x={175}
                y={27 + index * 35}
                name={player.name}
                fontSize={5}
              />
              <PlayerScore
                x={185}
                y={18 + index * 35}
                width={8}
                height={5}
                fontSize={2.2}
                strokeWidth={0.5}
                score={playerScores[index]}
                highlighted={false}
              />
            </g>
          ))}
          {/* Currently active player */}
          {currentlyActivePlayerIndex >= 0 && (
            <>
              <PlayerSilhouette
                x={45}
                y={0}
                width={105}
                gradientHeight={90}
                type={players[currentlyActivePlayerIndex].gender}
              />
              {/* Timer */}
              <rect
                x={85}
                y={80}
                width={25}
                height={15}
                rx={1}
                ry={1}
                fill="url(#orange-box-gradient)"
                style={{ stroke: "#cddce4", strokeWidth: 1 }}
              />
              <text
                x={97.5}
                y={91}
                fontSize={10}
                textAnchor="middle"
                fill="white"
                fontFamily="Righteous, regular, sans-serif"
              >
                {timer}
              </text>
            </>
          )}
          {/* Streak display */}
          {[4, 3, 2, 1, 0].map((item, index) => {
            const boxX = 7;
            const boxY = 5 + index * 19;
            const boxWidth = 25;
            const boxHeight = 16;

            return (
              <g key={index} className={item === currentStreak ? "active" : ""}>
                <rect
                  x={boxX}
                  y={boxY}
                  width={boxWidth}
                  height={boxHeight}
                  rx={3}
                  ry={3}
                  fill={
                    (currentlyActivePlayerIndex < 0 && item > 0) ||
                    item > playerScores[currentlyActivePlayerIndex]
                      ? "url(#dark-blue-box-gradient)"
                      : "url(#orange-box-gradient)"
                  }
                  style={{
                    stroke: item === currentStreak ? "#f6cf24" : "#cddce4",
                    strokeWidth: 1,
                  }}
                />
                <text
                  x={boxX + boxWidth / 2}
                  y={boxY + boxHeight / 2 + 3.5}
                  fontSize={10}
                  textAnchor="middle"
                  fill={
                    (currentlyActivePlayerIndex < 0 && item > 0) ||
                    item > playerScores[currentlyActivePlayerIndex]
                      ? "#98c8f9ff"
                      : "#f6cf24ff"
                  }
                  fontFamily="Righteous, regular, sans-serif"
                >
                  {item}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="controls-container">
        <button
          onClick={toggleTimer}
          disabled={timer <= 0 || isRoundOver || currentlyActivePlayerIndex < 0}
          className={timerIsRunning ? "grey" : "green"}
        >
          {timerIsRunning ? "Pause" : "Start"}
        </button>
        <button
          disabled={currentlyActivePlayerIndex < 0 || timer <= 0 || isRoundOver}
          onClick={rightAnswer}
        >
          👍 Bonne réponse !
        </button>
        <button
          disabled={currentlyActivePlayerIndex < 0 || timer <= 0 || isRoundOver}
          onClick={wrongAnswer}
        >
          👎 Mauvaise réponse
        </button>
        <button
          disabled={
            currentlyActivePlayerIndex >= 0 && (timer > 0 || isRoundOver)
          }
          onClick={nextPlayer}
        >
          Personne suivante
        </button>
        <button disabled={!isRoundOver} onClick={goToNextRound}>
          Manche suivante
        </button>
      </div>
    </div>
  );
};

export default LongestStreak;
