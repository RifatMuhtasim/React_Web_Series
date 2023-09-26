import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { Grid, Link , Typography, Container} from '@mui/material';
import footer2 from '../media/img1/footer1.jpg';
import footer from '../media/img1/world_refugee_day2021.jpg';
import { Use_window_resize } from "../utility/use_window_resize";


export const Footer = () => {
  const [height, width] = Use_window_resize()

  return(
    <div id="footer" style={{ marginTop: "-10px"}}>
      <div 
        style={{ 
          backgroundColor: "black", 
          width: "100%", 
          height: '75vh', 
          position: 'absolute', 
          zIndex: '10'
      }}>
        <img src={footer} alt="" style={{opacity: '0.6', width: '100%', height: '75vh', objectFit: 'cover', objectPosition: 'top center'}} />
      </div>

      <Container maxWidth="lg" style={{ position: 'relative', zIndex: '100', paddingTop: '3%'}}>
        <Typography variant={width < 600 ? 'h5' : 'h3'} sx={{ color : width < 600 ? "white": "#013642"}}>Pray for Refugees </Typography>

        <div style={{ color : width < 600 ? "white": "#013642"}}>
          <Typography variant={width < 600 ? 'body2' : 'body1'}  sx={{fontSize: '22px'}}>Try to share our happiness with Refugees </Typography>
        </div>
        <div>
          <Typography variant="body1" sx={{ width: "40%", color: "#013642", pt: "1%", display: width < 600 ? 'none' : ''}}>
            Through this website we tell different stories of refugees life to the common people so that people can join us to Pray.
          </Typography>
        </div>

        <div style={{ paddingTop: width < 600 ? "5%" : "2%"}}>
          <Social_contact />
        </div>

        <div style={{"fontSize": "14px", color : width < 600 ? "white": "#013642", paddingTop: '1%'}}>
          <div>
            <p>©Copyright 2022 by Wasi Foundation</p>
          </div>
        </div>
      </Container>
      
    </div>
  )
}



export const Social_contact = () => {
  const [height, width] = Use_window_resize()

  return (
      <div>
          <Grid container spacing={1} 
              sx={{ width: "100%", display: "flex", justifyContent: 'start', alignItems: 'center'}}>

              <Grid item>
                  <Link href="mailto:pray4refugees.org@gmail.com">
                      <EmailIcon id="icon"
                          sx={{ color : width < 600 ? "white": "#013642",
                              fontSize: "32px",
                              }}/>
                      </Link> 
              </Grid>

              <Grid item>
                  <Link href="https://www.facebook.com/pray4refugees.org"  target="_blank">
                      <FacebookIcon  id="icon"
                          sx={{ color : width < 600 ? "white": "#013642",
                              fontSize: "32px",
                              }}/>
                      </Link>
              </Grid>

              <Grid item>
                  <Link href="https://twitter.com/pray4refugees" target="_blank">
                      <TwitterIcon  id="icon"
                          sx={{ color : width < 600 ? "white": "#013642",
                              fontSize: "32px",
                              }}/>
                      </Link>
              </Grid>

              <Grid item>
                  <Link href="https://www.instagram.com/pray4refugees" target="_blank">
                      <InstagramIcon  id="icon"
                          sx={{ color : width < 600 ? "white": "#013642",
                              fontSize: "32px",
                              }}/>
                      </Link>
              </Grid>

              <Grid item>
                  <Link href="https://www.linkedin.com/company/pray4refugees" target="_blank">
                      <LinkedInIcon id="icon" 
                          sx={{ color : width < 600 ? "white": "#013642",
                              fontSize: "32px",
                              }}/>
                      </Link>
              </Grid>
              
          </Grid>
      </div>
  )
};