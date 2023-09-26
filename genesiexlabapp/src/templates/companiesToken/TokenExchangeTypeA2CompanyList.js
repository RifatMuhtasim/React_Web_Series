import React, {useState, useEffect, useContext} from "react";
import { Paper , Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Link} from "@mui/material";
import Web3 from 'web3';
import { MainContext } from "../../context/MainContext";
import CircularProgress from '@mui/material/CircularProgress';
import { TokenExchangeTypeA2ContractAddress, TokenExchangeTypeA2ConractABI} from "../../blockchainJsonFile/blockchainAbiAddress";


const { ethereum } = window;

export const TokenExchangeTypeA2Companies = () => {
     const {account} = useContext(MainContext);
     const [loading, setLoading] = useState(true);
     const [typeA2CompanyList, setTypeA2CompanyList] = useState([]);
     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeTypeA2Contract = new web3.eth.Contract(TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress)

     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted) {
                    const data = await TokenExchangeTypeA2Contract.methods.getAllTokenA2ListedCompany().call({from: account})
                    setTypeA2CompanyList(data)
                    setLoading(false)
               }
          }
          fetch_data()

          return function cleanup() {mounted = false}
     }, [])


     return(
          <div >
               <div style={{ paddingTop: "35px", paddingBottom: "5%"}}>

                    <Paper variant="outlined" sx={{ p: 3}}>
                         <Box>
                              <h2>Primary Token A2: Book Building Price Listed Company</h2>
                              <Divider />

                              <Box>
                                   { loading ? 
                                        <div >
                                             <Box sx={{ display: 'flex', pt: 2 }}>
                                                  <CircularProgress size={60} />
                                             </Box>
                                        </div>
                                   :
                                        <CompanyList companyList = {typeA2CompanyList} />
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
     // console.log(companyList);
     const {account, connectWallet} = useContext(MainContext);
     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeTypeA2Contract = new web3.eth.Contract(TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress);

     const currentTime = Date.now()

     const handleSubmit = async (companyId, companyCode, companyAddress, numberOfTokenWantToPurchased, bidPrice, maximumAmountOfTokenOneCanBuy) => {
          console.log("clicked")
          const amount = parseInt(numberOfTokenWantToPurchased) * parseInt(bidPrice)  ;
          const GenFee = (amount / 100) * Math.pow(10, 9);
          const totalAmount = (amount * Math.pow(10, 9)) +  GenFee ;
          

          TokenExchangeTypeA2Contract.methods.bidTokenOnA2Company(companyId, companyCode, companyAddress, account, numberOfTokenWantToPurchased, bidPrice , GenFee).send({
               from: account,
               value: totalAmount
          }).once('receipt', (receipt) => {
               console.log(receipt);
               window.location.reload();
          })

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
                              <TableCell align="right">Token Price Range (GWEI)</TableCell>
                              <TableCell align="right">Remaining time</TableCell>
                              <TableCell align="right" sx={{width: "45%"}} >Select tokens X Per token Price</TableCell>
                         </TableRow>
                    </TableHead>

                    <TableBody>
                         {companyList.map((company) => company.listedToken == 0 ? null : (
                              <TableRow key={company.companyId}  >
                                   <TableCell align="left">
                                        <Link href={company.companyCode}>{company.companyCode}</Link>
                                   </TableCell>
                                   <TableCell align="left">{company.companyName}</TableCell>
                                   <TableCell align="center">{company.companyAddress}</TableCell>
                                   <TableCell align="right">{company.listedToken}</TableCell>
                                   <TableCell align="right">{company.floorPrice} - {company.capPrice}</TableCell>
                                   <TableCell align="right">100hr</TableCell>

                                   <TableCell align="right" >
                                        <Box component="form"  sx={{ display: 'flex'}}
                                             onSubmit={(e) => {
                                                  e.preventDefault();
                                                  handleSubmit(company.companyId, company.companyCode, company.companyAddress, e.target.numberOfTokenWantToPurchased.value, e.target.bidPrice.value, company.maximumAmountOfTokenOneCanBuy)
                                             }}>
                              
                                             <TextField  type="number" InputProps={{ inputProps: { min:1, max: company.maximumAmountOfTokenOneCanBuy} }}
                                                  sx={{width: "100%"}}  required name="numberOfTokenWantToPurchased" label="Tokens" variant="standard" />
                                             <div style={{ marginTop: "10%", padding: "0px 4px"}}>X</div>
                                             <TextField  type="number" InputProps={{ inputProps: { min: company.floorPrice , max: company.capPrice , step: 1} }}
                                                  sx={{width: "100%"}}  required name="bidPrice" label="Price" variant="standard" />
                                             <Button type="submit" 
                                                  variant="outlined" sx={{mt: 1, ml: 1}}>
                                                  Bid
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