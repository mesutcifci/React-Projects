import { Box, SxProps, Theme } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number | boolean;
  sx?: SxProps<Theme> | undefined;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, sx } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{
        ...sx,
        ...(value !== index && { display: "none" }),
      }}
    >
      {value === index && <>{children}</>}
    </Box>
  );
};

export default TabPanel;
