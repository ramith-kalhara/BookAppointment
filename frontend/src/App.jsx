import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About_Page from "./pages/About_Page";
import Layout from "./component/Layout"; 
import Service_Page from "./pages/Service_Page";
import Feature_Page from "./pages/Feature_Page";
import Doctors_Page from "./pages/Doctors_Page";

const App = () => {
  return (
    <Router>
      <Layout> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About_Page />} />
          <Route path="/service" element={<Service_Page />} />
          <Route path="/feature" element={<Feature_Page />} />
          <Route path="/team" element={<Doctors_Page />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
