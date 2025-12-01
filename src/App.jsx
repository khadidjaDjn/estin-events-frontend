import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile"; 
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import AddReview from "./pages/AddReview";
import Footer from "./components/Footer"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-review" element={<AddReview />} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
