import React, {useContext, useState, useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { MainContext } from "../../context/MainContext";
import {Button, ButtonGroup, Divider, Box, TextField} from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import { TokenExchangeContractABI, TokenExchangeContractAddress, Exchange_token_address, Exchange_2nd_market_token_file } from "../../blockchainJsonFile/blockchainAbiAddress";
import Web3 from "web3";



export const CompanyExchangeToken = () => {
     const {trading_code} = useParams();
     const location = useLocation();
     var companyAddress
     var companyId
     var companyName
     if(location.state) {
          companyAddress = location.state.companyAddress
          companyId = location.state.companyId
          companyName = location.state.companyName
     } else {
          window.location.replace("/")
     }

     const {account } = useContext(MainContext)
     const web3 = new Web3(Web3.givenProvider);
     const TokenAContract = new  web3.eth.Contract(TokenExchangeContractABI, TokenExchangeContractAddress);
     const TokenExContract = new  web3.eth.Contract(Exchange_2nd_market_token_file, Exchange_token_address); 
     const [user_info, setUser_info] = useState()
     const [last_ex_price, setLast_ex_price] = useState(null)


     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted) {
                    const last_ex_price_data = await TokenExContract.methods.last_ex_price(companyAddress).call();
                    setLast_ex_price(last_ex_price_data);
                    console.log(last_ex_price_data)
                    const user_info_data = await TokenAContract.methods.investorTokenInfo(account, companyAddress).call({from:account})
                    setUser_info(user_info_data)
                    
               }
          }
          fetch_data()

          return function cleanup() {mounted = false}
     }, [])


     return(
          <div style={{ padding: "100px 0px"}}>
               <p style={{ fontSize: "65px"}}>{last_ex_price} GWEI </p>
               <h2 >Trading Code: {trading_code}</h2>
               <h5 >Company Name: {companyName}</h5>
               <h5 style={{ paddingBottom: "50px"}}>Company Address: {companyAddress}</h5>

               {!account || !user_info  ? null :
                    <React.Fragment>
                         <Purchased_Tokens companyAddress = {companyAddress} companyName= {companyName} companyId={companyId} trading_code = {trading_code}/>
                         <Sell_tokens  companyAddress = {companyAddress}  user_info={user_info} companyName= {companyName} companyId={companyId} trading_code = {trading_code}/>
                    </React.Fragment>
               }
               
          </div>
     )
}





