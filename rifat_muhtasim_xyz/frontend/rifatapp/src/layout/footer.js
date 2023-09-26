import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { Grid, Link , Typography, Container} from '@mui/material';
import footer from '../media/img1/footer1.jpg';
import { Use_window_resize } from "../utility/use_window_resize";
import GitHubIcon from '@mui/icons-material/GitHub';


export const Footer = () => {
  const [height, width] = Use_window_resize()

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
        <Typography variant={width < 600 ? 'h5' : 'h4'} sx={{ color : "white"}}>Khandokar Rifat Muhtasim  </Typography>

        <div style={{ color : "white"}}>
          <Typography variant={ 'body2'}  sx={{fontSize: '20px'}}>Try to share my happiness with Refugees </Typography>
        </div>
        <div>
          <Typography variant="body1" sx={{ width: "40%", color: "white", pt: "1%", display: width < 600 ? 'none' : ''}}>
           I'm a simple person who hides thousand feelings behind the simplest smile. 
          </Typography>
        </div>

        <div style={{ paddingTop: width < 600 ? "5%" : "2%"}}>
          <Social_contact isBlack={false}/>
        </div>

        <div style={{"fontSize": "14px", color : "white", paddingTop: '1%'}}>
          <div>
            <p>©Copyright 2022 by Rifat Muhtasim </p>
          </div>
        </div>
      </Container>
      
    </div>
  )
}



export const Social_contact = (props) => {
  const [height, width] = Use_window_resize()
  const isBlack = props.isBlack

  return (
      <div>
          <Grid container spacing={1} 
              sx={{ width: "100%", display: "flex", justifyContent: 'start', alignItems: 'center'}}>

              <Grid item>
                  <Link href="mailto:md.rifat.muhtasim@gmail.com">
                      <EmailIcon id="icon"
                          sx={{ color : isBlack ? "#4d4d4d" : "white",
                              fontSize: "32px",
                              }}/>
                      </Link> 
              </Grid>

              <Grid item>
                  <Link href="https://www.facebook.com/khandokar.rifat.muhtasim"  target="_blank">
                      <FacebookIcon  id="icon"
                          sx={{ color : isBlack ? "#4d4d4d" : "white",
                              fontSize: "32px",
                              }}/>
                      </Link>
              </Grid>

              <Grid item>
                  <Link href="https://twitter.com/MdRifatMuhtasim" target="_blank">
                      <TwitterIcon  id="icon"
                          sx={{ color : isBlack ? "#4d4d4d" : "white",
                              fontSize: "32px",
                              }}/>
                      </Link>
              </Grid>

              <Grid item>
                  <Link href="https://www.instagram.com/rifat.muhtasim" target="_blank">
                      <InstagramIcon  id="icon"
                          sx={{ color : isBlack ? "#4d4d4d" : "white",
                              fontSize: "32px",
                              }}/>
                      </Link>
              </Grid>

              <Grid item>
                  <Link href="https://www.linkedin.com/in/rifat-muhtasim" target="_blank">
                      <LinkedInIcon id="icon" 
                          sx={{ color : isBlack ? "#4d4d4d" : "white",
                              fontSize: "32px",
                              }}/>
                      </Link>
              </Grid>

              <Grid item>
                  <Link href="https://github.com/RifatMuhtasim" target="_blank">
                      <GitHubIcon  id="icon"
                          sx={{ color : isBlack ? "#4d4d4d" : "white",
                              fontSize: "32px",
                              }}/>
                      </Link>
              </Grid>
              
          </Grid>
      </div>
  )
};

