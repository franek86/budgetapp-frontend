import React from "react";
import { Outlet } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext.jsx";
import Header from "../Header/Header.jsx";
import Navbar from "../Navbar/NavBar.jsx";

const DashboardLayout = () => {
  const { toggleMenu } = useThemeContext();

  return (
    <div className={`grid ${toggleMenu === true ? "column-1" : "app_column"} column-gap`}>
      <Navbar />
      <main className='main'>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
