import React from "react";
import "./TieBreaker.css";
import { Player } from "../../types/Player";
import PlayerSilhouette from "../shared/PlayerSilhouette";
import PlayerTag from "../shared/PlayerTag";
import PlayerScore from "../shared/PlayerScore";
import BoxGradientDefinitions from "../shared/BoxGradientDefinitions";

const TieBreaker = ({
  players,
  alreadyQualifiedPlayer,
  onComplete,
}: {
  players: [Player, Player, Player];
  alreadyQualifiedPlayer: Player | null;
  onComplete: (players: [Player, Player]) => void;
}) => {
  const [scores, setScores] = React.useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const qualifiedPlayers = players.filter(
    (player, index) => player === alreadyQualifiedPlayer || scores[index] === 2
  );

  const roundShouldEnd = qualifiedPlayers.length === 2;

  const awardPoint = (index: number) => {
    setScores((prevScores) => {
      const newScores = [...prevScores] as [number, number, number];
      newScores[index] = Math.min(2, prevScores[index] + 1);
      return newScores;
    });
  };

  return (
    <div className="four-in-a-round-knockout-container">
      <div className="title-container">
        <h1>Départage</h1>
      </div>
      <div className="middle-container">
        <div className="players-container">
          {players.map((player, index) => {
            const isInPlay = !qualifiedPlayers.includes(player);
            return (
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
                  {alreadyQualifiedPlayer !== player && (
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
                  )}
                </svg>
                <button
                  disabled={!isInPlay || roundShouldEnd}
                  onClick={() => awardPoint(index)}
                >
                  Bonne réponse !
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="controls-container">
        <button
          className="control-button"
          onClick={() => onComplete([qualifiedPlayers[0], qualifiedPlayers[1]])}
          disabled={!roundShouldEnd}
        >
          Manche suivante
        </button>
      </div>
    </div>
  );
};

export default TieBreaker;
