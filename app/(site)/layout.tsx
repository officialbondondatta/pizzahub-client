import React from "react"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar></Navbar>
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}

export default HomeLayout
