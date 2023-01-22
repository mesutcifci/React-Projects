import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Styles
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person,
  PersonOutlined,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import theme from "../../theme";

// Components
import NavbarMobileMenu from "../NavbarMobileMenu";
import NavbarDesktopMenu from "../NavbarDesktopMenu";
import { ProductLogo } from "../../ui";

// Data
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    user: { user },
    currentUser: { currentUser },
  } = useSelector((state: RootState) => state);

  const [selectedTabIndex, setSelectedTabIndex] = useState<number | boolean>(
    false
  );

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClickProfileIcon = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    const removedItems = [
      "addressData",
      "selectedDeliveryMethod",
      "phone",
      "selectedCountry",
    ];
    removedItems.forEach((item) => localStorage.removeItem(item));
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

  const handleClickShoppingCart = () => {
    if (currentUser) {
      navigate({ pathname: "/cart" });
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: {
          xs: "relative",
          lg: `${pathname === "/" ? "absolute" : "relative"}`,
        },
        zIndex: "99",
        left: "0",
        right: "0",
      }}
    >
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          backgroundColor: {
            xs: "#ffffff",
            lg: `${selectedTabIndex === false && "transparent"}`,
          },
          "& svg": {
            color: {
              xs: "#000000",
              lg: `${
                selectedTabIndex === false && pathname === "/" && "#ffffff"
              }`,
            },
          },
          "& .MuiToolbar-root": {
            padding: 0,
          },
          height: "70px",
          paddingLeft: {
            xs: theme.padding?.pagePaddingXS + "px",
            lg: theme.padding?.pagePaddingLG + "px",
            xl: theme.padding?.pagePaddingXL + "px",
          },
          paddingRight: {
            xs: theme.padding?.pagePaddingXS + "px",
            lg: theme.padding?.pagePaddingLG + "px",
            xl: theme.padding?.pagePaddingXL + "px",
          },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            position: "static",
            height: "70px",
          }}
        >
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
            <Typography
              sx={{
                color: {
                  xs: "#000000",
                  lg: `${
                    selectedTabIndex === false && pathname === "/" && "#ffffff"
                  }`,
                },
              }}
            >
              E-Shop
            </Typography>
          </Box>

          <NavbarMobileMenu
            isDrawerOpened={isDrawerOpened}
            setIsDrawerOpened={setIsDrawerOpened}
          />

          <NavbarDesktopMenu
            selectedTabIndex={selectedTabIndex}
            setSelectedTabIndex={setSelectedTabIndex}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "10px",
              marginLeft: { xs: "auto", md: "initial" },
            }}
          >
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
              {currentUser ? (
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
            <IconButton
              size="small"
              color="inherit"
              onClick={handleClickShoppingCart}
              sx={{ "& .MuiBadge-badge": { background: "#FBB03B" } }}
            >
              {user?.userProductsInCart.length && currentUser ? (
                <Badge badgeContent={user.userProductsInCart.length}>
                  <ShoppingCartOutlined />
                </Badge>
              ) : (
                <ShoppingCartOutlined />
              )}
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClickProfileIcon}
            >
              {currentUser ? <Person /> : <PersonOutlined />}
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpened(true)}
              sx={{ display: { lg: "none" } }}
              data-testid="hamburgerMenu"
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
