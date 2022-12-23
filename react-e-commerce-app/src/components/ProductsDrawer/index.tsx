import { useState } from "react";

// material ui
import { Box, CssBaseline, Divider, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// components
import DrawerHeader from "./helperComponents/DrawerHeader";
import Drawer from "./helperComponents/Drawer";
import ProductTypeAccordion from "./helperComponents/ProductTypeAccordion";
import PriceAccordion from "./helperComponents/PriceAccordion";
import CollectionAccordion from "./helperComponents/CollectionAccordion";
import SizeAccordion from "./helperComponents/SizeAccordion";
import ColorAccordion from "./helperComponents/ColorAccordion";

const accordionStyles = {
  "&.MuiPaper-root::before": {
    display: { lg: "none !important" },
  },
  border: { lg: "1px solid #E6E6E6 !important" },
};

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

        <Stack rowGap="13px">
          <ProductTypeAccordion accordionStyles={accordionStyles} />
          <PriceAccordion accordionStyles={accordionStyles} />
          <CollectionAccordion accordionStyles={accordionStyles} />
          <SizeAccordion accordionStyles={accordionStyles} />
          <ColorAccordion accordionStyles={accordionStyles} />
        </Stack>
      </Drawer>
    </Box>
  );
};

export default ProductsDrawer;
