import React from "react";

export default function PointPicker({ src, dest }) {
  return (
    <>
      <div className="text-black font-montserrat">
        <div className="flex w-full">
          <div className="flex w-1/2 justify-center bg-green-300">
            <p>Source Point: {src}</p>
          </div>
          <div className="flex w-1/2 justify-center bg-red-300">
            <p>Destination Point: {dest}</p>
          </div>
        </div>
        {/* <div className="flex justify-center bg-red-300"></div> */}
      </div>
    </>
  );
}
