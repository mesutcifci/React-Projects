import { Box, Tab, Tabs } from "@mui/material";
import categories from "../../constants/categories.json";

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
  const handleClickTab = (newIndex: number) => {
    if (newIndex === selectedTabIndex) {
      setSelectedTabIndex(false);
    } else {
      setSelectedTabIndex(newIndex);
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
            label={category.displayName}
            onClick={() => handleClickTab(index)}
            sx={{
              fontSize: "14px !important",
              fontWeight: "500 !important",
              color: { xs: "rgba(0,0,0,.7)", lg: "#ffffff" },
              textTransform: "capitalize",
              "&.Mui-selected": {
                color: { xs: "#000000", lg: "#ffffff" },
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
