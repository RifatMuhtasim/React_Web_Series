import React, {useState, useContext} from "react";
import { Use_window_resize} from '../utility/use_window_resize';
import { Paper, Box, TextField, Button, LinearProgress} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { TransactionsContext } from "../contract/TransactionsContext";


export const Transactions_card = () => {
  const [height, width] = Use_window_resize()
  const [loading, setLoading] = useState(false);
  const { sendTransactions} = useContext(TransactionsContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    var addressTo = e.target.addressTo.value
    var amount = e.target.amount.value
    var keyword = e.target.keyword.value
    var message = e.target.message.value

    if( !addressTo || !amount || !keyword || !message) return;
    sendTransactions(addressTo, amount, keyword, message)
  }

  return(
    <div style={{ paddingTop: width < 900 ? "0em" : "6em"}}>
      <Box>
        <Paper elevation={4} sx={{minHeight: "320px"}}>

          <form onSubmit={handleSubmit} style={{ padding: '2em'}}>
            <TextField defaultValue="0xCd37f28A3fbF2b397bfDDB297bFE861eb6F8b9c5"  id="standard-basic"  required name="addressTo" label="Address To" variant="standard" sx={{ width : "100%"}} />
            <TextField  id="standard-basic" required  name="amount"  label="Amount (ETH)"   variant="standard" sx={{ width : width < 600 ? "100%" : "40%", mt: "1em", mr: "1em"}} />
            <TextField id="standard-basic"  required name="keyword" label="Keyword (GIF)" variant="standard" sx={{ width : width < 600 ? "100%" : "56%", mt: "1em"}} />
            <TextField id="standard-basic"  required name="message" label="Message" variant="standard" sx={{ width : "100%", mt: '1em'}} />
            
            { !loading ? 
            <Button type="submit" className="btn custom-btn custom-btn-bg custom-btn-link" sx={{ mt: "2em", width: width < 600 ? '100%' : '40%'}} startIcon={<SendRoundedIcon />} >Send Crypto</Button>
            :
            <div style={{ marginTop: width < 600 ? "2em" : "3em"}}>
              <LinearProgress />
            </div>
            }
          </form>

        </Paper>
      </Box>
    </div>
  )
}