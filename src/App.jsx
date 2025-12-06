import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal"; // <-- IMPORT LOGIN MODAL
import ProtectedRoute from './components/ProtectedRoute';

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import AddReview from "./pages/AddReview";
// Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminEvents from "./admin/AdminEvents";
import AdminEventDetails from "./admin/AdminEventDetails";
import AddEventPage from './admin/AddEventPage';
import AdminDemandsPage from './admin/EventParticipationDemands';

import AdminEditEvent from "./admin/EditEvent";


function AppContent() {
  const location = useLocation();

  // State for login modal
  const [loginOpen, setLoginOpen] = React.useState(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  // Check if path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar openLogin={openLogin} />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/event/:id/register" element={<Register />} />
        <Route path="/add-review" element={<AddReview />} />

        {/* ADMIN ROUTES */}        
        <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/events/:id" element={<AdminEventDetails />} />
            <Route path="/admin/events/:id/particDemands" element={<AdminDemandsPage />} />
            <Route path="/admin/events/:id/edit" element={<AdminEditEvent />} />  
            <Route path="/admin/addEvent" element={<AddEventPage />} />
        </Route>
      </Routes>



      {/* Login Modal */}
      {loginOpen && <LoginModal close={closeLogin} />}

      {/* Show footer only in user pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
