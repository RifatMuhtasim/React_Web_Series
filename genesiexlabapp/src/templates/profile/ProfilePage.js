import React , { useContext, useEffect, useState} from "react";
import { MainContext } from "../../context/MainContext";
import { Paper, Box, TextField , Button, List, ListItem, ListItemButton, ListItemText, ListItemIcon} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Web3 from 'web3';
import { InvestorCompanies } from "./InvestorCompanies";
import { GiftTokens } from "./GiftTokens";
import {InvestorInformationContractAddress, InvestorInformationContractABI} from '../../blockchainJsonFile/blockchainAbiAddress';


export const Profile = () => {
     const [loading, setLoading] = useState(false)
     const {account} = useContext(MainContext)
     const [getInvestorData, setGetInvestorData] = useState()


     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if(mounted && account){
                    const web3 = new Web3(Web3.givenProvider);
                    const InvestorInformationContract = new web3.eth.Contract(InvestorInformationContractABI, InvestorInformationContractAddress)
                    const data = await InvestorInformationContract.methods.GetInvestorInformation(account).call({ from: account })
                    setGetInvestorData(data)
               }
          }
          fetch_data();

          return function cleanup() {mounted =false}
     }, [account])


     return(
          <div style={{ paddingTop: "40px"}}>
               <div style={{ paddingBottom: "30px"}}>
                    <div>
                         <InvestorCompanies />
                         <GiftTokens />
                    </div>

                    <Paper variant="outlined" sx={{ p: 6, mt: "-20px", mb: "7%", mx:15, marginLeft: "auto", marginRight: "auto"}}>
                         { loading ? 
                              <div>
                                   <Box sx={{ display: 'flex' }}>
                                        <CircularProgress size={60} />
                                   </Box>
                              </div>  :
                              <div>
                                   <div style={{ paddingLeft: "0px"}}>
                                        <h2>Investor Information</h2>
                                        <h5>Address : {account}</h5>
                                   </div>
                                   <InvestorInformation getInvestorData ={getInvestorData} />
                              </div>
                         }
                    </Paper>

               </div>
          </div>
     )
}


const InvestorInformation = (props) => {
     const InvestorData = props.getInvestorData
     // console.log(InvestorData)

     return(
          <div>
               { !InvestorData || InvestorData.InvestorId == 0 ?
                    <InvestorSubmitInformation/> 
                    :
                    <Box>
                         <List>
                              <ListItem disablePadding>
                                   <ListItemButton>
                                        <ListItemIcon>
                                             <CheckCircleOutlineRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Username: ${InvestorData.username}`} />
                                   </ListItemButton>

                              </ListItem>
                              <ListItem disablePadding>
                                   <ListItemButton>
                                        <ListItemIcon>
                                             <CheckCircleOutlineRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Email: ${InvestorData.email}`} />
                                   </ListItemButton>
                              </ListItem>

                              <ListItem disablePadding>
                                   <ListItemButton>
                                        <ListItemIcon>
                                             <CheckCircleOutlineRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Phone Number: ${InvestorData.phoneNumber}`} />
                                   </ListItemButton>
                              </ListItem>

                              <ListItem disablePadding>
                                   <ListItemButton>
                                        <ListItemIcon>
                                             <CheckCircleOutlineRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Secret Key: ${InvestorData.secretKey}`} />
                                   </ListItemButton>
                              </ListItem>
                         </List>
                    </Box>
               }
          </div>
     )
}


const InvestorSubmitInformation =() => {
     const [loading2, setLoading2] = useState(false)
     const {account} = useContext(MainContext)


     const handleSubmit = async (event) => {
          event.preventDefault();
          setLoading2(true)
          const data = new FormData(event.currentTarget)
          const username = data.get("username")
          const email = data.get("email")
          const phoneNumber = data.get("phoneNumber")
          const secretKey = data.get("secretKey")

          const web3 = new Web3(Web3.givenProvider);
          const InvestorInformationContract = new web3.eth.Contract(InvestorInformationContractABI, InvestorInformationContractAddress)
          InvestorInformationContract.methods.SaveInvestorInformation(account, username, email, phoneNumber, secretKey).send({ from: account})
          .once('receipt', (receipt) => {
               setLoading2(true)
               console.log(receipt)
               window.location.reload()
          } )
     }

     return(
          <div>
               { loading2 ? 
                    <div>
                    <Box sx={{ display: 'flex' }}>
                         <CircularProgress size={60} />
                    </Box>
               </div>
               : 
               <Box component="form" onSubmit = {handleSubmit} >
                    <TextField required
                         id="standard-required"
                         label="Username"
                         name = "username"
                         variant="standard"
                         sx ={{ width: "50%", pr: "2%"}}
                    />
                    <TextField required
                         id="standard-required"
                         label="Email"
                         name = "email"
                         variant="standard"
                         sx ={{ width: "50%"}}
                    />
                    <div style={{ paddingTop: "20px"}}></div>
                    <TextField required
                         id="standard-required"
                         label="Phone Number"
                         name = "phoneNumber"
                         variant="standard"
                         sx ={{ width: "50%", pr: "2%"}}
                    />
                    <TextField required
                         id="standard-required"
                         label="Secret Key"
                         type = "password"
                         name = "secretKey"
                         variant="standard"
                         sx ={{ width: "50%"}}
                    />
                    <Button type="submit" variant="outlined" sx={{ mt: 4, width: "25%", borderColor: '#737373', color: '#404040'}}>Submit</Button>
               </Box>
               }
          </div>
     )
}