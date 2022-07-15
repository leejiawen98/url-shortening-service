import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Redirect from "./pages/Redirect/Redirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/*" element={<Redirect/>}/>
      </Routes>
    </Router>
  );
}

export default App;