const Purchased_Tokens = (props) => {
     const [loading, setLoading] = useState(false)
     const [loading2, setLoading2] = useState(false)
     const [instantlyPrice, setIstantlyPrice] = useState(false)
     const {account } = useContext(MainContext)
     const companyAddress = props.companyAddress
     const company_name = props.companyName;
     const company_id = props.companyId;
     const trading_code = props.trading_code;

     const web3 = new Web3(Web3.givenProvider); 
     const TokenExContract = new  web3.eth.Contract(Exchange_2nd_market_token_file, Exchange_token_address); 
     const [remaining_buying_token, setRemaining_buying_token] = useState(0)
     const [buy_instantly_token, setBuy_instantly_token] = useState(0);
     const [buy_instantly_price, setBuy_instantly_price] = useState(0);
     const [buy_instantly_total, setBuy_instantly_total] = useState(0);
     
     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted) {
                    const data =  await TokenExContract.methods.remaining_token_for_buy(companyAddress, account).call({from: account});
                    console.log(data)
                    setRemaining_buying_token(data)
               }
          }
          fetch_data();

          return function cleanup() { mounted = false }
     } , [])


     const bid_token = (e) => {
          e.preventDefault();
          setLoading(true);
          const data = new FormData(e.currentTarget);
          const bid_token = data.get("bid_token");
          const bid_price = data.get("bid_price")
          console.log(companyAddress, account,  bid_price, bid_token, company_name, company_id, trading_code, TokenExchangeContractAddress)

          const total_price = bid_token * bid_price;
          const value = (total_price * Math.pow(10, 9))

          TokenExContract.methods.Bid_token(companyAddress, account,  bid_token, bid_price,  company_name, company_id, trading_code, TokenExchangeContractAddress).send({from:account, value: value})
          .once('receipt', (receipt) => {
               console.log(receipt);
               console.log("Successfully run this method")
               setLoading(false);
               window.location.reload();
          })
     }


     const buy_instantly = async (event) => {
          event.preventDefault();
          setLoading2(true)

          const data = new FormData(event.currentTarget);
          const number_of_token_want_to_purchased = data.get("number_of_token_want_to_purchased");
          console.log(number_of_token_want_to_purchased)

          const blockchain_data = await TokenExContract.methods.View_instantly_buying_price(companyAddress, number_of_token_want_to_purchased).call()
          console.log('return value', blockchain_data);
          setBuy_instantly_token(number_of_token_want_to_purchased)
          setBuy_instantly_price(blockchain_data[0])
          setBuy_instantly_total(blockchain_data[1])


          setLoading2(false)
          setIstantlyPrice(true)
     }


     const confirm_instantly_buy = () => {
          setLoading2(true)
          const amount = buy_instantly_token * buy_instantly_price;
          const value = (amount * Math.pow(10, 9))

          TokenExContract.methods.Bid_token(companyAddress, account,   buy_instantly_token, buy_instantly_price, company_name, company_id, trading_code, TokenExchangeContractAddress).send({from:account, value: value})
          .once('receipt', (receipt) => {
               console.log(receipt);
               console.log("Successfully run this method")
               setLoading2(false);
               window.location.reload();
          })
     }


     return(
          <div>
               <Paper variant="outlined" sx={{p:3}}>
                         <center style={{paddingBottom: "10px"}}>
                              <h3>Purchase a token</h3>
                              <p>Remaining token for buy: {remaining_buying_token}</p>
                         </center>
                         <Divider />

                         <Box sx={{p:3}} >
                              <Grid2 container spacing={2}>
                                   <Grid2 item xs={6}>
                                        { loading ? <Loading_bar /> : 
                                        <Box component="form" onSubmit={bid_token}>

                                             <h5>Purchase a token with Bidding</h5>
                                             <div>
                                                  <TextField name= "bid_token" required type="number" InputProps={{inputProps: {step: 1}}}  sx={{pr: 2,  width: 143}} variant="standard" label="Bid Token" />
                                                  <TextField name="bid_price" required step="1" type="number" sx={{width: 143}} variant="standard" label="Bid Price" />
                                             </div>
                                             <Button type="submit" sx={{ mt: 3, width: "120px"}} variant="outlined" >Bid</Button>

                                        </Box>
                                        }
                                   </Grid2>


                                   <div style={{ height: "150px", marginTop: "20px", borderLeft: "1px solid "}}></div>
                                   <Grid2 item xs={5.90} >
                                        { instantlyPrice || loading2 ? null : 

                                             <Box component="form" onSubmit={buy_instantly}>
                                                  <h5 style={{ display: "flex", justifyContent: "right"}}>Instantly Purchase a token </h5>
                                                  <div style={{ display: "flex", justifyContent: "right"}}>
                                                       <TextField type="number" name= "number_of_token_want_to_purchased" required InputProps={{inputProps: {step: 1}}}  sx={{width: 250}}  variant="standard" label="How Much token you want?" />
                                                  </div>
                                                  <div style={{ display: "flex", justifyContent: "right"}}>
                                                       <Button type="submit"  sx={{ mt: 3, width: "120px"}} variant="outlined" >Submit</Button>
                                                  </div>
                                             </Box>

                                        }
                                        { !instantlyPrice || loading2 ? null :
                                             <Box>
                                                  <h5 style={{ display: "flex", justifyContent: "right"}}>Instantly Purchase a token </h5>
                                                  <div style={{ display: "flex", justifyContent: "right" , paddingTop: "35px"}}>
                                                       <h4>{buy_instantly_token} Token is now {buy_instantly_total} GWEI</h4>
                                                  </div>
                                                  <div style={{ display: "flex", justifyContent: "right"}}>
                                                       <Button 
                                                            onClick={() => {confirm_instantly_buy()}} 
                                                            sx={{ mt: 0, width: "120px", display: buy_instantly_total == 0 ? 'none': ""}} variant="outlined" >Confirm</Button>
                                                  </div>
                                             </Box>
                                        }

                                        { !loading2 ? null : <div style={{ display: "flex", justifyContent: "right"}}><Loading_bar /></div> }
                                        
                                   </Grid2>
                              </Grid2>
                         </Box>

               </Paper>
          </div>
     )
}





