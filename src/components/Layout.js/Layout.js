import { Fragment } from "react";
import MainHeader from "./MainHeader";
import { AogButtonsList } from "../aogButtons/AogButtonsList";
import MapJob from "../Map/MapJob";
import AogClientData from "../aogData/AogClientData";
import classes from "./Layout.module.css";
import { useSelector } from "react-redux";
import { buttonsListByCssClassName } from "../../store/aogButtonsControl-slice";
import LightBar from "../LightBar/LightBar";
import DistanceErrorBar from "../LightBar/DistanceErrorBar";

const Layout = (props) => {
  const sections = "sections";
  const control = "control";
  const leftSideErrorDistance = "leftSideErrorDistance";
  const rightSideErrorDistance = "rightSideErrorDistance";

  const buttonsListSections = useSelector((state) =>
    buttonsListByCssClassName(state, sections)
  );
  const buttonsListTractorControl = useSelector((state) =>
    buttonsListByCssClassName(state, control)
  );
  const buttonsListLeftSideErrorDistanceControl = useSelector((state) =>
    buttonsListByCssClassName(state, leftSideErrorDistance)
  );
  const buttonsListRightSideErrorDistanceControl = useSelector((state) =>
    buttonsListByCssClassName(state, rightSideErrorDistance)
  );
  const errorDistance = useSelector(
    (state) => state?.aogClientData?.distanceNavigationError
  );

  return (
    <Fragment>
      {/* <MainHeader /> */}
      <div className={classes.wrapper}>
        <div className={classes.map}>
          <LightBar errorDistance={errorDistance} />
          <div className={classes.errorDistance}>
            <div className={classes.space}></div>
            <AogButtonsList
              listOfButtons={buttonsListLeftSideErrorDistanceControl}
              cssClassName={leftSideErrorDistance}
            />
            <DistanceErrorBar errorDistance={errorDistance} />
            <AogButtonsList
              listOfButtons={buttonsListRightSideErrorDistanceControl}
              cssClassName={rightSideErrorDistance}
            />
            <div className={classes.space}></div>
          </div>
          <MapJob />
          <AogButtonsList
            listOfButtons={buttonsListSections}
            cssClassName={sections}
          />
        </div>
        <div className={classes.control}>
          <AogClientData />
          <AogButtonsList
            listOfButtons={buttonsListTractorControl}
            cssClassName={control}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
