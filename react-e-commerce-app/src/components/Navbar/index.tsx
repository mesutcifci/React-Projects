import { useEffect, useState } from "react";
import { ProductLogo } from "../../ui";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person,
  PersonOutlined,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import NavbarMobileMenu from "../NavbarMobileMenu";
import { auth } from "../../firebase";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const handleLogin = () => {
    setAnchorEl(null);
    navigate("/auth/login");
  };

  const handleRegister = () => {
    setAnchorEl(null);
    navigate("/auth/register");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", "& svg": { color: "black" } }}
      >
        <Toolbar>
          <Box
            sx={{ display: "flex", columnGap: "17px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <ProductLogo
              width="42.996"
              height="32.879"
              viewBox="0 0 42.996 32.879"
              data-testid="productLogo"
            />
            <Typography color="black">E-Shop</Typography>
          </Box>
          <NavbarMobileMenu
            isDrawerOpened={isDrawerOpened}
            setIsDrawerOpened={setIsDrawerOpened}
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
            <IconButton
              size="small"
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {user ? <Person /> : <PersonOutlined />}
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  marginTop: "10px",
                },
              }}
            >
              {user ? (
                <Box>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem onClick={handleLogin}>Login</MenuItem>
                  <MenuItem onClick={handleRegister}>Register</MenuItem>
                </Box>
              )}
            </Menu>
            <IconButton size="small" color="inherit">
              <Search />
            </IconButton>
            <IconButton size="small" color="inherit">
              <ShoppingCartOutlined />
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpened(true)}
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
