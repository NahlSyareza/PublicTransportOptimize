import { useState } from "react";
import Map from "./Map";
import Navbar from "./Navbar";
import Overtime from "./Overtime";
import DummyMap from "./DummyMap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/ovtime" element={<Overtime />} />
          <Route path="dummy_map" element={<DummyMap />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
