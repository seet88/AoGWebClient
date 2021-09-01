import { useDispatch } from "react-redux";
import { useSubscription } from "@apollo/client";
import { GET_DATA_FROM_AOG } from "../../graphql/graph-mutation";
import { TimeAgo } from "../dataInfo/TimeAgo";
import { addNewAogPositions } from "../../store/aogClientData-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  updateButtonByName,
  updateSectionsButtons,
} from "../../store/aogButtonsControl-slice";
import { useEffect } from "react";
import classes from "./AogClientData.module.css";

const AogClientData = () => {
  const { data } = useSubscription(GET_DATA_FROM_AOG);
  const dispatch = useDispatch();

  const addNewPositionsFromAog = async () => {
    const resultAction = await dispatch(
      addNewAogPositions({ data: data.dataFromAog })
    );
    unwrapResult(resultAction);
  };

  useEffect(() => {
    if (data?.dataFromAog?.sections) {
      addNewPositionsFromAog();
      dispatch(updateSectionsButtons({ sections: data.dataFromAog.sections }));
    }
    if (data?.dataFromAog?.controlButtonsState) {
      const {
        buttonManState,
        buttonAutoState,
        autoSteerButtonState,
        lineABButtonState,
        curveLineButtonState,
        hydraulicLiftButtonState,
        uTurnButtonState,
        headlandButtonState,
      } = data.dataFromAog.controlButtonsState;

      dispatch(
        updateButtonByName({
          buttonState: buttonManState,
          name: "sectionManualToggle",
        })
      );
      dispatch(
        updateButtonByName({
          buttonState: buttonAutoState,
          name: "sectionAutoToggle",
        })
      );
      dispatch(
        updateButtonByName({
          buttonState: autoSteerButtonState,
          name: "autoSteerToggle",
        })
      );
      dispatch(
        updateButtonByName({
          buttonState: lineABButtonState,
          name: "lineABButton",
        })
      );
      dispatch(
        updateButtonByName({
          buttonState: curveLineButtonState,
          name: "curveLineButton",
        })
      );
      dispatch(
        updateButtonByName({
          buttonState: hydraulicLiftButtonState,
          name: "hydraulicLiftToggle",
        })
      );
      dispatch(
        updateButtonByName({
          buttonState: uTurnButtonState,
          name: "uTurnToggle",
        })
      );

      dispatch(
        updateButtonByName({
          buttonState: headlandButtonState,
          name: "headlandToggle",
        })
      );
    }
  }, [data]);

  if (!data) return "";
  const dataTimestamp = data.dataFromAog?.dataInfo?.timestamp;

  return (
    <div className={classes.counter}>
      <TimeAgo timestamp={dataTimestamp} />
    </div>
  );
};

export default AogClientData;
