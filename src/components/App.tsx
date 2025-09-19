import React from "react";
import "./App.css";
import Finale from "./Finale";
import Setup from "./Setup";
import { Player } from "../types/Player";
import PointsRace from "./PointsRace";
import LongestStreak from "./LongestStreak";
import TieBreaker from "./TieBreaker";

const App = () => {
  const [pointsRacePlayers, setPointsRacePlayers] = React.useState<
    [Player, Player, Player, Player] | null
  >(null);
  const [longestStreakPlayers, setLongestStreakPlayers] = React.useState<
    [Player, Player, Player] | null
  >(null);
  const [tieBreakerPlayers, setTieBreakerPlayers] = React.useState<
    [Player, Player, Player] | null
  >(null);
  const [
    tieBreakerAlreadyQualifiedPlayer,
    setTieBreakerAlreadyQualifiedPlayer,
  ] = React.useState<Player | null>(null);
  const [finalePlayers, setFinalePlayers] = React.useState<
    [Player, Player] | null
  >(null);
  const [currentStep, setCurrentStep] = React.useState<
    "setup" | "points_race" | "longest_streak" | "tie_breaker" | "finale"
  >("setup");

  return currentStep === "setup" ? (
    <Setup
      onComplete={(players) => {
        setPointsRacePlayers(players);
        setCurrentStep("points_race");
      }}
    />
  ) : currentStep === "points_race" ? (
    <PointsRace
      players={pointsRacePlayers}
      onComplete={(players) => {
        setLongestStreakPlayers(players);
        setCurrentStep("longest_streak");
      }}
    />
  ) : currentStep === "longest_streak" ? (
    <LongestStreak
      players={longestStreakPlayers}
      onProgressToKnockout={(players, alreadyQualifiedPlayer) => {
        setTieBreakerPlayers(players);
        setTieBreakerAlreadyQualifiedPlayer(alreadyQualifiedPlayer);
        setCurrentStep("tie_breaker");
      }}
      onComplete={(players) => {
        setFinalePlayers(players);
        setCurrentStep("finale");
      }}
    />
  ) : currentStep === "tie_breaker" ? (
    <TieBreaker
      players={tieBreakerPlayers}
      alreadyQualifiedPlayer={tieBreakerAlreadyQualifiedPlayer}
      onComplete={(players) => {
        setFinalePlayers(players);
        setCurrentStep("finale");
      }}
    />
  ) : (
    <Finale players={finalePlayers} />
  );
};

export default App;
