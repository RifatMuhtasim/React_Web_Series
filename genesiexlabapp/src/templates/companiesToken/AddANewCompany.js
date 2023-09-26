import * as React from 'react'; 
import  {useState, useEffect, useContext} from "react";
import {Paper, Box , TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from "@mui/material";
import Web3 from 'web3';
import { MainContext } from "../../context/MainContext";
import { TokenExchangeContractABI, TokenExchangeContractAddress, TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress  } from "../../blockchainJsonFile/blockchainAbiAddress";



export const AddANewCompany = () => {
     const [addCompany, setAddCompany] = useState(true)
     const {account, isCompany} = useContext(MainContext);
     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeContract = new web3.eth.Contract(TokenExchangeContractABI, TokenExchangeContractAddress);
     const TokenExchangeTypeA2Contract = new web3.eth.Contract(TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress);
     const [ipoPriceValue, setIpoPriceValue] = useState('BookBuildingPrice')

     const handleChange = (e) => {
          setIpoPriceValue(e.target.value);
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);

          const companyName = data.get("companyName");
          const tradingCode = data.get("companyCode");
          const numberOfTokensListed = data.get("numberOfTokensListed");
          const companySecretCode = data.get("secretCode");
          const perTokenPrice = data.get('perTokenPrice');
          const numberOfMaximumTokensOneCanPurchased = data.get('numberOfMaximumTokensOneCanPurchased')
          const floorPrice = data.get('floorPrice')
          const capPrice = data.get('capPrice')
          const companyCode = tradingCode.toUpperCase();

          if( companySecretCode != "umbrella") {
               alert("Secret Code is not matched !!")
               window.location.reload();

          } else {

               const secretKey  = 747
               if(account && addCompany ) {
                    if(ipoPriceValue === 'FixedPrice') {
                         TokenExchangeContract.methods.AddCompany( account, companyCode, companyName, numberOfTokensListed, secretKey, perTokenPrice, numberOfMaximumTokensOneCanPurchased).send({from: account})
                         .once('receipt', (receipt) => {
                              console.log(receipt);
                              setAddCompany(false);
                              window.location.reload();
                         })

                    } else {
                         TokenExchangeTypeA2Contract.methods.addTypeA2Company(account,  companyCode, companyName, numberOfTokensListed, numberOfMaximumTokensOneCanPurchased, floorPrice, capPrice, secretKey).send({from: account})
                         .once('receipt', (receipt) => {
                              console.log(receipt);
                              setAddCompany(false);
                              window.location.reload();
                         })
                         
                    }
               }
          }
     }

     return(
          <div style={{ marginTop: "0px"}}>
               <Paper variant="outlined"  sx={{ p: 7, mt:5, mb: 10}}>
               <div>
                    <h3>Add Token-A Company on Exchange Market</h3>
               </div>

               <div>
               <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">IPO Price System</FormLabel>
                    <RadioGroup
                         row
                         aria-labelledby="demo-controlled-radio-buttons-group"
                         name="controlled-radio-buttons-group"
                         value = {ipoPriceValue}
                         onChange={handleChange}
                         >
                         <FormControlLabel value="BookBuildingPrice" control={<Radio />} label="Book Building" />
                         <FormControlLabel value="FixedPrice" control={<Radio />} label="Fixed Price" />
                    </RadioGroup>
               </FormControl>
               </div>

               <Box component="form" onSubmit = {handleSubmit} >
                    <div style={{ paddingTop: "10px"}}></div>
                    <TextField required
                         id="standard-required"
                         label="Secret Code"
                         name = "secretCode"
                         type = "password"
                         variant="standard"
                         sx ={{ width: "50%", pr: "2%"}}
                    />
                    <TextField required
                         id="standard-required"
                         label="Trading Code"
                         name = "companyCode"
                         variant="standard"
                         sx ={{ width: "50%", textTransform: 'uppercase'}}
                    />
                    <div style={{ paddingTop: "20px"}}></div>
                    <TextField required
                         id="standard-required"
                         label="Company Name"
                         name = "companyName"
                         variant="standard"
                         sx ={{ width: "50%", pr: "2%"}}
                    />
                    <TextField required
                         id="standard-required"
                         label="Number of Tokens want to Listed"
                         name = "numberOfTokensListed"
                         type = "number"
                         variant="standard"
                         sx ={{ width: "50%"}}
                    />

                    <div style={{ paddingTop: "20px"}}></div>
                    {ipoPriceValue === 'FixedPrice' ? 
                         <React.Fragment >
                              <TextField required
                                   id="standard-required"
                                   label="Per Token Price - GWEI"
                                   name = "perTokenPrice"
                                   type = "number"
                                   variant="standard"
                                   sx ={{ width: "50%", pr: "2%"}}
                              />
                         </React.Fragment>
                         :
                         <React.Fragment>
                              <TextField required
                                   id="standard-required"
                                   label="Floor Price (Lower Price) - GWEI"
                                   name = "floorPrice"
                                   type = "number"
                                   variant="standard"
                                   sx ={{ width: "50%", pr: "2%"}}
                              />
                              <TextField required
                                   id="standard-required"
                                   label="Cap Price (Upper Price) - GWEI"
                                   name = "capPrice"
                                   type = "number"
                                   variant="standard"
                                   sx ={{ width: "50%"}}
                              />
                              <div style={{ paddingTop: "20px"}}></div>
                         </React.Fragment>
                    }

               
                    <TextField required
                         id="standard-required"
                         label="Number of Maximum Tokens one can purchased"
                         name = "numberOfMaximumTokensOneCanPurchased"
                         type = "number"
                         variant="standard"
                         sx ={{ width: "50%", pr: "2%"}}
                    />

                    <div>
                         <Button type="submit" variant="outlined" sx={{ mt: 4, width: "25%", borderColor: '#737373', color: '#404040'}}>Add Token-A Company</Button>
                    </div>
               </Box>
               </Paper>
          </div>
     )
}