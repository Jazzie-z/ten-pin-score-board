import React from "react";
import PropTypes from "prop-types";
import ScoreCard from "../ScoreCard/";
import "./ScoreBoard.css";

function BonusCards({ rolls }) {
  return (
    <React.Fragment>
      <ScoreCard score={rolls[10]} index={10} />
      <ScoreCard score={rolls[11]} index={11} />
    </React.Fragment>
  );
}

function TotalCard({ total }) {
  return (
    <div className={"total__score__card"}>
      <h3 className={"card__title"}>TOTAL</h3>
      <div className={"card__total"}>
        {total[total.length - 1 < 10 ? total.length - 1 : 9]}
      </div>
    </div>
  );
}

function ScoreBoard({ rolls, total }) {
  var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={"score__board"}>
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
        <BonusCards rolls={rolls} />
        <TotalCard total={total} />
      </div>
    </div>
  );
}

ScoreBoard.propTypes = {
  rolls: PropTypes.array,
  total: PropTypes.array
};

BonusCards.propTypes = {
  rolls: PropTypes.array
};

TotalCard.propTypes = {
  total: PropTypes.array
};

export default ScoreBoard;
