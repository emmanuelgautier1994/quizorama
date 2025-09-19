import React from "react";

import "./Setup.css";

import { Player } from "../../types/Player";
import PlayerForm from "./PlayerForm";
import InfoModal from "./InfoModal";

const Setup = ({
  onComplete,
}: {
  onComplete: (players: [Player, Player, Player, Player]) => void;
}) => {
  const [player1Name, setPlayer1Name] = React.useState("Maëlle");
  const [player2Name, setPlayer2Name] = React.useState("Lune");
  const [player3Name, setPlayer3Name] = React.useState("Gustave");
  const [player4Name, setPlayer4Name] = React.useState("Sciel");
  const [player1Silhouette, setPlayer1Silhouette] = React.useState<
    "male" | "female"
  >("female");
  const [player2Silhouette, setPlayer2Silhouette] = React.useState<
    "male" | "female"
  >("female");
  const [player3Silhouette, setPlayer3Silhouette] = React.useState<
    "male" | "female"
  >("male");
  const [player4Silhouette, setPlayer4Silhouette] = React.useState<
    "male" | "female"
  >("female");

  const [showInfoModal, setShowInfoModal] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete([
      {
        name: player1Name,
        gender: player1Silhouette,
      },
      {
        name: player2Name,
        gender: player2Silhouette,
      },
      {
        name: player3Name,
        gender: player3Silhouette,
      },
      {
        name: player4Name,
        gender: player4Silhouette,
      },
    ]);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="setup-container">
        <div className="title-container">
          <div className="spacer" />
          <h1>Quizorama</h1>
          <div className="info-container">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowInfoModal(true);
              }}
            >
              i
            </button>
          </div>
        </div>
        <div className="players-container">
          <PlayerForm
            playerName={player1Name}
            setPlayerName={setPlayer1Name}
            playerSilhouette={player1Silhouette}
            setPlayerSilhouette={setPlayer1Silhouette}
            playerLabel="Joueur 1"
          />
          <PlayerForm
            playerName={player2Name}
            setPlayerName={setPlayer2Name}
            playerSilhouette={player2Silhouette}
            setPlayerSilhouette={setPlayer2Silhouette}
            playerLabel="Joueur 2"
          />
          <PlayerForm
            playerName={player3Name}
            setPlayerName={setPlayer3Name}
            playerSilhouette={player3Silhouette}
            setPlayerSilhouette={setPlayer3Silhouette}
            playerLabel="Joueur 3"
          />
          <PlayerForm
            playerName={player4Name}
            setPlayerName={setPlayer4Name}
            playerSilhouette={player4Silhouette}
            setPlayerSilhouette={setPlayer4Silhouette}
            playerLabel="Joueur 4"
          />
        </div>
        <div className="submit-container">
          <button type="submit">C'est parti !</button>
        </div>
      </form>
      {showInfoModal && <InfoModal close={() => setShowInfoModal(false)} />}
    </>
  );
};

export default Setup;
