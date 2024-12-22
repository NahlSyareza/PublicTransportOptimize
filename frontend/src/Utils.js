export const createCustomMarkerElement = (iconUrl, width, height) => {
  const markerElement = document.createElement("div");
  markerElement.style.width = width; // Set the size of the marker
  markerElement.style.height = height;
  markerElement.style.backgroundImage = `url(${iconUrl})`; // Use the local SVG or image
  markerElement.style.backgroundSize = "cover";
  markerElement.style.cursor = "pointer";
  return markerElement;
};

export const bfsAlgorithm = (origin, destination) => {};
