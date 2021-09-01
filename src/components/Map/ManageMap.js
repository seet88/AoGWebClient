import { useMap } from "react-leaflet";

const ManageMap = ({ center }) => {
  const map = useMap();
  map.panTo(center);
  return <div></div>;
};

export default ManageMap;
