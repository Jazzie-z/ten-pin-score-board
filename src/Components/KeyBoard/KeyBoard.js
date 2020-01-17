import React from "react";
import PropTypes from "prop-types";
import "./KeyBoard.css";

function KeyBoard({ updateScore }) {
  // var [values, setValues] = useState(KEY_VALUES);
  const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onClickHandler = e => {
    let value = parseInt(e.target.value);
    updateScore(value);
  };

  return (
    <div className={"keyboard"}>
      {keys.map((item, index) => (
        <button
          className={"button"}
          key={`${item}-${index}`}
          onClick={onClickHandler}
          value={item}
          disabled={item.disabled}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

KeyBoard.propTypes = {
  updateScore: PropTypes.func
};

export default KeyBoard;
