import React from "react";

type ChooseLeaderProps = {
  chooseLeft: () => void;
  chooseRight: () => void;
};

const ChooseLeader: React.FC<ChooseLeaderProps> = ({
  chooseLeft,
  chooseRight,
}) => {
  return (
    <>
      <button onClick={chooseLeft}>Main à gauche</button>
      <button onClick={chooseRight}>Main à droite</button>
    </>
  );
};

export default ChooseLeader;
