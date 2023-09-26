import React, {useState, useEffect, useContext} from "react";
import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Web3 from 'web3';
import { MainContext } from "../../context/MainContext";
import CircularProgress from '@mui/material/CircularProgress';
import { shortenAddress } from "../../utility/useWindowResize";
import { TokenExchangeContractABI, TokenExchangeContractAddress, TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress  } from "../../blockchainJsonFile/blockchainAbiAddress";



export const InvestorCompanies = () => {
     const {account} = useContext(MainContext);
     const [loading, setLoading] = useState(true);
     const [companies, setCompanies] = useState([])
     const [fixedCompanies, setFixedCompanies] = useState([])

     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeContract = new web3.eth.Contract(TokenExchangeContractABI, TokenExchangeContractAddress)
     const TokenExchangeTypeA2Contract = new web3.eth.Contract(TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress );

     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted && account) {
                    const dataLength = await TokenExchangeContract.methods.GetInvestorCompaniesLength(account).call({from: account});
                    let data = [];
                    for(var id = 0; id < dataLength; id++){
                         data[id] = await TokenExchangeContract.methods.GetInvestorCompany(account, id).call({from: account})
                    }

                    const fixedTokenCompanyLength = await TokenExchangeTypeA2Contract.methods.getAllInvestorCompanyLength(account).call();
                    var fixedCompanyData = [];
                    for(var i =0; i < fixedTokenCompanyLength; i++) {
                         fixedCompanyData[i] = await TokenExchangeTypeA2Contract.methods.getAllInvestorToken(account, i).call();
                    }

                    setFixedCompanies(fixedCompanyData )
                    setCompanies(data)
                    setLoading(false)
               }
          }
          fetch_data();

          return function cleanup() { mounted = false }
     }, [account])
     
     
     return(
          <div>
               <Box>
                    { loading ? 
                         <div >
                              <Box component="center" sx={{  pt: 5 }}>
                                   <CircularProgress size={60} />
                              </Box>
                         </div>
                    :
                         <center style={{paddingTop: "5rem", paddingBottom: "5rem"}}>
                              <h3> {shortenAddress(account)} Investment Companies </h3>
                              <Divider />
                              <CompanyList companyList = {companies} a2CompanyList={fixedCompanies}/>
                         </center>
                    }
               </Box>
          </div>
     )
}


const CompanyList = (props) => {
     const companyList = props.companyList;
     const a2CompanyList = props.a2CompanyList;
     const {account} = useContext(MainContext);
     const web3 = new Web3(Web3.givenProvider);
     const TokenExchangeContract = new web3.eth.Contract(TokenExchangeContractABI, TokenExchangeContractAddress);
     
     
     return(
          <div >
               <TableContainer >
                    <Table  aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   <TableCell align="left">Company Code</TableCell>
                                   <TableCell align="left">Company Name</TableCell>
                                   <TableCell align="center">Company Address</TableCell>
                                   <TableCell align="right">Purchased Tokens</TableCell>
                              </TableRow>
                         </TableHead>

                         <TableBody>
                              {companyList.map((company) => 
                              // company.numberOfTokenPurchased == 0 ? null : 
                              (
                                   <TableRow key={company.companyId}  >
                                        <TableCell align="left">{company.companyCode}</TableCell>
                                        <TableCell align="left">{company.companyName}</TableCell>
                                        <TableCell align="center">{company.companyAddress}</TableCell>
                                        <TableCell align="right">{company.numberOfTokenPurchased}</TableCell>
                                   </TableRow>
                              ))}

                              {a2CompanyList.map((company) => company.numberOfTokenPurchased == 0 ? null : (
                                   <TableRow key={company.companyId}  >
                                        <TableCell align="left">{company.companyCode}</TableCell>
                                        <TableCell align="left">{company.companyName}</TableCell>
                                        <TableCell align="center">{company.companyAddress}</TableCell>
                                        <TableCell align="right">{company.amountOfTokens}</TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>

                    </Table>
               </TableContainer>
          </div>
     )
}


