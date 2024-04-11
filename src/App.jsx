import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardPages from "./pages/DashboardPages";
import AddWeightPages from "./pages/AddWeightPages";
import ControlPages from "./pages/ControlPages";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPages />} />
          <Route path="/add" element={<AddWeightPages />} />
          <Route path="/kontrol" element={<ControlPages />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
