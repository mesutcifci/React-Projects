import { Box, Drawer, List, ListItem, Stack } from "@mui/material";
import { ArrowBack, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import categories from "../../constants/categories.json";

interface ICategory {
  name: string;
  displayName: string;
  secondaryCategories: ISecondaryCategory[];
}

interface ISecondaryCategory {
  name: string;
  displayName: string;
  tertiaryCategories: ITertiaryCategory[];
}

interface ITertiaryCategory {
  name: string;
  displayName: string;
}

interface IProps {
  isDrawerOpened: boolean;
  setIsDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarMobileMenu = ({ isDrawerOpened, setIsDrawerOpened }: IProps) => {
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] =
    useState<ICategory>();
  const [selectedSecondaryCategory, setSelectedSelectedSecondaryCategory] =
    useState<ISecondaryCategory>();
  const [shownCategory, setShownCategory] = useState("primary");

  useEffect(() => {
    if (selectedPrimaryCategory) {
      setShownCategory("secondary");
    }
  }, [selectedPrimaryCategory]);

  useEffect(() => {
    if (selectedSecondaryCategory) {
      setShownCategory("tertiary");
    }
  }, [selectedSecondaryCategory]);

  const setCategoryObject = () => {
    let categoryObject:
      | ICategory[]
      | ISecondaryCategory[]
      | ITertiaryCategory[] = [];
    switch (shownCategory) {
      case "primary":
        return (categoryObject = categories || []);

      case "secondary":
        return (categoryObject =
          selectedPrimaryCategory?.secondaryCategories || []);

      case "tertiary":
        return (categoryObject =
          selectedSecondaryCategory?.tertiaryCategories || []);
    }
  };

  const renderCategories = () => {
    const categoryObject = setCategoryObject();
    return categoryObject?.map((category) => {
      return (
        <ListItem
          key={category.name}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            if (shownCategory === "primary") {
              setSelectedPrimaryCategory(category as ICategory);
            } else if (shownCategory === "secondary") {
              setSelectedSelectedSecondaryCategory(
                category as ISecondaryCategory
              );
            } else {
              console.log(category);
            }
          }}
        >
          {category.displayName}
        </ListItem>
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

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpened}
      onClose={() => setIsDrawerOpened(false)}
      sx={{
        display: { md: "none" },
        "& .MuiDrawer-paperAnchorRight": { width: "100%", maxWidth: "300px" },
        padding: "20px",
      }}
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
          onClick={() => setIsDrawerOpened(false)}
        />
      </Stack>
      <List>{renderCategories()}</List>
    </Drawer>
  );
};

export default NavbarMobileMenu;
