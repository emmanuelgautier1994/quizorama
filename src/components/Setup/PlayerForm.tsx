import React from "react";

import FemaleUser from "../../assets/female-user.svg";
import MaleUser from "../../assets/male-user.svg";

const PlayerForm = ({
  playerName,
  setPlayerName,
  playerSilhouette,
  setPlayerSilhouette,
  playerLabel,
}: {
  playerName: string;
  setPlayerName: (name: string) => void;
  playerSilhouette: "male" | "female";
  setPlayerSilhouette: (silhouette: "male" | "female") => void;
  playerLabel: string;
}) => {
  return (
    <div className="player-section">
      <label>
        Nom:
        <br />
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="player-name-input"
          autoComplete="off"
          data-form-type="other"
          aria-autocomplete="none"
        />
      </label>
      <div>
        <span>Silhouette:</span>
        <div className="silhouette-options">
          <div
            onClick={() => setPlayerSilhouette("male")}
            className={`silhouette-option ${
              playerSilhouette === "male" ? "selected" : ""
            }`}
          >
            <img src={MaleUser} alt="Male Silhouette" width="60px" />
          </div>
          <div
            onClick={() => setPlayerSilhouette("female")}
            className={`silhouette-option ${
              playerSilhouette === "female" ? "selected" : ""
            }`}
          >
            <img src={FemaleUser} alt="Female Silhouette" width="60px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
