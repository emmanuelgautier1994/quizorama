import React from "react";

const PlayerTag = ({
  x,
  y,
  name,
  fontSize,
}: {
  x: number;
  y: number;
  name: string;
  fontSize: number;
}) => (
  <text x={x} y={y} fontSize={fontSize} textAnchor="middle" fill="white">
    {name}
  </text>
);

export default PlayerTag;
