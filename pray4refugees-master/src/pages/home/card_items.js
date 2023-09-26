import React from "react";
import { Box, Paper, Container, Grid, Divider, Typography } from "@mui/material";
import { Use_window_resize } from "../../utility/use_window_resize";
import  logo1 from '../../media/img1/creative.png'


export const Home_card_items = () => {
  const [ height, width ] = Use_window_resize()

  return(
    <div>
      <Container maxWidth="md">
        <Box sx={{ pb: width < 600 ? "9%" : "4%"}}>
          <Typography variant={ width < 600 ? "h6": "h4"}>
            Refugees and immigrants need your help today.
          </Typography>
          <Typography variant="body1">
            Today, over 80 million people around the world have been forced to leave their home. Each day, that number grows by over 44,000. When you give today, you help them:
          </Typography>
        </Box>

        <Grid container spacing={1}>
        
          <Grid item xs={6} sm={3}>
            <Paper elevation={6} className="p-3" sx={{ height: "200px", backgroundColor: "transparent"}}>
              <Typography variant="h6">Donate Online</Typography> <Divider />
              <Typography variant="body2" sx={{pt: '9%'}}>
               You can give any amount and all of it will go straight to helping refugees around the world
              </Typography>
            </Paper>

            <Paper elevation={6} className="p-3" sx={{ height: "200px", mt: "8px", backgroundColor: "rgba(66, 105, 225, 0.8)"}}>
              <Typography variant="h6">Donate Food</Typography> <Divider />
              <Typography variant="body2" sx={{pt: '9%'}}>
                You can provide a supply of therapeutic food and help a severely malnourished refugee child recover.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper className="p-3" elevation={1} sx={{ height: "408px", backgroundColor: "rgba(0, 168, 107, 0.6)"}}>
              <Typography variant="h6">Share refugee stories</Typography> <Divider />
              <Typography variant="body2" sx={{pt: '7%'}}>
                Compiling and telling refugee stories can be a useful tool in educating and informing the public about the state of the refugee crisis. As these stories foster empathy, it is likely that communities will remember refugees and seek to help provide them with relief and safety.
              </Typography>
              <center className="pt-5" style={{ display: width < 600 ? 'none' : ''}}>
                <img src={logo1} style={{width: "40%"}} />
              </center>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Paper elevation={2} className="p-3"
              sx={{ 
                height: "200px", 
                width: "65%", 
                backgroundColor: "rgba(0, 191, 255, 0.8)",
                display: width < 600 ? 'none' : '',
                }}>
                <Typography variant="h6">Rebuild Futures</Typography> <Divider />
                <Typography variant="body2" sx={{pt: '9%'}}>
                  As refugees begin to rebuild their homes and lives, you can help families find housing, learn English, pursue employment.
                </Typography>
            </Paper>

            <Paper className="p-3" elevation={6} sx={{ height: "200px",  backgroundColor: "rgba(77,77,255, 0.8)", mt: width < 600 ? '0px': '8px'}}>
                <Typography variant="h6">Restore Hope</Typography> <Divider />
                <Typography variant="body2" sx={{pt: '6%'}}>
                As refugee families realize they may never return home, you can combat this by providing trauma counseling, mother and parent groups, and safe spaces and literacy clubs for refugee children to learn, grow and play.
                </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}