const Sell_tokens= (props) => {
     const [loading, setLoading] = useState(false)
     const [loading2, setLoading2] = useState(false)
     const [instantlyPrice, setIstantlyPrice] = useState(false)
     const {account } = useContext(MainContext)
     const companyAddress = props.companyAddress
     const user_info = props.user_info
     const company_name = props.companyName;
     const company_id = props.companyId;
     const trading_code = props.trading_code;
     const [remaining_selling_token, setRemaining_selling_token] = useState(0)
     const [sell_instantly_token, setSell_instantly_token] = useState(0);
     const [sell_instantly_price, setSell_instantly_price] = useState(0);
     const [sell_instantly_total, setSell_instantly_total] = useState(0);

     const web3 = new Web3(Web3.givenProvider); 
     const TokenExContract = new  web3.eth.Contract(Exchange_2nd_market_token_file, Exchange_token_address); 


     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted) {
                    const data = await TokenExContract.methods.remaining_token_for_sell(companyAddress, account).call({from:account})
                    console.log(data)
                    setRemaining_selling_token(data)
               }
          }
          fetch_data();

          return function cleanup() {mounted = false};
     }, [])


     const ask_token = (e) => {
          e.preventDefault();
          setLoading(true)
          const data = new FormData(e.currentTarget);
          const ask_token = data.get("ask_token");
          const ask_price = data.get("ask_price")
          console.log(companyAddress, account,  ask_price, ask_token)

          TokenExContract.methods.Ask_token(companyAddress, account, ask_token, ask_price, company_name, company_id, trading_code, TokenExchangeContractAddress ).send({from:account})
          .once('receipt', (receipt) => {
               console.log(receipt);
               setLoading(false);
               window.location.reload();
          })

     }


     const sell_instantly = async (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const number_of_token_want_to_sell = data.get("number_of_token_want_to_sell");
          console.log(number_of_token_want_to_sell)

          setLoading2(true)
          const blockchain_data = await TokenExContract.methods.View_instantly_selling_price(companyAddress, number_of_token_want_to_sell).call({from:account});
          console.log('return_value', blockchain_data)
          setSell_instantly_token(number_of_token_want_to_sell )
          setSell_instantly_price(blockchain_data[0])
          setSell_instantly_total(blockchain_data[1])

          setLoading2(false)
          setIstantlyPrice(true)
     }


     const confirm_instantly_sell = () => {
          console.log(companyAddress, account)
          setLoading2(true)

          TokenExContract.methods.Ask_token(companyAddress, account, sell_instantly_token, sell_instantly_price, company_name, company_id, trading_code, TokenExchangeContractAddress ).send({from:account})
          .once('receipt', (receipt) => {
               console.log(receipt);
               setLoading2(false)
               window.location.reload();
          })
     }


     return(
          <div style={{marginTop: "90px", display: user_info['companyName'] == "" ? 'none' : ''}}>
               <Paper variant="outlined" sx={{p:3}}>
                         <center style={{paddingBottom: "10px"}}>
                              <h3>Sell a Token </h3>
                              <p>Current Available token: {user_info['numberOfTokenPurchased']} | Remaining token for sell: {remaining_selling_token}</p>
                         </center>
                         <Divider />

                         <Box sx={{p:3}} >
                              <Grid2 container spacing={2}>
                                   <Grid2 item xs={6}>
                                        { loading ? <Loading_bar /> : 
                                        <Box component="form" onSubmit={ask_token}>

                                             <h5>Sell a token with Asking</h5>
                                             <div>
                                                  <TextField name= "ask_token" required type="number" InputProps={{inputProps: {step: 1}}}  sx={{ pr: 2, width: 143}} variant="standard" label="Ask Token" />
                                                  <TextField name="ask_price" required step="1" type="number" sx={{width: 143}} variant="standard" label="Ask Price" />
                                             </div>
                                             <Button type="submit" sx={{ mt: 3, width: "120px"}} variant="outlined" >Ask</Button>

                                        </Box>
                                        }
                                   </Grid2>


                                   <div style={{ height: "150px", marginTop: "20px", borderLeft: "1px solid "}}></div>
                                   <Grid2 item xs={5.90} >
                                        { instantlyPrice || loading2 ? null : 

                                             <Box component="form" onSubmit={sell_instantly}>
                                                  <h5 style={{ display: "flex", justifyContent: "right"}}>Instantly sell a token </h5>
                                                  <div style={{ display: "flex", justifyContent: "right"}}>
                                                       <TextField type="number" name= "number_of_token_want_to_sell" required InputProps={{inputProps: {step: 1}}}  sx={{width: 250}}  variant="standard" label="Number of want to sell" />
                                                  </div>
                                                  <div style={{ display: "flex", justifyContent: "right"}}>
                                                       <Button type="submit"  sx={{ mt: 3, width: "120px"}} variant="outlined" >Submit</Button>
                                                  </div>
                                             </Box>

                                        }
                                        { !instantlyPrice || loading2 ? null :
                                             <Box>
                                                  <h5 style={{ display: "flex", justifyContent: "right"}}>Instantly sell a token </h5>
                                                  <div style={{ display: "flex", justifyContent: "right" , paddingTop: "35px"}}>
                                                       <h4>{sell_instantly_token} Token is now {sell_instantly_total} GWEI</h4>
                                                  </div>
                                                  <div style={{ display: "flex", justifyContent: "right"}}>
                                                       <Button 
                                                            onClick={() => {confirm_instantly_sell()}} 
                                                            sx={{ mt: 0, width: "120px", display: sell_instantly_total == 0 ? 'none' : ""}} variant="outlined" >Confirm</Button>
                                                  </div>
                                             </Box>
                                        }

                                        { !loading2 ? null : <div style={{ display: "flex", justifyContent: "right"}}><Loading_bar /></div> }
                                        
                                   </Grid2>
                              </Grid2>
                         </Box>

               </Paper>
          </div>
     )
}





const Loading_bar = () => {
     return(
          <div >
               <Box sx={{ display: 'flex', pt: 2 }}>
                    <CircularProgress size={60} />
               </Box>
          </div>
     )
}