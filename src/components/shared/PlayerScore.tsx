import React from "react";

const PlayerScore = ({
  x,
  y,
  width,
  height,
  fontSize,
  strokeWidth,
  score,
  highlighted,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  strokeWidth: number;
  score: number;
  highlighted: boolean;
}) => (
  <>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={1}
      ry={1}
      fill="url(#dark-blue-box-gradient)"
      style={{
        stroke: highlighted ? "#f6cf24ff" : "#cddce4",
        strokeWidth,
      }}
    />
    <text
      x={x + width / 2}
      y={y + width / 2 - fontSize / 3}
      fontSize={fontSize}
      textAnchor="middle"
      fill="white"
      fontFamily="Righteous, regular, sans-serif"
    >
      {score}
    </text>
  </>
);

export default PlayerScore;
