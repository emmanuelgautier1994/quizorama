import React from "react";
import "./InfoModal.css";

const InfoModal = ({ close }: { close: () => void }) => {
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Mentions légales</h2>
        <p>
          Quizorama est un outil pour animer des quiz. Bien que le déroulé de
          ces quiz s'inspire du jeu télévisé Questions Pour un Champion,
          Quizorama a été créé sans affiliation ni autorisation de la part de
          France Télévisions.
        </p>
        <p>
          Le code de cet outil est open source et disponible sur{" "}
          <a
            href="https://github.com/emmanuelgautier1994/quizorama"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
        <h2>Crédits icônes</h2>
        <p>
          Icon User by Kris.27 from{" "}
          <a
            href="https://thenounproject.com/browse/icons/term/user/"
            target="_blank"
            title="User Icons"
          >
            Noun Project
          </a>{" "}
          (CC BY 3.0)
        </p>
        <div className="button-container">
          <button onClick={close}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
