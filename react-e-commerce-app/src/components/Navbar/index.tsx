import { useState } from "react";
import { ProductLogo } from "../../ui";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import NavbarMobileMenu from "../NavbarMobileMenu";

const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", "& svg": { color: "black" } }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", columnGap: "17px" }}>
            <ProductLogo
              width="42.996"
              height="32.879"
              viewBox="0 0 42.996 32.879"
              data-testid="productLogo"
            />
            <Typography color="black">E-Shop</Typography>
          </Box>
          <NavbarMobileMenu
            isMenuOpened={isMenuOpened}
            setIsMenuOpened={setIsMenuOpened}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "17px",
              marginLeft: "auto",
            }}
          >
            <IconButton size="small" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton size="small" color="inherit">
              <ShoppingCartOutlinedIcon />
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsMenuOpened(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
