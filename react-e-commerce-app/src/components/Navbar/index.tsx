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
  Badge,
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
import { ISecondaryCategory, ITertiaryCategory } from "../../types/categories";
import { useUser } from "../../hooks";
import theme from "../../theme";

const tabPanelStyles: SxProps<Theme> = {
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
  const { pathname } = useLocation();

  const { user, currentUser } = useUser();

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [selectedTabIndex, setSelectedTabIndex] = useState<number | boolean>(
    false
  );
  const [selectedTabText, setSelectedTabText] = useState("Men");

  const handleClickProfileIcon = (event: React.MouseEvent<HTMLElement>) => {
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

  const handleClickShoppingCart = () => {
    navigate({ pathname: "/cart" });
  };

  const handleClickSecondaryCategory = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    secondaryCategory: ISecondaryCategory
  ) => {
    let parameterString = `?secondary=${secondaryCategory.id}&tertiary=`;

    secondaryCategory.tertiaryCategories.forEach((tertiaryCategory, index) => {
      parameterString += `${tertiaryCategory.id}:${secondaryCategory.id}`;
      if (index + 1 < secondaryCategory.tertiaryCategories.length) {
        parameterString += ",";
      }
    });

    navigate({
      pathname: `/${selectedTabText.toLowerCase()}`,
      search: parameterString,
    });
  };

  const handleClickTertiaryCategory = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    secondaryCategoryId: string,
    tertiaryCategory: ITertiaryCategory
  ) => {
    event.stopPropagation();
    let parameterString = `?secondary=${secondaryCategoryId}&tertiary=${tertiaryCategory.id}:${secondaryCategoryId}`;
    navigate({
      pathname: `/${selectedTabText.toLowerCase()}`,
      search: parameterString,
    });
  };

  const renderTabPanels = () => {
    return categories.map((category, index) => {
      const secondaryCategories = category.secondaryCategories;
      return (
        <TabPanel
          value={selectedTabIndex}
          index={index}
          sx={{
            ...tabPanelStyles,
            ...(pathname !== "/" && {
              borderBottom: "1px solid #e5e5e5",
              position: "absolute",
              left: 0,
              right: 0,
            }),
          }}
          key={category.name}
          handleCloseTabPanel={() => setSelectedTabIndex(false)}
        >
          {secondaryCategories.map((secondaryCategory) => {
            const tertiaryCategories = secondaryCategory.tertiaryCategories;
            return (
              <Stack
                key={secondaryCategory.name}
                rowGap="15px"
                sx={{ minWidth: "140px" }}
                onClick={(event) =>
                  handleClickSecondaryCategory(event, secondaryCategory)
                }
              >
                <Typography
                  fontSize="14px"
                  fontWeight={theme.fontWeight.semiBold}
                  textTransform="uppercase"
                  sx={{ cursor: "pointer", "&:hover": { color: "#FBB03B" } }}
                >
                  {secondaryCategory.name}
                </Typography>
                {tertiaryCategories.map((tertiaryCategory) => (
                  <Typography
                    key={tertiaryCategory.name}
                    fontSize="12px"
                    fontWeight={theme.fontWeight.regular}
                    sx={{ cursor: "pointer", "&:hover": { color: "#FBB03B" } }}
                    onClick={(event) =>
                      handleClickTertiaryCategory(
                        event,
                        secondaryCategory.id,
                        tertiaryCategory
                      )
                    }
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
            selectedTabText={selectedTabText}
            setSelectedTabText={setSelectedTabText}
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
              {user?.productsInCart.length ? (
                <Badge badgeContent={user.productsInCart.length}>
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
      {renderTabPanels()}
    </Box>
  );
};

export default Navbar;
