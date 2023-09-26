import React from 'react';
import { Container, Box, Paper , Grid, Typography} from '@mui/material';
import dashbord1 from "../../media/img1/dashbord1.png";
import dashbord2 from "../../media/img1/dashbord2.png";
import dashbord3 from "../../media/img1/dashbord3.png";
import dashbord4 from "../../media/img1/dashbord4.png";
import dashbord5 from "../../media/img1/dashbord5.png";
import {Use_window_resize} from "../../utility/use_window_resize"


export const Home_dashbord = () => {
  const [ height, width ] = Use_window_resize()

  return(
    <div>
      <Container maxWidth="lg" >
        <Paper elevation={7} 
          sx={{
            backgroundColor: "transparent",
            height: "100%"
          }}>
            <Box sx={{ pt: "4%"}}>
              <Typography variant={ width < 600 ? "h6" : "h4"} component="div" className="text-center" sx={{ color: "rgba(200, 200, 200, 0.7)"}}>
                Try to share our happiness with Refugees 
              </Typography>
              <Typography variant={ width < 600 ? "body1" : "h5"} component="div" className="text-center" sx={{ pt: "1%"}}>
                We work around the clock to protect and assist refugees all over the world.
              </Typography>
            </Box>

            <Grid container spacing={5} sx={{ paddingTop: "4%", pb: "7%"}}>
              <Grid item xs={6} sm={4} md={2.4} sx={{ width : "100%"}}>
                <center>
                  <img src={dashbord1}
                    style={{
                      width: "40%",
                      paddingBottom: "20px"
                    }} />
                    <Typography variant="body1">
                      Shelter 
                    </Typography>
                </center>
              </Grid>

              <Grid item xs={6} sm={4} md={2.4} sx={{ width : "100%"}}>
                <center>
                  <img src={dashbord2}
                    style={{
                      width: "40%",
                      paddingBottom: "20px"
                    }} />
                    <Typography variant="body1">
                      Food
                    </Typography>
                </center>
              </Grid>

              <Grid item xs={6} sm={4} md={2.4} sx={{ width : "100%"}}>
                <center>
                  <img src={dashbord3}
                    style={{
                      width: "40%",
                      paddingBottom: "20px"
                    }} />
                    <Typography variant="body1">
                      Health
                    </Typography>
                </center>
              </Grid>

              <Grid item xs={6} sm={4} md={2.4} sx={{ width : "100%"}}>
                <center>
                  <img src={dashbord4}
                    style={{
                      width: "40%",
                      paddingBottom: "20px"
                    }} />
                    <Typography variant="body1">
                      Protection
                    </Typography>
                </center>
              </Grid>

              <Grid item xs={6} sm={4} md={2.4} sx={{ width : "100%" , display: width < 600 ? 'none' : ''}}>
                <center>
                  <img src={dashbord5}
                    style={{
                      width: "40%",
                      paddingBottom: "20px",
                    }} />
                    <Typography variant="body1">
                      Education
                    </Typography>
                </center>
              </Grid>
            </Grid>
          
        </Paper>
      </Container>
    </div>
  )
}