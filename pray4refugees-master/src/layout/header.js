import React , { useState} from "react";
import { Button, Fab, Box, Divider, List, ListItem, ListItemButton, ListItemText, ListItemIcon} from "@mui/material";
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded';
import { Use_window_resize } from '../utility/use_window_resize';
import { Link } from "@mui/material";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';


export const Header = () => {

  return(
    <div id="header" style={{ position: 'absolute', zIndex: '1000', display: 'flex', justifyContent: 'space-between', width: '100%', height: "50px"}}>
      
      <Button href="/" 
        sx={{ 
          marginTop: "8px",
          marginLeft: "8px",
          paddingTop: "15px", 
          paddingLeft: "25px", 
          paddingRight: "25px",
          color: "cprimary",
          '&:hover': {
            color: "cprimary_hover"
            }
          }}>
        <h5>Pray4Refugees</h5>
      </Button>

      <div style={{ padding: '10px'}}>
        <Header_bar />
      </div>
    </div>
  )
}


const Header_bar = () => {
  const [height, width] = Use_window_resize()
  const [ drawer, setDrawer ] = useState(false)

  return(
    <div>
      { width < 600 ?  
        <div>
          <div  data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <div >
              <MenuOpenRoundedIcon fontSize="large"  sx={{ mx: 1 ,  color: 'cprimary'}} />
            </div>
          </div>

          <div style={{ width: "80%"}} className="offcanvas offcanvas-end drawer_glass_style" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <Box sx={{ display: "flex", justifyContent: "space-between", pt: "3%", alignItems: "center"}}>
              <Button  href="/" sx={{  ml: "35px", color: "cprimary", fontSize:"106%"}}>
                Pray4Refugees
              </Button>
              <Box sx={{ mr: "3%"}}>
                <CancelRoundedIcon  data-bs-dismiss="offcanvas" fontSize="large" sx={{ color: "cprimary", mx: 1}}/>
              </Box>
            </Box>
            <Divider  sx={{ pt: "3%"}} />

            <div style={{ paddingLeft: "5%"}}>
              <List_item />
            </div>
          </div>

        </div> 
        
      :
        <div>
          <Link href="#about" underline="none">
            <Button sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>About</Button>
          </Link>
          <Link href="#support" underline="none">
            <Button sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>Explore</Button>
          </Link>
          <Link href="#refugees" underline="none">
            <Button sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>Refugees</Button>
          </Link>
        </div>
      }

    </div>
  )
}


const List_item = () => {

  return(
    <div>
      <List >
            <Link  href="#about"  underline="none">
              <ListItem disablePadding data-bs-dismiss="offcanvas">
              <ListItemButton  sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>
                <ListItemIcon>
                  <AssignmentIndRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
              </ListItem>
            </Link>

          <Link  href="#support"   underline="none">
            <ListItem disablePadding data-bs-dismiss="offcanvas">
                <ListItemButton   sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>
                  <ListItemIcon>
                    <PageviewRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Explore" />
                </ListItemButton>
            </ListItem>
          </Link>

          <Link  href="#refugees"   underline="none">
            <ListItem disablePadding data-bs-dismiss="offcanvas">
                <ListItemButton   sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>
                  <ListItemIcon>
                    <PeopleRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Refugees" />
                </ListItemButton>
            </ListItem>
          </Link>
        </List >
    </div>
  )
}
