import React from "react";
import "./ScoreCard.css";

function ScoreCard({ score, total, index }) {
  return (
    <div className={"outer__wrap"}>
      <h2>{index}</h2>
      <div className={"card__wrapper"}>
        <div className={"first__roll"}>{score.primary}</div>
        <div className={"inner__card "}>{score.secondary}</div>
        <div className={"frame__score"}>{total >= 0 ? total : " "}</div>
      </div>
    </div>
  );
}

ScoreCard.defaultProps = {
  score: {}
};
export default ScoreCard;
