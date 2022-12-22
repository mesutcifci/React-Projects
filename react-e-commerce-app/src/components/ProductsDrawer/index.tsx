import { useState } from "react";

// material ui
import { Box, CssBaseline, Divider, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// components
import DrawerHeader from "./helperComponents/DrawerHeader";
import Drawer from "./helperComponents/Drawer";
import ProductTypeAccordion from "./helperComponents/ProductTypeAccordion";
import PriceAccordion from "./helperComponents/PriceAccordion";

const ProductsDrawer = () => {
  const [open, setOpen] = useState(false);

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

        <ProductTypeAccordion />
        <PriceAccordion />
      </Drawer>
    </Box>
  );
};

export default ProductsDrawer;
