import React , { useContext} from "react";
import {Routes, Route , Navigate} from 'react-router-dom';
import { Home } from "./templates/Home";
import { About } from "./templates/About";
import { Profile } from "./templates/profile/ProfilePage";
import { MainContext } from "./context/MainContext";
import { Companies} from "./templates/companiesToken/ListOfExchangeCompany";
import { TypeA1orTypeA2 } from "./templates/companyDashboard/tokenTypeA1Dashboard";
import { CompanyExchangeToken } from "./templates/2ndMarket/companyExchange";


export const MainUrls = () => {
     const { account } = useContext(MainContext)
     const isAccount = sessionStorage.getItem("account") ? sessionStorage.getItem("account") : false;

     return(
          <div>
               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={ isAccount ? <Profile /> : <Navigate to="/" /> } />
                    <Route path="/companies" element={ isAccount ? <Companies /> : <Navigate to = "/" /> } />

                    <Route path="/company-dashboard" element={ isAccount ? <TypeA1orTypeA2 /> : <Navigate to="/" /> } />
                    <Route path="/:trading_code" element = {<CompanyExchangeToken />} />
               </Routes>
          </div>
     )
}