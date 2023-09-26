import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";


export const Main_urls = () => {

  return(
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/pray4refugees" element={<Home/>} />
        <Route path="*" element={<Home/>} />
      </Routes>

    </div>
  )
}