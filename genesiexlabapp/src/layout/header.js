import React, {  useContext } from "react";
import { Button, Box, Divider, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded';
import { useWindowResize } from "../utility/useWindowResize";
import { Link } from "@mui/material";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { MainContext } from "../context/MainContext";
import { shortenAddress } from "../utility/useWindowResize";
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';



export const Header = () => {
  const [height, width] = useWindowResize()
  const { account, connectWallet} = useContext(MainContext)

  return (
    <React.Fragment>
      <div id="header" className="drawer_glass_style" style={{ position: 'fixed', height: "53px", zIndex: '1000', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: "center" }}>

        <Button href="/"
          sx={{
            marginTop: "0.5%",
            paddingLeft: "2%",
            marginLeft: "2%",
            color: 'cprimary',
            '&:hover': { color: "cprimary_hover" }
          }}>
          <h5>GENESIEX LAB</h5>
        </Button>

        <div style={{ padding: '2%', marginTop: "0%", display: "flex", justifyContent: "center", alignItems: "center" }}>

          {account ?
            <Button href="/profile" sx={{ display: width < 600 ? "none": "", color: "cprimary", '&:hover': { color: "cprimary_hover" } }}>Profile</Button>
             :
            <Button onClick={() => connectWallet()} sx={{ display: width < 600 ? "none": "", color: "cprimary", '&:hover': { color: "cprimary_hover" } }}>Connect Wallet</Button>
            }

          <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <div style={{ mt: '-20px' }}>
              <MenuOpenRoundedIcon fontSize="large" sx={{ mx: 1, color: 'cprimary', cursor: "pointer" }} />
            </div>
          </div>
        </div>
      </div>
      <Header_bar />
    </React.Fragment>
  )
}


const Header_bar = () => {
  const [height, width] = useWindowResize()

  return (
    <div>
      <div>
        <div style={{ width: width < 600 ? "80%" : "30%", marginBottom: "-4px", marginTop: "-4px" }} className="offcanvas offcanvas-end drawer_glass_style2"  id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: "3%", alignItems: "center" }}>
            <Button href="/" sx={{ ml: "35px", color: "cprimary", fontSize: "106%", '&:hover': { color: "cprimary_hover" } }}>
              GENESIEX LAB
            </Button>
            <Box sx={{ mr: "3%", cursor: "pointer" }}>
              <CancelRoundedIcon data-bs-dismiss="offcanvas" fontSize="large" sx={{ color: "cprimary", mx: 2, backgroundColor: "transparent", borderRadius: "50%" }} />
            </Box>
          </Box>
          <Divider sx={{ mt: "0.5%" }} />

          <div style={{ paddingLeft: "5%" }}>
            <List_item />
          </div>
        </div>
      </div>
    </div>
  )
}


const List_item = () => {
  const [height, width] = useWindowResize()
  const { account, isCompany, connectWallet, DisconnectWallet , isCompanyTypeA2} = useContext(MainContext)
  // console.log(isCompany)

  return (
    <div >
      <List >

        { account ?
          <Link href="/profile" underline="none">
            <ListItem disablePadding data-bs-dismiss="offcanvas">
            <ListItemButton sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }}>
              <ListItemIcon>
                <AllInclusiveRoundedIcon sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </Link>
        :
        <ListItem onClick={() => connectWallet()} disablePadding data-bs-dismiss="offcanvas">
          <ListItemButton sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }}>
            <ListItemIcon>
              <AllInclusiveRoundedIcon sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }} />
            </ListItemIcon>
            <ListItemText primary="Connect Wallet" />
          </ListItemButton>
        </ListItem>
        }

        <Link href="/about" underline="none">
          <ListItem disablePadding data-bs-dismiss="offcanvas">
            <ListItemButton sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }}>
              <ListItemIcon>
                <AssignmentIndRoundedIcon sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }} />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/companies" underline="none">
          <ListItem disablePadding data-bs-dismiss="offcanvas">
            <ListItemButton sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }}>
              <ListItemIcon>
                <PaidRoundedIcon sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }} />
              </ListItemIcon>
              <ListItemText primary="Token-A Companies" />
            </ListItemButton>
          </ListItem>
        </Link>

        {!isCompany && !isCompanyTypeA2 ? null :
          <Link href="/company-dashboard" underline="none">
          <ListItem disablePadding data-bs-dismiss="offcanvas">
            <ListItemButton sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }}>
              <ListItemIcon>
                <CorporateFareRoundedIcon sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }} />
              </ListItemIcon>
              <ListItemText primary="Company Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        }

        {!account ? null :
        <ListItem onClick={() => { DisconnectWallet() }} disablePadding data-bs-dismiss="offcanvas">
          <ListItemButton sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }}>
            <ListItemIcon>
              <ExitToAppRoundedIcon sx={{ color: "cprimary", '&:hover': { color: "cprimary_hover" } }} />
            </ListItemIcon>
            <ListItemText primary="Disconnect Wallet" />
          </ListItemButton>
        </ListItem>
        }

      </List >

      {!account ? null :
      <div style={{ paddingLeft: "4.3%", paddingTop: "1%", display: !account ? "none" : "" , color: "white"}}>
        <h5>Account: {shortenAddress(account)}</h5>
      </div>
      }
    </div>
  )
}
