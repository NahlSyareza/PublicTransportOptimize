import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import maplibregl from "maplibre-gl";
import PointPicker from "./PointPicker";

export default function DummyMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 14;
  const API_KEY = "ufSae2pzQnoyaWrImsUL";
  const center = [106.858652, -6.24249];
  const [getSrc, setSrc] = useState([106.90631095000612, -6.257573878437469]);
  const [getDest, setDest] = useState([106.82353210759675, -6.361164675613395]);
  const both = [getSrc, getDest];

  const [getMode, setMode] = useState(false);

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: center,
      zoom: zoom,
    });

    map.current.on("load", () => {
      // both.forEach((e) => {
      //   new maplibregl.Marker({
      //     color: "#FF0000",
      //   })
      //     .setLngLat(e)
      //     .addTo(map.current);
      // });
    });

    map.current.on("click", (e) => {
      try {
        const { lng, lat } = e.lngLat;
        const vole = [lng, lat];
        console.log(`${lng}, ${lat}`);
        // if (!getMode) {
        //   setSrc(vole);
        // } else {
        //   setDest(vole);
        // }
      } catch (error) {
        console.log(error);
      }
    });
  }, [
    map,
    API_KEY,
    zoom,
    center,
    // getDest, getMode, getSrc
  ]);

  return (
    <div className="relative w-screen h-screen">
      <PointPicker src={getSrc} dest={getDest} />
      <div
        className="font-montserrat bg-gray-600 text-white flex justify-center"
        onClick={(e) => {
          console.log(getMode);
          setMode(!getMode);
        }}
      >
        <p>
          {getMode ? "Choose a destination point!" : "Choose a source point!"}
        </p>
      </div>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
