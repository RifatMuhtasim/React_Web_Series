import React, { useState, useContext} from "react";
import { Container, Box, Paper , Grid, Typography} from '@mui/material';
import { Use_window_resize} from '../../utility/use_window_resize';
import './tooplate-style.css';
import { Transactions_card } from "../../tansactions/transactions_card";
import { TransactionsContext } from "../../contract/TransactionsContext";


export const Banner = () => {
  const [height, width] = Use_window_resize()

  return(
    <div>
        <Box sx={{ paddingTop: width < 600 ? "6%" : "0%"}}>
          <Grid container >
            <Grid item xs={12} sm={12} md={7} sx={{ py: "15%"}}>
              <Banner_text />
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Transactions_card />
            </Grid>
          </Grid>
        </Box>

    </div>
  )
}


const Banner_text = () => {
  const [height, width] = Use_window_resize()
  const { connectWallet, currentAccount} = useContext(TransactionsContext)

  return(
    <div>
      <div>
      <section className="about full-screen " id="about">
        <div >
            <div >
                
                <div className="">
                    <div className="about-text">
                      <Typography variant="h6">Who the hell are you?</Typography>
                        <h1 className="animated animated-text">
                            <span >Hey Useless, I'm</span>
                                <div className="animated-info" style={{ marginLeft: width > 600 ? "1.5%": "0%", marginTop: "0.5%"}}>
                                    <span className="animated-item">Shameless</span>
                                    <span className="animated-item">Witless</span>
                                    <span className="animated-item">Graceless</span>
                                </div>
                        </h1>

                        <p style={{ paddingLeft: "0.2%", paddingTop : width < 600 ? "2%": "0%", paddingRight: "10%"}}>
                          I am so clever that sometimes I don't understand a single word of what I am saying. Such as this Fucking website.
                        </p>
                        
                        
                        <div className="custom-btn-group mt-4" style={{ display: "flex"}}>
                          { !currentAccount ? 
                          <div
                            className="btn custom-btn custom-btn-bg custom-btn-link" 
                            onClick={connectWallet}>
                              Connect Wallet with MetaMask
                          </div>
                          : 
                          <div className="btn custom-btn custom-btn-bg custom-btn-link" >
                            {currentAccount}
                          </div>
                          }
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>
      </div>

   </div>
  )
}


export const Custom_btn = () => {

  return(
    <div>
      <div className="custom-btn-group mt-4" style={{ display: "flex"}}>
        <a href="https://indianmemetemplates.com/wp-content/uploads/sad-disappointed-pakistani-fan.jpg" className="btn custom-btn"><i className='uil uil-file-alt'></i> Download Resume</a>
        <a href="https://i.pinimg.com/originals/ea/07/0a/ea070acfeb2644c90add25393d92dcfb.gif" className="btn custom-btn custom-btn-bg custom-btn-link mx-3">Get a free quote</a>
      </div>
    </div>
  )
}