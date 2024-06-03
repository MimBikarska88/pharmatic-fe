import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { useMapEvents } from "react-leaflet";
import L from "leaflet";

import PDInput from "../../PDInput/PDInput";
import PDTextArea from "../../PDTextArea/PDTextArea";

import { useUserStore } from "../../../stores/userStore";
import { useEffect, useState } from "react";

import styles from "./CustomerAddressTab.module.css";
import marker from "../../../static/img/icons/marker.png";

import { checkAllSecondTabFields } from "../CustomerRegistrationUtils";
import { useValidationStore } from "../../../stores/validationStore";

import useGetMapLocationQuery from "../../../queries/GetMapLocationQuery/useGetMapLocationQuery";

const CustomerAddressTab = () => {
  console.log("here customer address tab");
  const Customer = useUserStore((state) => state.Customer);
  const Register = useValidationStore((state) => state.Register);
  const setAddress = useUserStore((state) => state.setAddress);
  const setAddressCorrectFormat =
    useValidationStore.getState().setAddressCorrectFormat;
  const setAddressIncorrectFormat =
    useValidationStore.getState().setAddressIncorrectFormat;

  const getMapLocationQuery = useGetMapLocationQuery();

  const INITIAL_COORDINATES = [51.505, -0.09];
  const [position, setPosition] = useState(INITIAL_COORDINATES);

  const MarkerIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [35, 45],
  });

  useEffect(() => {
    // changes fields from valid to invalid
    if (checkAllSecondTabFields()) {
      setAddressIncorrectFormat();
    } else {
      setAddressCorrectFormat();
    }
  }, [
    Customer.detailedAddress,
    Customer.country,
    Customer.postcode,
    Customer.city,
  ]);

  const handleSuccessMapLocation = (res) => {
    const address = res.data.address;
    const country = address?.country || "";
    const postcode = address?.postcode || "";
    const city = address?.city || address?.town || address?.village || "";
    const detailedAddress = res.data?.display_name || "";
    setAddress(country, city, postcode, detailedAddress);
  };

  const { isLoading, isError } = getMapLocationQuery(
    position,
    handleSuccessMapLocation
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something happened, please try reloading.</div>;
  }

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      },
    });

    return position === null ? (
      <></>
    ) : (
      <Marker position={position} icon={MarkerIcon}></Marker>
    );
  };

  return (
    <>
      <div>
        <p>
          <strong>Please, select your registered address.</strong>
        </p>
      </div>

      <MapContainer
        center={INITIAL_COORDINATES}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <div className="container-fluid">
        <div className="d-flex flex-row">
          <PDInput
            className={styles["input-field-address"]}
            label={"Country"}
            type="text"
            isReadOnly={true}
            isValid={Register.country}
            required={true}
            value={Customer.country}
          />
          <PDInput
            className={styles["input-field-address"]}
            label={"City"}
            isReadOnly={true}
            required={true}
            isValid={Register.city}
            type="text"
            value={Customer.city}
          />
          <PDInput
            className={styles["input-field-address"]}
            label={"Postcode"}
            isReadOnly={true}
            type="text"
            value={Customer.postcode}
            isValid={Register.postcode}
            required={true}
          />
        </div>
        <div className="d-flex flex-row">
          <PDTextArea
            required={true}
            className={styles["detailed-address"]}
            label={"Address"}
            isReadOnly={true}
            isValid={Register.detailedAddress}
            cols={88}
            value={Customer.detailedAddress}
          />
        </div>
      </div>
    </>
  );
};
export default CustomerAddressTab;
