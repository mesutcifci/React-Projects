import { Box, ClickAwayListener, SxProps, Theme } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number | boolean;
  sx?: SxProps<Theme> | undefined;
  handleCloseTabPanel: () => void;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, sx, handleCloseTabPanel } = props;

  return (
    <ClickAwayListener onClickAway={handleCloseTabPanel}>
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        sx={{
          ...sx,
          ...(value !== index && { display: "none" }),
        }}
        onMouseLeave={handleCloseTabPanel}
      >
        {value === index && <>{children}</>}
      </Box>
    </ClickAwayListener>
  );
};

export default TabPanel;
