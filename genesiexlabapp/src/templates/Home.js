import React from "react";
import { CompaniesIndex } from "./companiesToken/ListOfExchangeCompany";
import { TokenExchangeTypeA2Companies } from "./companiesToken/TokenExchangeTypeA2CompanyList";
import { Secondary_market_listed_company } from "./2ndMarket/secondary_market_listed_company";

export const Home = () => {
     return (
          <div style={{ minHeight: "70vh"}}>
               <center style={{ paddingTop: "120px", marginBottom: "-60px"}}>
                    <h2>GENESIEX LAB </h2>
               </center>
               <div style={{ paddingBottom : "100px"}}>
                    <Secondary_market_listed_company />
                    <CompaniesIndex />
                    <TokenExchangeTypeA2Companies />
               </div>
          </div>
     )
}