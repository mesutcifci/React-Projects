import { Box, Tab, Tabs } from "@mui/material";
import categories from "../../constants/categories.json";

interface IProps {
  tabIndex: number | boolean;
  handleTabChange: (
    event: React.SyntheticEvent<Element, Event>,
    index: number
  ) => void;
  selectedTabText: string;
  setTabIndex: React.Dispatch<React.SetStateAction<number | boolean>>;
}

const NavbarDesktopMenu = ({
  tabIndex,
  handleTabChange,
  selectedTabText,
  setTabIndex,
}: IProps) => {
  const handleClickTab = (newIndex: number) => {
    if (newIndex === tabIndex) {
      setTabIndex(false);
    } else {
      setTabIndex(newIndex);
    }
  };

  return (
    <Box
      sx={{
        display: { xs: "none", md: "initial" },
        position: "relative",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        {...(tabIndex !== false && {
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
            label={category.displayName}
            onClick={() => handleClickTab(index)}
            sx={{
              fontSize: "14px !important",
              fontWeight: "500 !important",
              color: "rgba(0,0,0,.7)",
              textTransform: "capitalize",
              "&.Mui-selected": {
                color: "#000000",
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
