import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import PDInput from "../../PDInput/PDInput";

import { useUserStore } from "../../../stores/userStore";

import styles from "./CustomerAddress.module.css";
import { useEffect, useState } from "react";
const CustomerAddress = () => {
  const Customer = useUserStore((state) => state.Customer);
  const [position, setPosition] = useState([51.505, -0.09]);
  const setAddress = useUserStore((state) => state.setAddress);
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      console.log(data);
      const address = data.address;
      setAddress({
        country: address?.country || "",
        zipcode: address?.postcode || "",
        city: address?.city || address?.town || address?.village || "",
        street: address?.road || "",
        detailedAddress: address?.display_name,
      });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  };

  useEffect(() => {
    fetchAddress(position[0], position[1]);
  }, [position]);

  useEffect(() => {
    console.log(Customer);
  }, [Customer]);

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <div className="d-flex flex-row">
        <PDInput
          className={styles["input-field"]}
          label={"Country"}
          type="text"
          value={Customer.country}
        />
        <PDInput
          className={styles["input-field"]}
          label={"City"}
          type="text"
          value={Customer.city}
        />
        <PDInput
          className={styles["input-field"]}
          label={"ZIP Code"}
          type="text"
          value={Customer.zipcode}
        />
        <PDInput
          className={styles["input-field"]}
          label={"Address"}
          type="text"
          value={Customer.detailedAddress}
        />
      </div>
      <div>{Customer.detailedAddress}</div>
    </>
  );
};
export default CustomerAddress;
