import React, {useContext, useEffect, useState} from "react";
import {Box, Divider, Paper, Grid} from "@mui/material";
import { MainContext } from "../../context/MainContext";
import {shortenAddress} from '../../utility/useWindowResize';
import Web3 from "web3";
import CircularProgress from '@mui/material/CircularProgress';
import { TokenExchangeContractABI, TokenExchangeContractAddress } from "../../blockchainJsonFile/blockchainAbiAddress";
import { TokenTypeA2 } from "./tokenTypeA2Dashboard";


export const TypeA1orTypeA2 = () => {
     const [isTypeA1, setIsTypeA1] = useState(false);
     const {isCompany, account} = useContext(MainContext);

     return(
          <div>
               <h3 style={{paddingTop: "8%"}}>Company Dashboard {account}</h3>
               { isCompany == true? 
               <CompanyDashboardTypeA1/>
               : 
               <TokenTypeA2 />
               }
          </div>
     )
}


export const CompanyDashboardTypeA1 = () => {
     const {account} = useContext(MainContext);
     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeContract = new web3.eth.Contract(TokenExchangeContractABI,  TokenExchangeContractAddress);
     const [investorList, setInvestorList] = useState()
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted && account){
                    const dataLength = await TokenExchangeContract.methods.GetCompanyAllInvestorLength(account).call({from:account})

                    let values = []
                    for(let i = 0; i < dataLength; i++){
                         values[i] = await TokenExchangeContract.methods.GetCompanyAllInvestor(account, i).call({from:account})
                    }
                    setInvestorList(values)
                    setLoading(false)
               }
          }
          fetch_data()

          return function cleanup() {mounted = false}
     }, [account])

     return(
          <div>
               <Box sx={{ pb: 6}}>
                    {loading ? 
                         <div>
                              <Box  sx={{  pt: 5 }}>
                                   <CircularProgress size={60} />
                              </Box>
                         </div>
                    :
                         <div style={{ paddingTop: "3%", paddingBottom: "5%"}}>
                              <Paper variant="outlined">
                                   <CompanyInvestorList investorList = {investorList} />
                              </Paper>
                         </div>
                    }
               </Box>
          </div>
     )
}


const CompanyInvestorList = (props) => {
     const investorList = props.investorList;
     // console.log(investorList)
     const {account} = useContext(MainContext);

     return(
          <div>
               <h4 style={{padding: 18}}>Investor List (Investor Address = Tokens)</h4>
               <Divider />
               <Grid container spacing={2} sx={{p:2}}>
                    {investorList.map((investor) => investor.numberOfTokenPurchased == 0 ? null : (
                         <Grid item key={investor.investorAddress} sx={{ width : '50%'}}>
                              <Paper variant="outlined" sx={{ p:3}}>
                                   {investor.investorAddress} = {investor.numberOfTokenPurchased}
                              </Paper>
                         </Grid>
                    ))}
               </Grid>
          </div>
     )
}