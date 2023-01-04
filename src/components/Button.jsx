import React from "react";
import "./Button.css";

const Button = (props) => {
  let className = `
  button 
  ${props.operation ? "operation" : ""}
  ${props.double ? "double" : ""}
  ${props.triple ? "triple" : ""}
  `;

  return (
    <button className={className} onClick={(e) => props.click(props.label)}>
      {props.label}
    </button>
  );
};

export default Button;
