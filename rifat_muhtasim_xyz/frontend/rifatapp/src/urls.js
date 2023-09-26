import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./templates/home/home";
import { Print_login } from "./templates/print_login";


export const Urls = () => {

  return(
    <div>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/print-login" element={<Print_login />} />
        <Route path="/rifatmuhtasim/print-login" element={<Print_login />} />
        <Route path="/rifatmuhtasim/" element={<Home />}  />
        <Route path="*" element={<Home />}  />
      </Routes>
    </div>
  )
}