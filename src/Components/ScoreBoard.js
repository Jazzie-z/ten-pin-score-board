import React from "react";
import ScoreCard from "./ScoreCard";
import "./ScoreBoard.css";
function ScoreBoard() {
  var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      ScoreBoard
      {data.map(item => (
        <ScoreCard />
      ))}
      <div className={"total__score"}>
        <div>TOTAL</div>
      </div>
    </div>
  );
}

export default ScoreBoard;
