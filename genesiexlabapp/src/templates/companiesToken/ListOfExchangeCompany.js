import React, {useState, useEffect, useContext} from "react";
import { Paper , Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Link} from "@mui/material";
import Web3 from 'web3';
import { MainContext } from "../../context/MainContext";
import CircularProgress from '@mui/material/CircularProgress';
import { AddANewCompany } from "./AddANewCompany";
import { TokenExchangeContractABI,  TokenExchangeContractAddress} from "../../blockchainJsonFile/blockchainAbiAddress";
import { TokenExchangeTypeA2Companies } from "./TokenExchangeTypeA2CompanyList";

const { ethereum } = window;

export const Companies = () => {
     const {account, isCompany, isCompanyTypeA2} = useContext(MainContext);

     return(
          <React.Fragment>
               <CompaniesIndex />
               <TokenExchangeTypeA2Companies />
               {!isCompany && !isCompanyTypeA2 ? <AddANewCompany /> : null}
          </React.Fragment>
     )
}

export const CompaniesIndex = () => {
     const {account} = useContext(MainContext);
     const [loading, setLoading] = useState(true);
     const [companyList, setCompanyList] = useState([]);
     const [addCompany, setAddCompnay] = useState(false);

     const web3 = new Web3(Web3.givenProvider);
     // console.log(web3)
     const TokenExchangeContract = new web3.eth.Contract(TokenExchangeContractABI, TokenExchangeContractAddress);
     // console.log(TokenExchangeContract)

     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted) {
                    const data = await TokenExchangeContract.methods.GetAllCompany().call({from: account});
                    setCompanyList(data);
                    setLoading(false);
               }
          }
          fetch_data();

          return function cleanup() { mounted = false}
     }, [])


     return(
          <div >
               <div style={{ paddingTop: "100px", paddingBottom: "1%"}}>

                    <Paper variant="outlined" sx={{ p: 3}}>
                         <Box>
                              <h2>Primary Token A1: Fixed Price Listed Company</h2>
                              <Divider />

                              <Box>
                                   { loading ? 
                                        <div >
                                             <Box sx={{ display: 'flex', pt: 2 }}>
                                                  <CircularProgress size={60} />
                                             </Box>
                                        </div>
                                   :
                                        <CompanyList companyList = {companyList} />
                                   }
                              </Box>
                         </Box>
                    </Paper>

               </div>
          </div>
     )
}



const CompanyList = (props) => {
     const companyList = props.companyList;
     // console.log(companyList)
     const {account, connectWallet} = useContext(MainContext);
     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeContract = new web3.eth.Contract(TokenExchangeContractABI, TokenExchangeContractAddress);
     

     const handleSubmit = async (companyAddress, companyId, numberOfTokenPurchased, companyName, companyCode, perTokenPrice, maximumAmountOfTokenOneCanBuy) => {
          console.log("clicked")
          if (!ethereum) return alert("Please install MetaMask");
          if(!account){ alert("Please Connect your Wallet .. ") 
          } else {
               
               if(numberOfTokenPurchased > parseInt(maximumAmountOfTokenOneCanBuy)){
                    alert(`Sorry!! You can buy less than ${maximumAmountOfTokenOneCanBuy}  number of Tokens`)
                    window.location.reload()
               } else {

                    const amount = parseInt(numberOfTokenPurchased) * parseInt(perTokenPrice)  
                    console.log(amount)
                    // const hexAmount = (amount * Math.pow(10, 18)).toString(16)
                    const hexAmount = (amount * Math.pow(10, 9)).toString(16)

                    await ethereum.request({
                         method: "eth_sendTransaction",
                         params: [{
                              from: account,
                              to: companyAddress,
                              gas: '0x5208',
                              value: hexAmount,
                         }],
                    })

                    TokenExchangeContract.methods.InvestorPurchasedTokens(account, companyAddress, companyId, numberOfTokenPurchased, companyName, companyCode).send({from: account})
                    .once('receipt', (receipt) => {
                         console.log(receipt)
                         window.location.reload();
                    })
               }
          }
     }

     return(
          <div>
               <TableContainer >
                    <Table  aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   <TableCell align="left">Tranding Code</TableCell>
                                   <TableCell align="left">Company Name</TableCell>
                                   <TableCell align="center">Company Address</TableCell>
                                   <TableCell align="right">Available Tokens</TableCell>
                                   <TableCell align="right">Per Token Price (GWEI)</TableCell>
                                   <TableCell align="right">Purchased Tokens</TableCell>
                              </TableRow>
                         </TableHead>

                         <TableBody>
                              {companyList.map((company) => company.tokens == 0 ? null : (
                                   <TableRow key={company.companyId}  >
                                        <TableCell align="left"><Link href={company.companyCode}>{company.companyCode}</Link></TableCell>
                                        <TableCell align="left">{company.name}</TableCell>
                                        <TableCell align="center">{company.companyAddress}</TableCell>
                                        <TableCell align="right">{company.tokens}</TableCell>
                                        <TableCell align="right">{company.perTokenPrice}</TableCell>

                                        <TableCell align="right">
                                             <Box component="form" 
                                                  onSubmit={(e) => {
                                                       e.preventDefault();
                                                       handleSubmit(company.companyAddress, company.companyId, e.target.numberOfTokenPurchased.value, company.name, company.companyCode, company.perTokenPrice, company.maximumAmountOfTokenOneCanBuy)
                                                  }}>
                                                  <TextField 
                                                       sx={{width: "50%"}} required name="numberOfTokenPurchased" type="number"  label="Tokens" variant="standard" />
                                                  <Button type="submit" 
                                                       variant="outlined" sx={{mt: 1, ml: 1}}>
                                                       Buy 
                                                  </Button>
                                             </Box>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>

                    </Table>
               </TableContainer>
          </div>
     )
}