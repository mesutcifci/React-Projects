import { Box, Tab, Tabs } from "@mui/material";
import categories from "../../constants/categories.json";
import { useLocation } from "react-router-dom";

interface IProps {
  selectedTabIndex: number | boolean;
  handleTabChange: (
    event: React.SyntheticEvent<Element, Event>,
    index: number
  ) => void;
  selectedTabText: string;
  setSelectedTabIndex: React.Dispatch<React.SetStateAction<number | boolean>>;
}

const NavbarDesktopMenu = ({
  selectedTabIndex,
  handleTabChange,
  selectedTabText,
  setSelectedTabIndex,
}: IProps) => {
  const { pathname } = useLocation();

  const handleHoverTab = (newIndex: number) => {
    setSelectedTabIndex(newIndex);
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
        onChange={handleTabChange}
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
            onMouseOver={() => handleHoverTab(index)}
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
