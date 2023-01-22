import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import { Box, Divider, Drawer, List, ListItem, Stack } from "@mui/material";
import { ArrowBack, Close } from "@mui/icons-material";

// Data
import categories from "../../constants/categories.json";
import {
  ICategory,
  ISecondaryCategory,
  ITertiaryCategory,
} from "../../types/categories";

interface IProps {
  isDrawerOpened: boolean;
  setIsDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarMobileMenu = ({ isDrawerOpened, setIsDrawerOpened }: IProps) => {
  const navigate = useNavigate();
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] =
    useState<ICategory>();
  const [selectedSecondaryCategory, setSelectedSelectedSecondaryCategory] =
    useState<ISecondaryCategory>();
  const [shownCategory, setShownCategory] = useState("primary");

  const handleCloseDrawer = () => {
    setIsDrawerOpened(false);
    setShownCategory("primary");
  };

  const setCategoryObject = () => {
    let categoryObject:
      | ICategory[]
      | ISecondaryCategory[]
      | ITertiaryCategory[] = [];
    switch (shownCategory) {
      case "primary":
        categoryObject = categories;
        break;

      case "secondary":
        categoryObject = selectedPrimaryCategory?.secondaryCategories || [];
        break;

      case "tertiary":
        categoryObject = selectedSecondaryCategory?.tertiaryCategories || [];
        break;
    }
    return categoryObject;
  };

  const renderCategories = () => {
    const categoryObject = setCategoryObject();
    return categoryObject?.map((category) => {
      return (
        <Box key={category.name}>
          <ListItem
            sx={{
              cursor: "pointer",
              fontSize: "30px",
              color: { xs: "rgba(0, 0, 0, 0.7)", lg: "#ffffff" },
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={() => {
              if (shownCategory === "primary") {
                setSelectedPrimaryCategory(category as ICategory);
                setShownCategory("secondary");
              } else if (shownCategory === "secondary") {
                setSelectedSelectedSecondaryCategory(
                  category as ISecondaryCategory
                );
                setShownCategory("tertiary");
              } else {
                handleClickTertiaryCategory(category as ITertiaryCategory);
              }
            }}
          >
            {category.name}
          </ListItem>
          <Divider />
        </Box>
      );
    });
  };

  const handleClickArrowBackIcon = () => {
    switch (shownCategory) {
      case "secondary":
        setShownCategory("primary");
        break;
      case "tertiary":
        setShownCategory("secondary");
        break;
    }
  };

  const handleClickTertiaryCategory = (category: ITertiaryCategory) => {
    const parameterString = `?secondary=${
      selectedSecondaryCategory!.id
    }&tertiary=${category.id}:${selectedSecondaryCategory!.id}`;

    handleCloseDrawer();

    navigate({
      pathname: `/${selectedPrimaryCategory!.id}`,
      search: parameterString,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpened}
      onClose={handleCloseDrawer}
      sx={{
        display: { lg: "none" },
        "& .MuiDrawer-paperAnchorRight": { width: "100%", maxWidth: "300px" },
        padding: "20px",
      }}
      data-testid="mobileMenu"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
        {shownCategory !== "primary" && (
          <ArrowBack
            sx={{ cursor: "pointer" }}
            onClick={handleClickArrowBackIcon}
          />
        )}
        <Close
          sx={{ cursor: "pointer", marginLeft: "auto" }}
          onClick={handleCloseDrawer}
        />
      </Stack>
      <List sx={{ marginTop: "30px" }}>{renderCategories()}</List>
    </Drawer>
  );
};

export default NavbarMobileMenu;
