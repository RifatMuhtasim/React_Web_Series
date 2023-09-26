import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { TextField, Button } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Use_window_resize } from '../utility/use_window_resize';



export const Payment_card = () => {
  const theme = useTheme();
  const [height, width] = Use_window_resize()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const eidi_amount = data.get('eidi_amount')
    console.log(eidi_amount)

    if(eidi_amount === '' ||  eidi_amount == 0 ){
      alert("Please Type your Eidi Amount")
      window.location.reload()
    } else {
      window.location.replace('https://indianmemetemplates.com/wp-content/uploads/sad-disappointed-pakistani-fan.jpg')
      // window.location.replace(`${process.env.REACT_APP_HEX_URL}/hex/payment/${eidi_amount}/`)
    }
  }

  return (
    <Card component="Paper" elevation={7} sx={{ display: 'flex', height: '250px', width: width< 900 ? "100%" : "50%" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' , width: width < 600 ? '60%' : '40%'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Eid Salami
          </Typography>
        </CardContent>

        <Box component="form" onSubmit={handleSubmit} sx={{  pl: 2, pb: 2, pr:2 }}>
          <TextField  defaultValue="500" variant='outlined' type="number" label="Eidi Amount" name="eidi_amount" />
          <Button type="submit" className="btn custom-btn custom-btn-bg custom-btn-link" sx={{ mt: "1em", width: '100%' }} startIcon={<SendRoundedIcon />} >Send Salami</Button>
        </Box>
      </Box>

      <Box sx={{ width: width < 600 ? '40%' : '60%'}}>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: '100%' , objectFit: "cover"}}
          image="https://i.pinimg.com/564x/78/84/ba/7884ba5720d9752c8ee3a98307326ad6.jpg"
          alt="Live from space album cover"
        />
      </Box>
    </Card>
  );
}
