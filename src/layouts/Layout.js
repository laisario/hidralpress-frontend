import React from 'react'
import { Outlet } from 'react-router-dom/dist'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Layout() {
  return (
    <div style={{height: "100vh"}}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout