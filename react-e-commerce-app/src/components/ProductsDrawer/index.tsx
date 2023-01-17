import { useState } from "react";

// Styles
import { Box, CssBaseline, Divider, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// Components
import {
  CollectionAccordion,
  ColorAccordion,
  Drawer,
  DrawerHeader,
  PriceAccordion,
  ProductBreadcrumbs,
  ProductTypeAccordion,
  SizeAccordion,
} from "../";

const accordionStyles = {
  "&.MuiPaper-root::before": {
    display: { md: "none !important" },
  },
  border: { md: "1px solid #E6E6E6 !important" },
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
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            ...(!open && {
              minHeight: "50px !important",
              padding: "0",
              width: "50px",
              "& button": { width: "100%", height: "100%", padding: "0" },
            }),
          }}
        >
          {open ? (
            <>
              <ProductBreadcrumbs />
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeft />
              </IconButton>
            </>
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
