import React from "react";
import ScoreCard from "./ScoreCard";
import "./ScoreBoard.css";

function ScoreBoard({ rolls, total }) {
  var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <h1>ScoreBoard</h1>
      <div className={"wrapper"}>
        {data.map((item, index) => {
          return (
            <ScoreCard
              key={`${rolls[index]}-${index}`}
              score={rolls[index]}
              total={total[index]}
              index={index}
            />
          );
        })}
        {<ScoreCard score={rolls[10]} index={10} />}
        {<ScoreCard score={rolls[11]} index={11} />}
        <div className={"total__score__card"}>
          <h3 id={"card__title"}>TOTAL</h3>
          <div id={"card__total"}>
            {total[total.length - 1 < 10 ? total.length - 1 : 9]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
