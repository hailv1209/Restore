import { ShoppingCart } from "@mui/icons-material";
import {
  List,
  AppBar,
  ListItem,
  Switch,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

interface Props {
  darkMode: boolean;
  ChangeTheme: () => void;
}

const MidLinks = [
  { title: "Catalog", path: "/Catalog" },
  { title: "About", path: "/About" },
  { title: "Contact", path: "/Contact" },
];

const RighhtLinks = [
  { title: "Login", path: "/Login" },
  { title: "Register", path: "/Register" },
];

const NavStyles = [
  {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": {
      color: "grey.500",
    },
    "&.active": {
      color: "text.secondary",
    },
  },
];

export default function Header({ darkMode, ChangeTheme }: Props) {

  const {basket} = useStoreContext();
  const itemCount = basket?.items.reduce((sum,item) => sum + item.quantity,0)

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignContent="center">
          <Typography variant="h6" component={NavLink} to="/" sx={NavStyles}>
            RE-STORE
          </Typography>
          <Switch checked={darkMode} color="default" onChange={ChangeTheme} />
        </Box>

        <List sx={{ display: "flex" }}>
          {MidLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={NavStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignContent="center">
          <IconButton component={NavLink} to='/basket' sx={{ color: "inherit" }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {RighhtLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={NavStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
