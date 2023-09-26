import React , {useState} from "react";
import cover_img from '../../media/img1/rohingya_mother.jpg';
import { Typography, Button } from "@mui/material";
import { Home_page_about, Home_refugees_gallery } from "./home_about";
import { Home_dashbord } from "./dashbord";
import { Home_card_items } from "./card_items";
import { Use_window_resize } from "../../utility/use_window_resize";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import refugee from '../../media/img1/world_refugee_day2021.jpg';

export const Home = () => {
  const [height, width] = Use_window_resize()
  return(
    <div>
      <div>
        <Home_cover_img />
      </div>

      <div >
        <div style={{ position: 'relative', paddingBottom: "15%", paddingTop: "6%"}}>
          <Home_page_about />
        </div>
        <div id="about" style={{ position: "relative", paddingBottom: "8%", marginTop: "-8%"}}>
          <Home_card_items />
        </div>
        <div id="support" style={{ position: "relative", paddingBottom: "8%"}}>
          <Home_dashbord />
        </div>
        <center id="refugees" style={{ position: "relative", paddingBottom: "8%"}}>
          <Home_refugees_gallery />
        </center>
      </div>
      

    </div>
  )
}


const Home_cover_img = () => {
  const [height, width] = Use_window_resize()
  const [img_blur, setImg_blur] = useState(false)

  const change_background_blur = () => {
    if(window.scrollY >= 680){
      setImg_blur(true)
    } else {
      setImg_blur(false)
    }
  }
  window.addEventListener('scroll', change_background_blur);

  return(
    <div>
      <div style={{backgroundImage: "linear-gradient(rgba(255, 255, 255,0), rgba(255, 255, 255,0.14))", width: '100%', height: '100vh' }}>
         <div>
          <img src={cover_img} 
              style={{
              position: 'fixed', 
              zIndex: '9',  
              opacity: img_blur ? '0.2' : '0.4', 
              width: '100%',  
              height: "100vh", 
              objectFit: 'cover',
              filter: img_blur ? "blur(3px)" : "blur(0px)"
              }} />
         </div>
        
      
        <div style={{ position: 'absolute',  zIndex: '960', height: '100vh', top: width < 600 ? "70%" : '60%', left: '3%' }}>
          <Typography variant="body1" sx={{ fontSize: "19px"}} >
            Refugee lives matter. 
          </Typography>
          <Typography variant="h4">
            What is a <span style={{ color: "rgba(49,214,230,255)"}}>Refugee?</span>
          </Typography>

          <Typography variant="body1" sx={{ width: width > 600 ? "45%": "100%", py: "1%"}}>
            Refugees are people who have fled war, violence, conflict or persecution and have crossed an international border to find safety in another country.
          </Typography>
          <Button href="https://en.wikipedia.org/wiki/Refugee" target="_blank" className="text-dark"  endIcon={<SendRoundedIcon />}
             variant="contained" color="info" sx={{mt: "1%" }}>
            Learn More
          </Button>
        </div>
      </div>

      
    </div>
  )
}