import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MainProvider } from "./context/MainContext";
import { MainUrls } from "./mainUrls";
import { Layout } from './layout/base';



export const App = () => {

  return(
    <div>
      <Router>
        <MainProvider>

          <Layout>
            <MainUrls />
          </Layout>
          
        </MainProvider>
      </Router>
    </div>
  )
}