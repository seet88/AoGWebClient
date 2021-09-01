// import classes from "./LightSquare.module.css";

const LightFigure = ({ props }) => {
  //   const cssClass = `${classes.square} ${classes[props.backgroundColor]}`;
  const style = {
    height: "2rem",
    width: "2rem",
    borderStyle: "solid",
    backgroundColor: props?.backgroundColor,
    borderColor: props?.active ? props?.backgroundColor : props?.borderColor,
    borderWidth: "0.7rem",
  };
  return <div style={style}></div>;
};

export default LightFigure;
