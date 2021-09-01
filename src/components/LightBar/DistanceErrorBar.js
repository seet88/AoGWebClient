import { Fragment } from "react";
import classes from "./DistanceErrorBar.module.css";

const DistanceErrorBar = (props) => {
  return (
    <div className={classes.box}>
      {props?.errorDistance > 0 && (
        <div className={classes.leftDirection} key={3}></div>
      )}
      <span key={2} className={classes.span}>
        <b>{props.errorDistance}</b>
      </span>
      {props?.errorDistance < 0 && (
        <div className={classes.rightDirection} key={1}></div>
      )}
    </div>
  );
};

export default DistanceErrorBar;
