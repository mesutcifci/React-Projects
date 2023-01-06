import { Box, Tab, Tabs } from "@mui/material";
import categories from "../../constants/categories.json";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  selectedTabIndex: number | boolean;
  selectedTabText: string;
  setSelectedTabText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTabIndex: React.Dispatch<React.SetStateAction<number | boolean>>;
}

const NavbarDesktopMenu = ({
  selectedTabIndex,
  selectedTabText,
  setSelectedTabText,
  setSelectedTabIndex,
}: IProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleHoverTab = (newIndex: number, tabText: string) => {
    setSelectedTabText(tabText);
    setSelectedTabIndex(newIndex);
  };

  const handleClickPrimaryCategory = (categoryName: string) => {
    navigate({ pathname: `/${categoryName.toLowerCase()}` });
    setSelectedTabIndex(false);
  };

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "initial" },
        position: "relative",
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
              fontWeight: "500 !important",
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
    </Box>
  );
};

export default NavbarDesktopMenu;
