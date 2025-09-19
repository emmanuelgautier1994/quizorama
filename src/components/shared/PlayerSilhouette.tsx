import React from "react";
import FemaleUser from "../../assets/female-user.svg";
import MaleUser from "../../assets/male-user.svg";

const PlayerSilhouette = ({
  x,
  y,
  width,
  gradientHeight,
  type,
}: {
  x: number;
  y: number;
  width: number;
  gradientHeight: number;
  type: "male" | "female";
}) => (
  <g>
    {/* Vertical gradient from white to transparent */}
    <defs>
      <linearGradient
        id={`silhouette-gradient-${x}`}
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        <stop offset="0%" style={{ stopColor: "#b3b3b3ff" }} />
        <stop offset="80%" style={{ stopColor: "#b3b3b3ff" }} />
        <stop offset="95%" style={{ stopColor: "#313131ff" }} />
        <stop offset="100%" style={{ stopColor: "black" }} />
      </linearGradient>
      <mask id={`silhouette-mask-${x}-${y}`} type="luminance">
        <rect
          x={x}
          y={y}
          width={width}
          height={gradientHeight}
          fill={`url(#silhouette-gradient-${x})`}
        />
      </mask>
    </defs>
    <image
      href={type === "male" ? MaleUser : FemaleUser}
      x={x}
      y={type === "male" ? y - 3.5 : y}
      width={width}
      mask={`url(#silhouette-mask-${x}-${y})`}
    />
  </g>
);

export default PlayerSilhouette;
