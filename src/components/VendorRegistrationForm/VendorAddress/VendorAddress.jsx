import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { useMapEvents } from "react-leaflet";
import L from "leaflet";

import PDInput from "../../PDInput/PDInput";

import styles from "./VendorAddress.module.css";
import marker from "../../../static/img/icons/marker.png";

import useGetMapLocationQuery from "../../../queries/GetMapLocationQuery/useGetMapLocationQuery";
import { useUserStore } from "../../../stores/userStore";
import { useEffect, useState } from "react";
import { useValidationStore } from "../../../stores/validationStore";
import { validateAddress } from "../VendorRegistrationUtil";
import { useErrorStore } from "../../../stores/errorStore";

const VendorAddress = () => {
  const INITIAL_COORDINATES = [51.505, -0.09];
  const [position, setPosition] = useState(null);
  const Vendor = useUserStore((state) => state.Vendor);
  const setVendorAddress = useUserStore.getState().setVendorAddress;
  const { detailedAddress } = useValidationStore(
    (state) => state.RegisterVendor
  );
  const {
    fullAddress = detailedAddress,
    country,
    postcode,
    city,
  } = useUserStore((state) => state.Vendor);
  const { addressErrorMessage = detailedAddress } = useErrorStore(
    (state) => state.VendorRegisterErrors
  );

  const MarkerIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [35, 45],
  });

  const { isError } = useGetMapLocationQuery(position, {
    onSuccess: (res) => {
      const address = res.data.address;
      const country = address?.country || "";
      const postcode = address?.postcode || "";
      const city = address?.city || address?.town || address?.village || "";
      const detailedAddress = res.data?.display_name || "";
      setVendorAddress(country, city, postcode, detailedAddress);
    },
  });

  useEffect(() => {
    if (!position) {
      return;
    }
    validateAddress();
  }, [fullAddress, country, postcode, city]);

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

    return (
      position !== null && (
        <Marker position={position} icon={MarkerIcon}></Marker>
      )
    );
  };

  return (
    <>
      <div className="text-center">
        <h3 className="m-3">Address</h3>
        <div>
          <MapContainer
            className={styles["map-container"]}
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
        </div>
        <PDInput
          type="text"
          isValid={detailedAddress}
          value={Vendor.detailedAddress}
          errorMessage={addressErrorMessage}
          disabled={true}
          className={styles["input-field"]}
        />
      </div>
    </>
  );
};
export default VendorAddress;
