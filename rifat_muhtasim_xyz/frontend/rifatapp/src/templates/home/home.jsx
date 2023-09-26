import React from "react";
import { Banner } from "./banner";
import { About } from "./about";
import { Container } from "@mui/system";
import { Transactions_list } from "../../tansactions/transactions_list";
import { Payment } from "../../payment/payment";


export const Home = () => {

  return(
    <div >
      <Container maxWidth="lg">
        <Banner />
        <About />
        <Payment />
        <Transactions_list />
      </Container>
    </div>
  )
}