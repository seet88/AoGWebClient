import React from "react";
import { AogButton } from "./AogButton";
import classes from "./AogButtonsList.module.css";

export const AogButtonsList = (props) => {
  const aogButtonsList = props.listOfButtons;
  const cssClass = props.cssClassName;
  return (
    <div className={classes[cssClass]}>
      <ul>
        {aogButtonsList.map((button) => (
          <li key={button.id}>
            <AogButton key={button.id} props={button} />
          </li>
        ))}
      </ul>
    </div>
  );
};
