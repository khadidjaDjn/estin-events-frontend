import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "../styles/AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
