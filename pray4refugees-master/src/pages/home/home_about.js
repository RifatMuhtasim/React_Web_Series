import { React } from 'react';
import { Grid, Container, Box, Typography , Paper, Button} from '@mui/material';
import  sidebar_img1 from '../../media/img1/world_refugee_day2021.jpg';
import  sidebar_img2 from '../../media/img1/refugee-hero-1.jpg';
import { Use_window_resize } from '../../utility/use_window_resize';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


export const Home_page_about = () => {
  const [ height, width ] = Use_window_resize()

  const sidebar_img2_css = {
    margin: width > 600 ? "-19% 0px 0px 6% " : "-36% 0px 0px 7%", 
    boxShadow: "2px 4px 30px black" ,  
    width: width > 600 ? "29%" : "54%", 
    height: width > 600 ? '45%' : '30%',  
    objectFit: "cover", 
    objectPosition: "0% 20%", 
    position: 'absolute', 
    zIndex: "90"
  }

  return(
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box >
            <Container maxWidth="sm">

              <Box sx={{ pt: width < 600 ? "8%" : "22%"}}>
                <Typography variant={ width < 600 ? "h6" : "h4"} component="div">
                  Together we heal, learn and shine.
                </Typography>
                <Typography variant='body1'>
                  World Refugee day - 20 June 
                </Typography>
                <Typography variant={ width < 600 ? "body2" : "body1"} component="div" sx={{pt: '4%'}}>
                  Each year on June 20 the world celebrates the strength and courage of people who have been forced to flee their home country to escape conflict or persecution. 
                  <br />You can support refugees every day and help them to be protected and included in health care, education and sport.
                </Typography>
              </Box>

            </Container>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box >
            <Box style={{ margin: "100px 0px 100px 40px",  backgroundImage: "linear-gradient( to right, rgba(2, 105, 164, 1), rgba(2, 105, 164, 0.1))", borderRadius: "300px 0px 0px 300px"}}>
              
              <div style={{ width: "100%", display: "flex", justifyContent: "end"}}>
                <img src={ sidebar_img1}  style={{position: 'relative', zIndex: "120", width: "60%", margin: "-12% 60px 0px 0px ", boxShadow: "12px 14px 30px black"}} />
              </div>

              <div >
                <img src={ sidebar_img2} style={ sidebar_img2_css } />
              </div>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </div>
  )
}


export const Home_refugees_gallery = () => {
  const itemData = [
    {
      img: 'https://euromedmonitor.org/uploads/palestinians-from-syria/Europe.jpg',
      title: 'Palestinian',
    },
    {
      img: 'https://i.natgeofe.com/n/41b0d703-9dc9-4583-9925-5facf4b4cd14/01-venezuela-refugees-bolivar_3x2.jpg',
      title: 'Venezuelan',
    },
    {
      img: 'https://cdn.britannica.com/94/186794-050-289999D0/girl-Rohingya-brother-camp-Sittwe-Myanmar-thousands-June-2015.jpg',
      title: 'Rohingya',
    },
    {
      img: 'https://api.time.com/wp-content/uploads/2014/05/syrian-refugees-turkey-2.jpg',
      title: 'Syrian',
    },
    {
      img: 'https://s3-ap-northeast-1.amazonaws.com/psh-ex-ftnikkei-3937bb4/images/3/9/0/7/36267093-1-eng-GB/2021-09-01T142955Z_912930408_RC2PGP9QMLBQ_RTRMADP_3_AFGHANISTAN-CONFLICT-PAKISTAN.jpg',
      title: 'Afghan',
    },
    {
      img: 'https://www.unicef.org/sites/default/files/styles/hero_mobile/public/Sudan%20Case%20Study%20Cover%20Photo.jpg',
      title: 'Sudanese',
    },
    {
      img: 'https://img.thedailybeast.com/image/upload/dpr_2.0/c_crop,h_1440,w_1440,x_0,y_0/c_limit,w_128/d_placeholder_euli9k,fl_lossy,q_auto/v1509657617/171102-nadeau-refugees-tease_gfu3ss',
      title: 'Congolese',
    },
    {
      img: 'https://dbcms.docubay.com/featured-images/1590161405-thegreengoldofafricaimage01-256x256.jpg',
      title: 'Somali',
    },
  ];

  return(
    <Container maxWidth="lg">
      <Paper elevation={0} square sx={{ backgroundColor: "black", color: "black"}}>
        <ImageList >
          <ImageListItem key="Subheader" cols={4} >
            <ListSubheader component="div" sx={{ backgroundColor: "rgba(255,255,255,0.4)", color: "black", fontSize: "23px"}}>Refugees</ListSubheader>
          </ImageListItem>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Container>
  )
}