import { useState } from "react";

// material ui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight, ExpandMore } from "@mui/icons-material";

// components
import DrawerHeader from "./helperComponents/DrawerHeader";
import Drawer from "./helperComponents/Drawer";
import CategoryRenderer from "./helperComponents/CategoryRenderer";

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

        {/* PRODUCT TYPE */}
        <Accordion sx={{ padding: "0" }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
              PRODUCT TYPE
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0" }}>
            <CategoryRenderer />
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </Box>
  );
};

export default ProductsDrawer;
