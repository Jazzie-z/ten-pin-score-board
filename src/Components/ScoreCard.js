import React from "react";
import styles from "./ScoreCard.css";
function ScoreCard() {
  return (
    <div className={"card__wrapper"}>
      <div className={"first__roll"}>9</div>
      <div className={"inner__card "}>-</div>
      <div className={"frame__score"}>9</div>
    </div>
  );
}

export default ScoreCard;
