import { useEffect, useState } from "react";
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
  SxProps,
  Theme,
  Stack,
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
import categories from "../../constants/categories.json";

const tabPanelStyles: SxProps<Theme> | undefined = {
  backgroundColor: "#ffffff",
  borderTop: "1px solid #E5E5E5",
  boxSizing: "border-box",
  height: "max-content",
  color: "black",
  columnGap: "30px",
  display: { xs: "none", md: "flex" },
  justifyContent: "space-evenly",
  padding: "33px 20% 36px 20%",
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [selectedTabIndex, setSelectedTabIndex] = useState<number | boolean>(
    false
  );
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

  const renderTabPanels = () => {
    return categories.map((category, index) => {
      const secondaryCategories = category.secondaryCategories;
      return (
        <TabPanel
          value={selectedTabIndex}
          index={index}
          sx={tabPanelStyles}
          key={category.name}
        >
          {secondaryCategories.map((secondaryCategory) => {
            const tertiaryCategories = secondaryCategory.tertiaryCategories;
            return (
              <Stack
                key={secondaryCategory.name}
                rowGap="15px"
                sx={{ minWidth: "140px" }}
              >
                <Typography
                  fontSize="14px"
                  fontWeight="600"
                  textTransform="uppercase"
                  sx={{ cursor: "pointer", "&:hover": { color: "#FBB03B" } }}
                >
                  {secondaryCategory.name}
                </Typography>
                {tertiaryCategories.map((tertiaryCategory) => (
                  <Typography
                    key={tertiaryCategory.name}
                    fontSize="12px"
                    fontWeight="400"
                    sx={{ cursor: "pointer", "&:hover": { color: "#FBB03B" } }}
                  >
                    {tertiaryCategory.name}
                  </Typography>
                ))}
              </Stack>
            );
          })}
        </TabPanel>
      );
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: {
          xs: "relative",
          lg: `${location.pathname === "/" ? "absolute" : "relative"}`,
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
            xs: "white",
            lg: `${selectedTabIndex === false && "transparent"}`,
          },
          "& svg": {
            color: {
              xs: "#000000",
              lg: `${selectedTabIndex === false && "#ffffff"}`,
            },
          },
          height: "70px",
          paddingLeft: { lg: "160px" },
          paddingRight: { lg: "160px" },
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
            <Typography
              sx={{
                color: {
                  xs: "#000000",
                  lg: `${selectedTabIndex === false && "#ffffff"}`,
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
            handleTabChange={handleTabChange}
            selectedTabIndex={selectedTabIndex}
            selectedTabText={selectedTabText}
            setSelectedTabIndex={setSelectedTabIndex}
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
              sx={{ display: { lg: "none" } }}
              data-testid="hamburgerMenu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderTabPanels()}
    </Box>
  );
};

export default Navbar;
