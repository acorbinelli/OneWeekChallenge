import React from "react";
import classes from "./button.module.css";

const Button = (props) => {
  const primaryClass = classes.button;
  const secondaryClass = classes["button-secondary"];
  const thirdClass = classes["button-third"];
  const thirdClassDisabled = classes["button-third-disabled"];
  const forthClassAdd = classes["button-forth-add"];
  const forthClassRemove = classes["button-forth-remove"];
  const forthClassDisable = classes["button-forth-disabled"];
  const selectClass = (classType) => {
    switch (classType) {
      case "primary":
        return primaryClass;
      case "secondary":
        return secondaryClass;
      case "third":
        return thirdClass;
      case "disabled":
        return thirdClassDisabled;
      case "forth-add":
        return forthClassAdd;
      case "forth-remove":
        return forthClassRemove;
      case "forth-disabled":
        return forthClassDisable;
      default:
        return primaryClass;
    }
  };

  return (
    <button className={selectClass(props.classType)} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
