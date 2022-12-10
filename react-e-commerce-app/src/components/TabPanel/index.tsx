import { Box, SxProps, Theme, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number | boolean;
  sx?: SxProps<Theme> | undefined;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;
