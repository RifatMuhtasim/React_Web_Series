import React, {useState, useEffect} from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from "./constants";

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log({
    provider, 
    signer,
    transactionContract
  })

  return transactionContract;
}


export const TransactionProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState()
  const [transaction_count, setTransaction_count] = useState( localStorage.getItem("transaction_count") ? localStorage.getItem("transaction_count") : 0)
  const [transactions_list, setTransactions_list] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try{
      if(!ethereum) return console.log("Please install MetaMask");
      const accounts = await ethereum.request({ method: "eth_accounts"})

      if (accounts.length){
        setCurrentAccount(accounts[0])
        getAllTransactions();

      } else {
        console.log("No account found.")
      }
    } catch(error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try{
      if (!ethereum) {
        return alert("Please install MetaMask");
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts", })
      setCurrentAccount(accounts[0]);
      window.location.reload()

    } catch(error) {
      console.log(error)
      throw new Error("No Ethereum Object Found")
    }
  }


  const sendTransactions = async (addressTo, amount, keyword, message) => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      if (!currentAccount) return connectWallet();

      console.log("Transaction", addressTo, amount, keyword, message)
      const transactionContract =  getEthereumContract()
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log(parsedAmount._hex)

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from : currentAccount,
          to: addressTo,
          gas: '0x5208',
          value: parsedAmount._hex,
        }],
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, keyword, message);
      console.log(`Loading - ${transactionHash.hash}`)
      transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount()
      setTransaction_count(transactionCount.toNumber());
      window.location.reload()

    } catch (error) {
      console.log(error)
    }
  }

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionContract =  getEthereumContract();
        const currentTransactionCount = await transactionContract.getTransactionCount();
        localStorage.setItem("transaction_count", currentTransactionCount)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const getAllTransactions = async () => {
    try {
      if (ethereum){
        const transactionContract =  getEthereumContract();
        const availableTransactions = await transactionContract.getAllTransactions();
        const structuredTransaction = availableTransactions.map((transaction) => ({
          addressFrom: transaction.sender,
          addressTo: transaction.receiver,
          amount: parseInt(transaction.amount._hex) / (10 ** 18),
          keyword: transaction.keyword,
          message: transaction.message,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString()
        }))

        console.log(structuredTransaction)
        setTransactions_list(structuredTransaction)
      }
      
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const fetch_data = () => {
        checkIfWalletIsConnected()
        checkIfTransactionsExists()
    }
    fetch_data()

  }, [transaction_count]);


  return(
    <TransactionsContext.Provider value={{connectWallet, currentAccount, sendTransactions, transactions_list}}>
      {children}
    </TransactionsContext.Provider>
  )
}