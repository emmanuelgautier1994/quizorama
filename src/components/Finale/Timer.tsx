import React from "react";
import TimerBox from "./TimerBox";
import { Positions, TIERS, sumOfNumbers } from "./utils/timer";

type TimerProps = {
  timerProgress: number;
  timerPositions: Positions;
};

const Timer: React.FC<TimerProps> = ({ timerProgress, timerPositions }) => {
  return (
    <>
      {TIERS.map((tier) => {
        const fillLevel = Math.max(
          0,
          Math.min(
            1,
            (timerProgress - sumOfNumbers(tier - 1) / sumOfNumbers(4)) /
              (tier / sumOfNumbers(4))
          )
        );
        return (
          <TimerBox
            key={tier}
            tier={tier}
            position={timerPositions[tier]}
            fillLevel={fillLevel}
          />
        );
      })}
    </>
  );
};

export default Timer;
