import React, { useState, useEffect } from "react";

const KEY_VALUES = [
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: 4, value: 4 },
  { name: 5, value: 5 },
  { name: 6, value: 6 },
  { name: 7, value: 7 },
  { name: 8, value: 8 },
  { name: 9, value: 9 },
  { name: "NULL", displayname: "-", value: 0 },
  {
    name: "SPARE",
    displayname: "/",
    value: 0,
    disabled: true,
    additionalMove: 1
  },
  { name: "STRIKE", displayname: "X", value: 10, additionalMove: 2 }
];

function KeyBoard(props) {
  var [values, setValues] = useState(KEY_VALUES);

  const onClickHandler = item => e => {
    if (values.filter(item => item.disabled).length > 1) {
      //enable the disabled buttons
      //   console.log(KEY_VALUES);
      setValues(KEY_VALUES);
    } else {
      //disable bigger numbers for second roll
      let newData = [...values];
      newData = newData.map(item => {
        if (item.value + parseInt(e.target.value) >= 10) {
          item = { ...item, disabled: true };
        } else {
          item = { ...item, disabled: false };
        }
        return item;
      });
      setValues(newData);
    }
    props.updateScore(item);
  };

  return (
    <div>
      {values.map((item, index) => (
        <button
          key={`${item.name}-${index}`}
          onClick={onClickHandler(item)}
          value={item.value}
          disabled={item.disabled}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default KeyBoard;
