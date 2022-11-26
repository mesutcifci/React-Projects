import * as React from "react";
import { ProductLogo } from "../../ui";

import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";

const Navbar = () => {
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
            <IconButton size="small" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
