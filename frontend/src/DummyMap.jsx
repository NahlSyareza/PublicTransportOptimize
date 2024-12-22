import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

export default function DummyMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 14;
  const API_KEY = "ufSae2pzQnoyaWrImsUL";
  const center = [106.858652, -6.24249];

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: center,
      zoom: zoom,
    });

    map.current.on("click", (e) => {
      try {
        const { lng, lat } = e.lngLat;
        console.log(`${lng}, ${lat}`);
      } catch (error) {
        console.log(error);
      }
    });
  }, [map, API_KEY, zoom, center]);

  return (
    <div className="relative w-screen h-screen">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
