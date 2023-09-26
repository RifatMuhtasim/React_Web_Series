import React from "react";
import { Typography, Container} from '@mui/material';
import footer from '../media/img1/footer2.jpg';
import { useWindowResize } from "../utility/useWindowResize";


export const Footer = () => {
  const [height, width] = useWindowResize()

  return(
    <div id="footer" style={{ marginTop: "-10px"}}>
      <div 
        style={{ 
          backgroundColor: "black", 
          width: "100%", 
          height: width < 600 ? "70vh" : '100vh', 
          position: 'absolute', 
          zIndex: '10'
      }}>
        <img src={footer} alt="" style={{opacity: '0.6', width: '100%', height:  width < 600 ? "70vh" : '100vh', objectFit: 'cover', objectPosition: 'top center'}} />
      </div>

      <Container maxWidth="lg" style={{ position: 'relative', zIndex: '100', paddingTop: width < 600 ? '10%' : '10%'}}>
        <Typography variant={width < 600 ? 'h5' : 'h4'} sx={{ color : "white"}}>GENESIEX LAB </Typography>

        <div style={{ color : "white"}}>
          <Typography variant={ 'body2'}  sx={{fontSize: '20px', display: 'none'}}>
            DISPLAY: NONE
          </Typography>
        </div>
        <div>
          <Typography variant="body1" sx={{ width: "40%", color: "white", pt: "1%", display: width < 600 ? 'none' : 'none'}}>
           DISPLAY: NONE
          </Typography>
        </div>

        <div style={{"fontSize": "14px", color : "white", paddingTop: '1%'}}>
          <div>
            <p>©Copyright 2022 by GENESIEX LAB</p>
          </div>
        </div>
      </Container>
      
    </div>
  )
}


