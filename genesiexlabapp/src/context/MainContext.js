import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import { TokenExchangeContractABI, TokenExchangeContractAddress, TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress } from '../blockchainJsonFile/blockchainAbiAddress';


const { ethereum } = window;
export const MainContext = React.createContext();

export const MainProvider = ({children}) => {
     const web3 = new Web3(Web3.givenProvider)
     const [account, setAccount ] = useState(sessionStorage.getItem("account") ? sessionStorage.getItem("account") : null);
     const [isCompany, setIsCompany] = useState()
     const [isCompanyTypeA2, setIsCompanyTypeA2] = useState()


     const loadWallet = async () => {
          try{
               if (!ethereum) {console.log("Please Install MetaMask")}

               const accounts = await ethereum.request({method: "eth_accounts"})
               if(accounts.length && account) {
                    setAccount(accounts[0])
                    sessionStorage.setItem("account", accounts[0])
                    loadCompanyAddress(accounts[0])

               } else {
                    setAccount(null)
                    sessionStorage.clear()
                    localStorage.clear()
                    console.log("No Accounts Found ..")
               }

          } catch(error) {
               console.log(error)
          }
     }


     const connectWallet = async () => {
          try{
               if(!ethereum) { alert("Please Install MetaMask !!")}
               const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
               setAccount(accounts[0])
               loadCompanyAddress(accounts[0])
               sessionStorage.setItem("account", accounts[0])
               window.location.reload()

          } catch(error) {
               console.log(error)
          }
     }


     const DisconnectWallet = () => {
          console.log("Disconnect Wallet !! ")
          setAccount(null);
          sessionStorage.clear();
          localStorage.clear();
          window.location.replace("/")
     }


     const loadCompanyAddress =async (checkCompanyAddress) => {
          try{
               if(!ethereum) { alert("Please Install MetaMask !!")}
               if(checkCompanyAddress) {
                    const TokenExchangeContract = new web3.eth.Contract(TokenExchangeContractABI, TokenExchangeContractAddress);
                    const TokenExchangeTypeA2Contract = new web3.eth.Contract(TokenExchangeTypeA2ConractABI, TokenExchangeTypeA2ContractAddress);

                    const data = await TokenExchangeContract.methods.isCompany(checkCompanyAddress).call({from: checkCompanyAddress});
                    const data2 = await TokenExchangeTypeA2Contract.methods.isCompanyAlreadyListed(checkCompanyAddress).call({from: checkCompanyAddress});
                    setIsCompany(data)
                    setIsCompanyTypeA2(data2)
               }

          } catch(error) {
               console.log(error)
          }
     }


     useEffect(() => {
          let mounted = true;
          const fetch_data = async () => {
               if (mounted ) {
                    await loadWallet();
               }
          }
          fetch_data()

          return function cleanup() {mounted = false}
     }, [])


     return(
          <MainContext.Provider value={{account, isCompany, isCompanyTypeA2, connectWallet, DisconnectWallet}}>
               {children}
          </MainContext.Provider>
     )
}