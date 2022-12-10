import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Theme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person,
  PersonOutlined,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";

// Components
import NavbarMobileMenu from "../NavbarMobileMenu";
import NavbarDesktopMenu from "../NavbarDesktopMenu";
import TabPanel from "../TabPanel";
import { ProductLogo } from "../../ui";

// Data
import { auth } from "../../firebase";
import { User } from "firebase/auth";

const tabPanelStyles: SxProps<Theme> | undefined = {
  position: "absolute",
  bottom: "-72px",
  left: "0",
  right: "0",
  color: "black",
  backgroundColor: "#ffffff",
  zIndex: "99",
};

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [tabIndex, setTabIndex] = useState<number | boolean>(false);
  const [selectedTabText, setSelectedTabText] = useState("Men");

  const handleTabChange = (
    event: React.SyntheticEvent<Element, Event>,
    index: number
  ) => {
    setSelectedTabText(event.currentTarget.textContent!);
  };

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
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          "& svg": { color: "black" },
          height: "70px",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
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

          <NavbarDesktopMenu
            handleTabChange={handleTabChange}
            tabIndex={tabIndex}
            selectedTabText={selectedTabText}
            setTabIndex={setTabIndex}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "17px",
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
              aria-label="account of current user"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {user ? <Person /> : <PersonOutlined />}
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpened(true)}
              sx={{ display: { md: "none" } }}
              data-testid="hamburgerMenu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <TabPanel value={tabIndex} index={0} sx={tabPanelStyles}>
        Item One
      </TabPanel>
      <TabPanel value={tabIndex} index={1} sx={tabPanelStyles}>
        Item Two
      </TabPanel>
      <TabPanel value={tabIndex} index={2} sx={tabPanelStyles}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export default Navbar;
