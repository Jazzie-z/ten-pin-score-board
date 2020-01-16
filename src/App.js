import React, { useState } from "react";
import ScoreBoard from "./Components/ScoreBoard";
import KeyBoard from "./Components/KeyBoard";
function App() {
  const [score, setScore] = useState([]);
  const [bonus, setBonus] = useState;
  const [bonusRound, setBonusRound] = useState(0);

  const updateScore = ({ value, additionalMove }) => {
    if (additionalMove) {
      setBonusRound(additionalMove);
    } else {
      setBonusRound(additionalMove - 1);
    }
    if (bonusRound > 0) {
      if (bonus) setBonus([...bonus, value]);
      else setBonus([bonus]);
    } else if (bonus) {
    } else {
      if (score.length && score[score.length - 1].length < 2) {
        let newScore = [...score];
        newScore[newScore.length - 1].push({ score: value });
        setScore(newScore);
      } else {
        setScore([...score, [{ score: value }]]);
      }
    }
  };
  console.log(score);
  return (
    <React.Fragment>
      <ScoreBoard />
      <KeyBoard updateScore={updateScore} />
    </React.Fragment>
  );
}

export default App;
