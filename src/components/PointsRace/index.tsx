import React from "react";
import "./PointsRace.css";
import { Player } from "../../types/Player";
import PlayerSilhouette from "../shared/PlayerSilhouette";
import PlayerTag from "../shared/PlayerTag";
import PlayerScore from "../shared/PlayerScore";
import BoxGradientDefinitions from "../shared/BoxGradientDefinitions";

const PointsRace = ({
  players,
  onComplete,
}: {
  players: [Player, Player, Player, Player];
  onComplete: (players: [Player, Player, Player]) => void;
}) => {
  const [scores, setScores] = React.useState<[number, number, number, number]>([
    0, 0, 0, 0,
  ]);
  const [qualifiedPlayers, setQualifiedPlayers] = React.useState<Player[]>([]);
  const [pointsCurrentlyInPlay, setPointsCurrentlyInPlay] = React.useState<
    number | null
  >(null);
  const [subtitle, setSubtitle] = React.useState<string>("_");

  const roundShouldEnd = qualifiedPlayers.length === 3;

  const awardPoints = (index: number, points: number) => {
    if (scores[index] + points >= 9) {
      setQualifiedPlayers((prevQualifiedPlayers) => [
        ...prevQualifiedPlayers,
        players[index],
      ]);
    }

    setScores((prevScores) => {
      const newScores = [...prevScores] as [number, number, number, number];
      newScores[index] = Math.min(9, prevScores[index] + points);
      return newScores;
    });
    setPointsCurrentlyInPlay(null);
  };

  React.useEffect(() => {
    if (pointsCurrentlyInPlay !== null) {
      setSubtitle(
        `Pour ${pointsCurrentlyInPlay} point${
          pointsCurrentlyInPlay > 1 ? "s" : ""
        } ...`
      );
    }
  }, [pointsCurrentlyInPlay]);

  return (
    <div className="nine-to-win-container">
      <div className="title-container">
        <h1>La Course aux Points</h1>
      </div>
      <div className="middle-container">
        <h2 className={pointsCurrentlyInPlay === null ? "invisible" : ""}>
          {subtitle}
        </h2>
        <div className="players-container">
          {players.map((player, index) => (
            <div key={index} className="player-container">
              <svg viewBox="0 0 100 100" width="200" height="200">
                <defs>
                  <BoxGradientDefinitions />
                </defs>
                <PlayerSilhouette
                  x={10}
                  y={0}
                  width={80}
                  gradientHeight={65}
                  type={player.gender}
                />
                <PlayerTag x={50} y={72.5} name={player.name} fontSize={10} />
                <PlayerScore
                  x={35}
                  y={82}
                  width={30}
                  height={15}
                  fontSize={11}
                  strokeWidth={1.5}
                  score={scores[index]}
                  highlighted={qualifiedPlayers.includes(player)}
                />
              </svg>
              <button
                disabled={
                  pointsCurrentlyInPlay === null ||
                  qualifiedPlayers.includes(player) ||
                  roundShouldEnd
                }
                onClick={() => {
                  awardPoints(index, pointsCurrentlyInPlay);
                }}
              >
                Bonne réponse !
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="controls-container">
        <button
          className="control-button"
          onClick={() => setPointsCurrentlyInPlay(1)}
          disabled={pointsCurrentlyInPlay !== null || roundShouldEnd}
        >
          Question à 1 point
        </button>
        <button
          className="control-button"
          disabled={pointsCurrentlyInPlay !== null || roundShouldEnd}
          onClick={() => setPointsCurrentlyInPlay(2)}
        >
          Question à 2 points
        </button>
        <button
          className="control-button"
          disabled={pointsCurrentlyInPlay !== null || roundShouldEnd}
          onClick={() => setPointsCurrentlyInPlay(3)}
        >
          Question à 3 points
        </button>
        <div className="spacer" />
        <button
          className="control-button"
          onClick={() =>
            onComplete(qualifiedPlayers as [Player, Player, Player])
          }
          disabled={!roundShouldEnd}
        >
          Manche suivante
        </button>
      </div>
    </div>
  );
};

export default PointsRace;
