import { Fragment, useState } from "react";
import { POST_CALL_ACTION_IN_AOG } from "../../graphql/graph-mutation";
import { useMutation } from "@apollo/client";
import classes from "./AogButton.module.css";

export const AogButton = ({ props }) => {
  const [postCallActionInAog] = useMutation(POST_CALL_ACTION_IN_AOG);
  const [isButtonClicked, setIsButtonClicked] = useState();
  let imagePath = "";
  if (props?.name === "uTurnDirectionToggle") {
    imagePath = props?.imagePath?.right;
  } else imagePath = props?.imagePath;

  const sendActionToAoGServerHandler = () => {
    console.log("sendingActionToAoGInMapJob");
    setIsButtonClicked(classes.isClicked);

    postCallActionInAog({
      variables: {
        name: props.name,
        params: props.params,
        type: props.type,
      },
    });
    setTimeout(() => {
      setIsButtonClicked();
    }, 1000);
  };
  const cssClass = `${classes[props?.cssClassName]} ${isButtonClicked} ${
    classes[String(props?.buttonState)?.toLowerCase()]
  }`;

  return (
    <Fragment>
      <button className={cssClass} onClick={sendActionToAoGServerHandler}>
        {imagePath && (
          <img
            src={imagePath}
            alt={props.buttonName}
            height={80}
            className={classes.imageButton}
          ></img>
        )}
        {!imagePath && props.buttonName.slice(0, 10)}
      </button>
    </Fragment>
  );
};
