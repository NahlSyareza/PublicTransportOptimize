import React, { useRef, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createCustomMarkerElement } from "./Utils";
import reactImg from "./assets/react.svg";
import Overtime from "./Overtime";
import axios from "axios";
import PointPicker from "./PointPicker";

export default function MapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 14;
  const API_KEY = "ufSae2pzQnoyaWrImsUL";
  const center = [106.87090565688231, -6.238906762201168];
  const [getRoutes, setRoutes] = useState(null);
  const [getSrc, setSrc] = useState([106.90631095000612, -6.257573878437469]);
  const [getDest, setDest] = useState([106.82353210759675, -6.361164675613395]);
  const both = [getSrc, getDest];
  const [getMode, setMode] = useState(false);
  const [getEnable, setEnable] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const stCollections = await axios.get(
          "http://localhost:5000/pto/global_routes",
          {
            params: {
              src: getSrc,
              dest: getDest,
            },
          }
        );
        setRoutes(stCollections.data.payload);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [getSrc, getDest]);

  useEffect(() => {
    if (!getRoutes) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: center,
      zoom: zoom,
    });

    map.current.on("load", () => {
      both.forEach((e) => {
        new maplibregl.Marker({
          color: "#FF0000",
        })
          .setLngLat(e)
          .addTo(map.current);
      });

      getRoutes.forEach((mark) => {
        new maplibregl.Marker({
          color: "#FF0000",
        })
          .setLngLat(mark.coords)
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(
              ReactDOMServer.renderToString(
                <Overtime name={mark.name} desc={mark.desc} />
              )
            )
          )
          .addTo(map.current);
      });

      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: getRoutes.map((st) => st.coords),
          },
        },
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0074D9",
          "line-width": 5,
        },
      });
    });

    map.current.on("click", (e) => {
      try {
        const { lng, lat } = e.lngLat;
        const vole = [lng, lat];
        console.log(`${lng}, ${lat}`);
        if (getEnable) {
          if (!getMode) {
            setSrc(vole);
          } else {
            setDest(vole);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [map, API_KEY, zoom, getRoutes, getMode, getEnable]);

  const a = () => {
    console.log("AAA");
  };

  return (
    <div className="relative w-screen h-screen">
      <PointPicker src={getSrc} dest={getDest} />
      <div className="flex w-full">
        <div
          className="font-montserrat bg-gray-600 text-white flex justify-center w-1/2"
          onClick={(e) => {
            console.log(getMode);
            setMode(!getMode);
          }}
        >
          <p>
            {getMode ? "Choose a destination point!" : "Choose a source point!"}
          </p>
        </div>
        <div
          className={
            getEnable
              ? "font-montserrat bg-green-800 text-white flex justify-center w-1/2"
              : "font-montserrat bg-red-800 text-white flex justify-center w-1/2"
          }
          onClick={(e) => {
            console.log(getEnable);
            setEnable(!getEnable);
          }}
        >
          <p>
            {getEnable ? "Point picker enabled!" : "Point picker disabled!"}
          </p>
        </div>
      </div>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
