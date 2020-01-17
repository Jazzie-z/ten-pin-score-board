import React, { useState, useEffect } from "react";
import ScoreBoard from "./Components/ScoreBoard";
import KeyBoard from "./Components/KeyBoard";
import {
  MAX_ROLLS,
  GENERAL_ROLL_LIMIT,
  MAX_ROLLS_PER_FRAME,
  MAX_SCORE
} from "./Constants/constant";

function App() {
  const [score, setScore] = useState([]);
  const [rolls, setRolls] = useState([]);

  const isNextFrameAvailble = () => {
    if (rolls.length === MAX_ROLLS) return false;
    if (
      rolls.length === MAX_ROLLS - 1 &&
      rolls[GENERAL_ROLL_LIMIT - 1] + rolls[GENERAL_ROLL_LIMIT] < MAX_SCORE
    ) {
      return false;
    }
    return true;
  };

  const isStrike = roll => roll === MAX_SCORE;
  const isFirstRoll = () => rolls.length % MAX_ROLLS_PER_FRAME === 0;
  const isSecondRoll = () =>
    !isFirstRoll() && rolls.length < GENERAL_ROLL_LIMIT;
  const isLastRoll = () =>
    rolls.length === GENERAL_ROLL_LIMIT &&
    rolls[GENERAL_ROLL_LIMIT - 1] !== MAX_SCORE;
  const isLastBonuspresent = () =>
    rolls.length === MAX_ROLLS - 1 &&
    isStrike(rolls[GENERAL_ROLL_LIMIT - 1]) &&
    rolls[GENERAL_ROLL_LIMIT] !== MAX_SCORE;

  const isRollValid = roll => {
    if (isSecondRoll() || isLastRoll() || isLastBonuspresent())
      return roll <= MAX_SCORE - rolls[rolls.length - 1];
    return true;
  };

  useEffect(() => {
    //set null for secondary roll after strike
    if (!isFirstRoll() && isStrike(rolls[rolls.length - 1])) {
      setRolls([...rolls, null]);
    }
  }, [rolls]);

  const getScorePerFrame = (rolls, bonus) => {
    if (rolls[0] + rolls[1] < MAX_SCORE) {
      //general score
      return rolls[0] + (rolls[1] || 0);
    }
    if (isStrike(rolls[0]) && bonus[1] === null) {
      //2 consequtive strikes
      return rolls[0] + bonus[0] + (bonus[2] || 0);
    }
    if (isStrike(rolls[0]) || isStrike(rolls[1])) {
      //single strike
      return (rolls[0] || rolls[1]) + (bonus[0] || 0) + (bonus[1] || 0);
    }
    //spare and single score
    return rolls[0] + (rolls[1] || 0) + (bonus[0] || 0);
  };

  useEffect(() => {
    let scores = [];
    var sum = 0;
    for (var index = 0; index < rolls.length; index += MAX_ROLLS_PER_FRAME) {
      if (index <= GENERAL_ROLL_LIMIT - 1) {
        let rollsPerFrame = rolls.slice(index, index + MAX_ROLLS_PER_FRAME);
        let bonus = rolls.slice(index + 2, index + 5);
        sum += getScorePerFrame(rollsPerFrame, bonus);
        scores.push(sum);
      }
    }
    if (rolls.length > GENERAL_ROLL_LIMIT - 1) {
      sum += rolls
        .slice(GENERAL_ROLL_LIMIT - 1, MAX_ROLLS)
        .reduce((a, b) => a + b);
      scores.push(sum);
    }
    setScore(scores);
  }, [rolls]);

  const updateScore = value => {
    if (isNextFrameAvailble() && isRollValid(value)) {
      setRolls([...rolls, value]);
    }
  };

  const getTransformedData = data => {
    let result = [];
    for (let i = 0; i < data.length; i += MAX_ROLLS_PER_FRAME) {
      result.push({
        primary: data[i],
        secondary: data[i + 1]
      });
    }
    return result;
  };

  return (
    <React.Fragment>
      <ScoreBoard rolls={getTransformedData(rolls)} total={score} />
      <KeyBoard updateScore={updateScore} rolls={rolls} />
    </React.Fragment>
  );
}

export default App;
