import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Polyline,
} from "react-leaflet";
import { useEffect, useRef, forwardRef } from "react";
import classes from "./MapJob.module.css";
import { useSelector } from "react-redux";
import tractor from "../../icons/tractor.png";
import "leaflet-rotatedmarker";
import ManageMap from "./ManageMap";
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

const purpleOptions = { color: "purple" };
const tractorIcon = L.icon({
  iconUrl: tractor,
  iconSize: [30, 30], // size of the icon
});

const RotatedMarker = forwardRef(({ children, ...props }, forwardRef) => {
  const markerRef = useRef();

  const { rotationAngle, rotationOrigin } = props;
  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.setRotationAngle(rotationAngle);
      marker.setRotationOrigin(rotationOrigin);
    }
  }, [rotationAngle, rotationOrigin]);

  return (
    <Marker
      ref={(ref) => {
        markerRef.current = ref;
        if (forwardRef) {
          forwardRef.current = ref;
        }
      }}
      {...props}
    >
      {children}
    </Marker>
  );
});

const MapJob = (props) => {
  const aogData = useSelector((state) => state.aogClientData);
  //console.log(aogData);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  let heading = 0;
  if (aogData.vehicle) heading = aogData.vehicle.heading - 90;

  if (aogData.initValue)
    return (
      <MoonLoader
        color="green"
        loading={aogData.initValue}
        css={override}
        size={250}
      />
    );
  else
    return (
      <MapContainer
        className={classes.map}
        center={aogData.vehicleCurrentPoint}
        zoom={19}
        maxZoom={24}
      >
        <ManageMap center={aogData.vehicleCurrentPoint} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <RotatedMarker
          position={aogData.vehicleCurrentPoint}
          rotationAngle={heading}
          rotationOrigin="center"
          icon={tractorIcon}
        />

        <Polyline
          pathOptions={{ color: "Orange" }}
          positions={aogData.vehiclePath}
        />
        <Polygon pathOptions={purpleOptions} positions={aogData.multiPolygon} />
        {/* <Polygon pathOptions={{ color: "green" }} positions={plot} /> */}
      </MapContainer>
    );
};

export default MapJob;
