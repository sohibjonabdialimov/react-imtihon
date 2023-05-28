import React from 'react'
import { Sidebar } from '../components/sidebar';
import { Outlet } from 'react-router-dom';
import "./style.scss";

const Layout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main_section" >
        <Outlet />
      </div>
    </div>
  )
}

export default Layout;