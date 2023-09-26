import React, {useState, useEffect, useContext} from "react";
import { Paper, Box, Divider , Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Link} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Web3 from 'web3';
import { TokenExchangeContractABI,  TokenExchangeContractAddress, TokenExchangeTypeA2ContractAddress, TokenExchangeTypeA2ConractABI} from "../../blockchainJsonFile/blockchainAbiAddress";
import { MainContext } from "../../context/MainContext";
import { useNavigate} from 'react-router-dom';


export const Secondary_market_listed_company  = () => {
     const [loading, setLoading] = useState(true);
     const {account} = useContext(MainContext)
     const web3 = new Web3(Web3.givenProvider);
     const ContractFixedCompanies = new web3.eth.Contract(TokenExchangeContractABI, TokenExchangeContractAddress);
     const ContractBookCompanies = new web3.eth.Contract(TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress)
     const [tokenA1List, setTokenA1List] = useState();
     const [tokenA2List, setTokenA2List] = useState();


     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted) {
                    const tokenA1Company = await ContractFixedCompanies.methods.GetAllCompany().call({from: account});
                    setTokenA1List(tokenA1Company)
                    const tokenA2Company = await ContractBookCompanies.methods.getAllTokenA2ListedCompany().call({from: account})
                    setTokenA2List(tokenA2Company)
                    setLoading(false)
               }
          }
          fetch_data()

          return function cleanup() {mounted = false}
     }, [account])



     return(
          <div style={{ paddingTop: "100px"}}>
               <Paper variant="outlined" sx={{ p: 3}}>
                         <Box>
                              <h2>Secondary Token A Market Listed Company</h2>
                              <Divider />

                              <Box>
                                   { loading ? 
                                        <div >
                                             <Box sx={{ display: 'flex', pt: 2 }}>
                                                  <CircularProgress size={60} />
                                             </Box>
                                        </div>
                                   :
                                        <CompanyList tokenA1List = {tokenA1List} tokenA2List = {tokenA2List} />
                                   }
                              </Box>
                         </Box>
                    </Paper>
          </div>
     )
}


const CompanyList = (props) => {
     const tokenA1List = props.tokenA1List;
     const tokenA2List = props.tokenA2List;
     const navigate = useNavigate();


     return(
          <div>
               <TableContainer >
                    <Table  aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   <TableCell align="left">Tranding Code</TableCell>
                                   <TableCell align="left">Company Name</TableCell>
                                   <TableCell align="center">Company Address</TableCell>
                                   <TableCell align="right">Trade</TableCell>
                              </TableRow>
                         </TableHead>

                         <TableBody>
                              {tokenA1List.map((company) => company.tokens != 0 ? null :  (
                                   <TableRow key={company.companyId}>
                                        <TableCell align="left">{company.companyCode}</TableCell>
                                        <TableCell align="left">{company.name}</TableCell>
                                        <TableCell align="center">{company.companyAddress}</TableCell>
                                        <TableCell align="right">

                                             <Button variant="outlined" onClick={() => {
                                                  navigate(`/${company.companyCode}`, {
                                                       state: {companyAddress : `${company.companyAddress}`, companyId: `${company.companyId}`, companyName: `${company.name}`}
                                                  })
                                             }}>
                                                  Trade
                                             </Button>

                                        </TableCell>
                                   </TableRow>
                              ))}

                              {tokenA2List.map((company) => company.listedToken != 0 ? null : (
                                   <TableRow key={company.companyId}>
                                        <TableCell align="left">{company.companyCode}</TableCell>
                                        <TableCell align="left">{company.companyName}</TableCell>
                                        <TableCell align="center">{company.companyAddress}</TableCell>
                                        <TableCell align="right">

                                             <Button variant="outlined" onClick={() => {
                                                  navigate(`/${company.companyCode}`, {
                                                       state: {companyAddress : `${company.companyAddress}`, companyId: `${company.companyId}`, companyName: `${company.companyName}`}
                                                  })
                                             }}>
                                                  Trade
                                             </Button>

                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>

                    </Table>
               </TableContainer>
          </div>
     )
}

