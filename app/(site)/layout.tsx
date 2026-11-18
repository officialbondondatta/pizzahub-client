import React from "react"
import Navbar from "../components/shared/Navbar"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  )
}

export default HomeLayout
