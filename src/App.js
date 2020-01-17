import React, { useState, useEffect } from "react";
import ScoreBoard from "./Components/ScoreBoard";
import KeyBoard from "./Components/KeyBoard";

function App() {
  const [score, setScore] = useState([]);
  const [rolls, setRolls] = useState([]);

  const isNextFrameAvailble = () => {
    if (rolls.length === 21) return false;
    if (rolls.length === 20 && rolls[18] + rolls[19] < 10) {
      return false;
    }
    return true;
  };

  const isSecondRoll = () => rolls.length % 2 === 1 && rolls.length < 19;
  const isLastRoll = () => rolls.length === 19 && rolls[18] !== 10;
  const isLastBonuspresent = () =>
    rolls.length === 20 && rolls[18] == 10 && rolls[19] !== 10;

  const isRollValid = roll => {
    if (isSecondRoll() || isLastRoll() || isLastBonuspresent())
      return roll <= 10 - rolls[rolls.length - 1];
    return true;
  };

  useEffect(() => {
    //set null for secondary roll after strike
    if (rolls.length % 2 === 1 && rolls[rolls.length - 1] === 10) {
      console.error("NULLED");
      setRolls([...rolls, null]);
    }
  }, [rolls]);

  useEffect(() => {
    let scores = [];
    var totalScore = 0;
    for (var index = 0; index < rolls.length; index += 2) {
      if (index <= 18) {
        let rollsPerFrame = rolls.slice(index, index + 2);
        let bonus = rolls.slice(index + 2, index + 5);
        totalScore += getScorePerFrame(rollsPerFrame, bonus);
        // if (rollsPerFrame[1]){
        scores.push(totalScore);
        // }
      }
    }
    if (rolls.length > 18) {
      totalScore += rolls.slice(18, 21).reduce((a, b) => a + b);
      scores.push(totalScore);
    }
    setScore(scores);
  }, [rolls]);

  const getScorePerFrame = (rolls, bonus) => {
    if (rolls[0] + rolls[1] < 10) {
      //general score
      return rolls[0] + (rolls[1] || 0);
    }
    if (rolls[0] === 10 && bonus[1] === null) {
      //2 consequtive strikes
      return rolls[0] + bonus[0] + (bonus[2] || 0);
    }
    if (rolls[0] === 10 || rolls[1] === 10) {
      //single strike
      return (rolls[0] || rolls[1]) + (bonus[0] || 0) + (bonus[1] || 0);
    }
    //spare and single score
    return rolls[0] + (rolls[1] || 0) + (bonus[0] || 0);
  };

  const updateScore = value => {
    if (isNextFrameAvailble() && isRollValid(value)) {
      setRolls([...rolls, value]);
    }
  };

  const getTransformedData = data => {
    let result = [];
    for (let i = 0; i < data.length; i += 2) {
      // console.log('index',i)
      result.push({
        primary: data[i],
        secondary: data[i + 1]
      });
    }
    // console.log('result',result,data.length)
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
