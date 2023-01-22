import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// Styles
import {
  Box,
  Stack,
  SxProps,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import theme from "../../theme";

// Data
import categories from "../../constants/categories.json";
import { ISecondaryCategory, ITertiaryCategory } from "../../types/categories";

// Components
import TabPanel from "../TabPanel";

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
  position: "absolute",
  left: 0,
  right: 0,
};

interface IProps {
  selectedTabIndex: number | boolean;
  setSelectedTabIndex: React.Dispatch<React.SetStateAction<number | boolean>>;
}

const NavbarDesktopMenu = ({
  selectedTabIndex,
  setSelectedTabIndex,
}: IProps) => {
  const [selectedTabText, setSelectedTabText] = useState("Men");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let timer: NodeJS.Timeout;

  const handleHoverTab = (newIndex: number, tabText: string) => {
    clearTimeout(timer);
    if (selectedTabIndex === false) {
      timer = setTimeout(() => {
        setSelectedTabText(tabText);
        setSelectedTabIndex(newIndex);
      }, 300);
    } else {
      setSelectedTabText(tabText);
      setSelectedTabIndex(newIndex);
    }
  };

  const handleClickPrimaryCategory = (categoryName: string) => {
    navigate({ pathname: `/${categoryName.toLowerCase()}` });
    setSelectedTabIndex(false);
    clearTimeout(timer);
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
            }),
          }}
          key={category.name}
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

  const handleMouseLeave = () => {
    setSelectedTabIndex(false);
    clearTimeout(timer);
  };

  return (
    <Box
      onMouseLeave={handleMouseLeave}
      sx={{
        display: { xs: "none", lg: "initial" },
        height: "100%",
      }}
    >
      <Tabs
        value={selectedTabIndex}
        {...(selectedTabIndex !== false && {
          TabIndicatorProps: {
            children: (
              <span className="MuiTabs-indicatorSpan">{selectedTabText}</span>
            ),
          },
        })}
        sx={{
          "&.MuiTabs-root": { alignItems: "center" },
          "& .MuiTabs-indicator": {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
          },
          "& .MuiTabs-indicatorSpan": {
            width: "max-content",
            paddingInline: "5px",
            backgroundColor: "#FBB03B",
          },
          "& .MuiTabs-scroller": {
            height: " max-content",
          },
          height: "100%",
        }}
      >
        {categories.map((category, index) => (
          <Tab
            disableRipple
            key={category.name}
            id={`navbar-tab-${category.name}`}
            label={category.name}
            onMouseOver={() => handleHoverTab(index, category.name)}
            onClick={() => handleClickPrimaryCategory(category.name)}
            sx={{
              fontSize: "14px !important",
              fontWeight: theme.fontWeight.semiBold,
              color: {
                xs: "rgba(0,0,0,.7)",
                lg: `${
                  selectedTabIndex === false && pathname === "/" && "#ffffff"
                }`,
              },
              textTransform: "capitalize",
              "&.Mui-selected": {
                color: {
                  xs: "#000000",
                  lg: `${selectedTabIndex === false && "#ffffff"}`,
                },
              },
              "&.Mui-focusVisible": {
                backgroundColor: "rgba(100, 95, 228, 0.32)",
              },
            }}
          />
        ))}
      </Tabs>
      {renderTabPanels()}
    </Box>
  );
};

export default NavbarDesktopMenu;
