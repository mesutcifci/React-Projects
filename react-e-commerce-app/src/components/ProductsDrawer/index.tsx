import { useEffect, useState } from "react";

// material ui
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { ChevronLeft, ChevronRight, ExpandMore } from "@mui/icons-material";

// hooks
import useGetMappedCategories from "../../hooks/useGetMappedCategories";
import useGetSearchParameters from "../../hooks/useGetSearchParameters";

// components
import DrawerHeader from "./helperComponents/DrawerHeader";
import Drawer from "./helperComponents/Drawer";

const ProductsDrawer = () => {
  const [open, setOpen] = useState(false);
  const { mapCategoriesWithSearchParameters, mappedCategories } =
    useGetMappedCategories();
  const { parameters } = useGetSearchParameters();

  useEffect(() => {
    mapCategoriesWithSearchParameters(parameters);
  }, [parameters]);

  useEffect(() => {
    console.log(mappedCategories);
  }, [mappedCategories]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: { lg: "none" },
            ...(!open && {
              minHeight: "50px !important",
              padding: "0",
              width: "50px",
              "& button": { width: "100%", height: "100%", padding: "0" },
            }),
          }}
        >
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRight />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
      </Drawer>
    </Box>
  );
};

export default ProductsDrawer;
