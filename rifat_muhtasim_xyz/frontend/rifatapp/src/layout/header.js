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
import { Social_contact} from "./footer";
import SchoolIcon from '@mui/icons-material/School';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import GitHubIcon from '@mui/icons-material/GitHub';


export const Header = () => {
  const [height, width] = Use_window_resize()

  return(
    <div id="header" style={{ position: 'fixed', backgroundColor: "white", height: "53px", zIndex: '1000', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems:"center"}}>
      
      <Button href="/" 
        sx={{ 
          marginTop: "0.5%",
          paddingLeft: "2%",
          marginLeft: "2%",
          color: "black",
          '&:hover': {
            color: "#454343"
            }
          }}>
        <h5>Rifat Muhtasim</h5>
      </Button>

      <div style={{ padding: '2%',  marginTop: "0%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Link href="https://github.com/RifatMuhtasim" target="_blank" underline="none" style={{ display: width < 600 ? "none": ''}}>
            <Button sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>Github</Button>
          </Link>
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
        <div>
          <div  data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <div style={{ mt: '-20px'}}>
              <MenuOpenRoundedIcon fontSize="large"  sx={{ mx: 1 , color: 'black', cursor: "pointer"}} />
            </div>
          </div>

          <div style={{ width: width < 600 ? "80%": "30%", marginBottom: "-4px", marginTop: "-4px"}} className="offcanvas offcanvas-end drawer_glass_style2" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <Box sx={{ display: "flex", justifyContent: "space-between", pt: "3%", alignItems: "center"}}>
              <Button  href="/" sx={{  ml: "35px", color: "cprimary", fontSize:"106%", '&:hover': { color: "black"}}}>
                Rifat Muhtasim 
              </Button>
              <Box sx={{ mr: "3%", cursor: "pointer"}}>
                <CancelRoundedIcon  data-bs-dismiss="offcanvas" fontSize="large" sx={{ color: "cprimary", mx: 2, backgroundColor: "white", borderRadius: "50%"}}/>
              </Box>
            </Box>
            <Divider  sx={{ mt: "3%"}} />

            <div style={{ paddingLeft: "5%"}}>
              <List_item />
            </div>
          </div>
        </div> 
    </div>
  )
}


const List_item = () => {
  const [height, width] = Use_window_resize()

  return(
    <div >
      <List >
            <Link  href="https://github.com/RifatMuhtasim"  underline="none" target="_blank" style={{ display: width < 600 ? "": 'none'}}>
              <ListItem disablePadding data-bs-dismiss="offcanvas">
              <ListItemButton  sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText primary="Github Repositories" />
              </ListItemButton>
              </ListItem>
            </Link>

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

          <Link  href="#education_list"   underline="none">
            <ListItem disablePadding data-bs-dismiss="offcanvas">
                <ListItemButton   sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary="Education" />
                </ListItemButton>
            </ListItem>
          </Link>

          <Link  href="#transactions"   underline="none">
            <ListItem disablePadding data-bs-dismiss="offcanvas">
                <ListItemButton   sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>
                  <ListItemIcon>
                    <PaidRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions" />
                </ListItemButton>
            </ListItem>
          </Link>

          <Link  href="#transactions"   underline="none">
            <ListItem disablePadding data-bs-dismiss="offcanvas">
                <ListItemButton   sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>
                  <ListItemIcon>
                    <CorporateFareRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Companies" />
                </ListItemButton>
            </ListItem>
          </Link>

          <Link  href="https://drive.google.com/drive/folders/1IrAmxPc8Q_AvWGAyIflkNmSHhEIGUJfY"   underline="none">
            <ListItem disablePadding data-bs-dismiss="offcanvas">
                <ListItemButton   sx={{color: "cprimary", '&:hover': { color: "cprimary_hover"}}}>
                  <ListItemIcon>
                    <LocalPrintshopRoundedIcon  />
                  </ListItemIcon>
                  <ListItemText primary="Print" />
                </ListItemButton>
            </ListItem>
          </Link>

        </List >

        <div style={{ paddingLeft: "4.3%", paddingTop: "1%"}}>
          <Social_contact isBlack={true}  />
        </div>
    </div>
  )
}
