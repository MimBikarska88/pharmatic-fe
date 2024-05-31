import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { useMapEvents } from "react-leaflet";
import L from "leaflet";

import PDInput from "../../PDInput/PDInput";
import PDTextArea from "../../PDTextArea/PDTextArea";

import { useUserStore } from "../../../stores/userStore";
import { useEffect, useState, useRef } from "react";

import styles from "./CustomerAddressTab.module.css";
import marker from "../../../static/img/icons/marker.png";
import { checkAllSecondTabFields } from "../CustomerRegistrationUtils";
import { useValidationStore } from "../../../stores/validationStore";
import { useErrorStore } from "../../../stores/errorStore";

const CustomerAddressTab = () => {
  const Customer = useUserStore((state) => state.Customer);
  const Register = useValidationStore((state) => state.Register);
  const setAddress = useUserStore((state) => state.setAddress);
  const setAddressCorrectFormat =
    useValidationStore.getState().setAddressCorrectFormat;
  const setAddressIncorrectFormat =
    useValidationStore.getState().setAddressIncorrectFormat;

  const INITIAL_COORDINATES = [51.505, -0.09];
  const [position, setPosition] = useState(INITIAL_COORDINATES);

  const MarkerIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [35, 45],
  });

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      const address = data.address;
      const country = address?.country || "";
      const postcode = address?.postcode || "";
      const city = address?.city || address?.town || address?.village || "";
      const detailedAddress = data?.display_name || "";
      setAddress(country, city, postcode, detailedAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  useEffect(() => {
    fetchAddress(position[0], position[1]);
  }, [position]);

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
