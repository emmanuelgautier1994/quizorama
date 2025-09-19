import React from "react";

const sumOfNumbers = (n: number) => (n * (n + 1)) / 2;

const TimerBox = ({
  tier,
  position,
  fillLevel,
}: {
  tier: 1 | 2 | 3 | 4;
  position: "left" | "center" | "right";
  fillLevel: number; // Value between 0 and 1 representing the fill percentage
}) => {
  const boxHeight = (100 * tier) / (4 + 3 + 2 + 1) - 2;
  const boxWidth = 20;
  const boxY = 100 * (1 - sumOfNumbers(tier) / (4 + 3 + 2 + 1)) + 1;
  const boxX = 90;

  const transformX = position === "left" ? -5 : position === "right" ? 5 : 0;

  const fontSize = { 4: 18, 3: 16, 2: 12, 1: 8 }[tier];
  const textX = boxX + boxWidth / 2;
  const textY = boxY + boxHeight / 2 + fontSize / 3;

  const isCurrentTier = fillLevel > 0 && fillLevel < 1;
  const strokeColor = isCurrentTier ? "#f6cf24" : "#cddce4";

  return (
    <g transform={`translate(${transformX}, 0)`}>
      <defs>
        <mask id={`mask-${tier}`}>
          <rect
            x={boxX}
            y={boxY}
            width={boxWidth}
            height={boxHeight}
            fill="white"
            style={{ stroke: "black", strokeWidth: 1 }}
          />
          <rect
            x={boxX}
            y={boxY}
            width={boxWidth}
            height={boxHeight * (1 - fillLevel)}
            fill="black"
          />
        </mask>
      </defs>
      {/* Background fill and text */}
      <rect
        x={boxX}
        y={boxY}
        width={boxWidth}
        height={boxHeight}
        rx={1}
        ry={1}
        fill="#001044ff"
        fillOpacity={0.9}
        style={{ stroke: strokeColor, strokeWidth: 1 }}
      />
      <text
        x={textX}
        y={textY}
        fontSize={fontSize}
        textAnchor="middle"
        fill="#98c8f9ff"
        fillOpacity={fillLevel > 0 ? 1 : 0.3}
        fontFamily="Righteous, regular, sans-serif"
      >
        {tier}
      </text>
      {/* Gradient fill and text with mask */}
      <rect
        x={boxX}
        y={boxY}
        width={boxWidth}
        height={boxHeight}
        rx={1}
        ry={1}
        fill="url(#orange-box-gradient)"
        mask={`url(#mask-${tier})`}
      />
      <text
        x={textX}
        y={textY}
        fontSize={fontSize}
        textAnchor="middle"
        fill="#ffe70eff"
        fontFamily="Righteous, regular, sans-serif"
        mask={`url(#mask-${tier})`}
      >
        {tier}
      </text>
    </g>
  );
};

export default TimerBox;
