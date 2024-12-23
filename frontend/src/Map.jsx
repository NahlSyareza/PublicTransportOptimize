import React, { useRef, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createCustomMarkerElement } from "./Utils";
import reactImg from "./assets/react.svg";
import Overtime from "./Overtime";
import axios from "axios";

export default function MapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 14;
  const API_KEY = "ufSae2pzQnoyaWrImsUL";
  const center = [106.858652, -6.24249];
  const [getRoutes, setRoutes] = useState(null);
  const src = [106.90631095000612, -6.257573878437469];
  const dest = [106.82353210759675, -6.361164675613395];

  useEffect(() => {
    const fetch = async () => {
      try {
        const stCollections = await axios.get(
          "http://localhost:5000/pto/global_routes",
          {
            params: {
              src: src,
              dest: dest,
            },
          }
        );
        setRoutes(stCollections.data.payload);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (!getRoutes) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: center,
      zoom: zoom,
    });

    map.current.on("load", () => {
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
        console.log(`${lng}, ${lat}`);
      } catch (error) {
        console.log(error);
      }
    });
  }, [map, API_KEY, zoom, getRoutes]);

  return (
    <div className="relative w-screen h-screen">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
