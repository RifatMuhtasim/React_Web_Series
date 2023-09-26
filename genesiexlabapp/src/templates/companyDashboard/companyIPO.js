import React, {useEffect, useState, useContext} from 'react';
import {Box, Paper, Divider,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, ButtonGroup, Link} from '@mui/material';
import { TokenExchangeTypeA2ContractAddress, TokenExchangeTypeA2ConractABI} from "../../blockchainJsonFile/blockchainAbiAddress";
import CircularProgress from '@mui/material/CircularProgress';
import Web3 from 'web3';
import { MainContext } from '../../context/MainContext';


export const CompanyIPO = () => {
     const [loading, setLoading] = useState(true);
     const [capPrice, setCapPrice] = useState()
     const {account} = useContext(MainContext);
     const [bidTokenValue, setBidTokenValue] = useState()
     const [cutoffPrice, setCutoffPrice] = useState()
     const [extraToken, setExtraToken] = useState()
     const [a2CompanyInfo, setA2CompanyInfo] = useState()

     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeTypeA2Contract = new web3.eth.Contract(TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress)


     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted) {
                    const isCompanyCutOff = await TokenExchangeTypeA2Contract.methods.isCompanyCutOff(account).call();
                    console.log(isCompanyCutOff)
                    if(isCompanyCutOff == true) { window.location.replace("/")}

                    const typeA2CompanyInfo = await TokenExchangeTypeA2Contract.methods.typeA2Company(account).call();
                    const selectCutOffPrice = await TokenExchangeTypeA2Contract.methods.selectCutOffPrice(account).call();
                    setA2CompanyInfo(typeA2CompanyInfo)
                    setCutoffPrice(selectCutOffPrice[0])
                    setExtraToken(selectCutOffPrice[1])
                    

                    const priceDifference = typeA2CompanyInfo.capPrice - typeA2CompanyInfo.floorPrice;
                    let value = []
                    for(var i = 0; i <= priceDifference; i++) {
                         var currentPrice = typeA2CompanyInfo.capPrice - i ;
                         value[i] = await TokenExchangeTypeA2Contract.methods.numberOftokenOnBidPrice(account, currentPrice).call();
                    }
                    setBidTokenValue(value)
                    setCapPrice(typeA2CompanyInfo.capPrice)
                    setLoading(false)
               }
          }
          fetch_data();

          return function cleanup() {mounted = false}
     }, [])

     return(
          <div>
               <Box sx={{pt: "3%", pb: "8%"}}>
                    <Paper variant='outlined' sx={{p: '2%'}}>
                         <h3>Token Type A2 - Book Building Company</h3>
                         <Divider/>

                         { loading ?
                              <div>
                                   <Box sx={{ display: 'flex', pt: 2 }}>
                                        <CircularProgress size={60} />
                                   </Box>
                              </div>
                              :
                              <div>
                                   <TokenOnBidPriceTable 
                                        bidTokenValue= {bidTokenValue} 
                                        account={account} capPrice={capPrice} 
                                        a2CompanyInfo = {a2CompanyInfo}
                                        cutoffPrice={cutoffPrice} 
                                        extraToken = {extraToken}/>
                              </div>
                         }

                    </Paper>
               </Box>
          </div>
     )
}


const TokenOnBidPriceTable = (props) => {
     const bidTokenValue = props.bidTokenValue;
     const account = props.account;
     const A2CompanyInfo = props.a2CompanyInfo;
     const capPrice = props.capPrice;
     const cutoffPrice = props.cutoffPrice;
     const extraToken = props.extraToken;

     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeTypeA2Contract = new web3.eth.Contract(TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress)

     const handleClick = async () => {
          console.log("Extra Token", extraToken)
          const priceDifference = A2CompanyInfo.capPrice - A2CompanyInfo.floorPrice;
          console.log(priceDifference)

          await TokenExchangeTypeA2Contract.methods.IPOTokenExchange(account, cutoffPrice).send({from:account})
          .once('receipt', (receipt) => {
               console.log( receipt)
          })    

          // for (var i =0; i <= priceDifference; i ++) {
          //      var currentPrice = A2CompanyInfo.capPrice - i
          //      await TokenExchangeTypeA2Contract.methods.IPOTokenExchange(account, cutoffPrice, currentPrice, extraToken).send({from:account})
          //      .once('receipt', (receipt) => {
          //           console.log(currentPrice, receipt)
          //      })               

               // const receipt = await TokenExchangeTypeA2Contract.methods.IPOTokenExchange(account, cutoffPrice, currentPrice, extraToken).call({from:account})
               // console.log(currentPrice, receipt)
          // }
          console.log('successful')

     }


     return(
          <div>
               <TableContainer >
                    <Table  aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   <TableCell align="left">Company Address</TableCell>
                                   <TableCell align="center">Bid Price</TableCell>
                                   <TableCell align="right">Bid Token</TableCell>
                              </TableRow>
                         </TableHead>

                         <TableBody>
                              {bidTokenValue.map((value, index) => (
                                   <TableRow key={index}  >
                                   <TableCell align="left">{account}</TableCell>
                                        <TableCell align="center">{capPrice - index}</TableCell>
                                        <TableCell align="right">{value}</TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>

                    </Table>
               </TableContainer>

               <Box sx={{ pt: '2%', display: 'flex', justifyContent: 'right'}}>
                    { cutoffPrice == 0 ? null :
                         <Button onClick={handleClick} variant='contained' sx={{ minWidth: "27%"}}>Cutoff at Price {cutoffPrice} </Button>
                    }
               </Box>
          </div>
     )
}