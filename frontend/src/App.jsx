import { useState } from "react";
import Map from "./Map";
import Navbar from "./Navbar";
import Overtime from "./Overtime";
import DummyMap from "./DummyMap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/map" element={<Map />} />
          {/* <Route path="/ovtime" element={<Overtime />} /> */}
          <Route path="dummy_map" element={<DummyMap />} />
          <Route path="*" element={<Navigate to="/map" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
