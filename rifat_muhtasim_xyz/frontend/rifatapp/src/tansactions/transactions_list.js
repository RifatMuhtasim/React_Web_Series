import { React , useContext} from 'react';
import { Typography , Card, CardContent, CardMedia, CardActionArea, Box, Grid, Paper, Link} from '@mui/material';
import { TransactionsContext } from '../contract/TransactionsContext';
import dummy_data from '../utility/dummy_data';


export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const Transactions_list = () => {
  const { currentAccount, transactions_list } = useContext(TransactionsContext)

  return(
    <div id="transactions">
        { !currentAccount ? (
          <Typography variant='h5' component="center"  className='pb-5'>
            Connect your account to see the latest transactions
          </Typography>

        ) : (
          <div>
            <Typography variant='h5' component="center" className='pb-4'>
              {shortenAddress(currentAccount)} Latest Transactions 
            </Typography>
            <div className='pb-5'>
              <Grid container spacing={3}>
                { transactions_list.reverse().map((transaction, i) => (
                  <Grid item key={i} xs={6} sm={3} >
                    <Paper elevation={4}>
                      <Transaction_block  {...transaction} />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        )}
    </div>
  )
} 


const Transaction_block = ({ addressFrom, addressTo, amount, keyword, message, timestamp, url}) => {

  return(
    <div>
      <Box>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
              alt="green iguana"/>

            <CardContent>
              <Link href={`https://rinkeby.etherscan.io/address/${addressFrom}`} target="_blank"  underline='none'>
                <Typography variant="body1" color="primary">
                  From: {shortenAddress(addressFrom)}
                </Typography>
              </Link>

              <Link href={`https://rinkeby.etherscan.io/address/${addressTo}`} target="_blank"  underline='none' >
                <Typography variant="body1" color="primary" gutterBottom>
                  To: {shortenAddress(addressTo)}
                </Typography>
              </Link>

                <Typography variant="body2" color="text.primary">
                  Amount: {amount} ETH
                </Typography>

              <Typography variant="body2" color="text.primary">
                { message === "" ? null :(
                  <> Message: { message} </>
                )}
              </Typography>

              <Typography variant="body2" color="text.primary">
                  Time: {timestamp}
                </Typography>
            </CardContent>

          </CardActionArea>
        </Card>
      </Box>
    </div>
  )
}