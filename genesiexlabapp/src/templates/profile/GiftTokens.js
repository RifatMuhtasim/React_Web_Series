import React, {useContext} from "react";
import { MainContext } from "../../context/MainContext";
import { Box, TextField, Paper, Button} from '@mui/material';
import Web3 from 'web3';
import { TokenExchangeContractABI, TokenExchangeContractAddress } from "../../blockchainJsonFile/blockchainAbiAddress";



export const GiftTokens = () => {
     const { account} = useContext(MainContext)
     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeContract = new web3.eth.Contract(TokenExchangeContractABI, TokenExchangeContractAddress);


     const handleSubmit = async (e) => {
          e.preventDefault();
          if(account) {
               const data = new FormData(e.currentTarget);
               const investorAddress = data.get("investorAddress");
               const companyAddress = data.get("companyAddress");
               const numberOfTokens = data.get("numberOfTokensAsAGift");

               TokenExchangeContract.methods.ExchangeTokens(account, investorAddress, companyAddress, numberOfTokens).send({from: account})
               .once('receipt', (receipt) => {
                    console.log(receipt);
                    window.location.reload();
               })
          }
     }

     return(
          <Paper variant="outlined"  sx={{ p: 7, mt:9, mb: 10}}>
               <div>
                    <h3>Gift Tokens to Another Investor</h3>
               </div>
               <Box component="form" onSubmit = {handleSubmit} >
                    <TextField required
                         id="standard-required"
                         label="Investor Address"
                         name = "investorAddress"
                         variant="standard"
                         sx ={{ width: "50%", pr: "2%"}}
                    />
                    <TextField required
                         id="standard-required"
                         label="Company Address"
                         name = "companyAddress"
                         variant="standard"
                         sx ={{ width: "50%"}}
                    />
                    <div style={{ paddingTop: "20px"}}></div>
                    <TextField required
                         id="standard-required"
                         label="Number of Tokens"
                         name = "numberOfTokensAsAGift"
                         type = "number"
                         variant="standard"
                         sx ={{ width: "50%", pr: "2%"}}
                    />
                    <Button type="submit" variant="outlined" sx={{ mt: 1, width: "50%", borderColor: '#737373', color: '#404040'}}>Send Tokens</Button>
               </Box>
          </Paper>
     )
}