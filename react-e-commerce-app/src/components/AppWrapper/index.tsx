import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const pageStylesExceptHome: SxProps<Theme> = {
  maxWidth: "1536px",
  marginLeft: "auto",
  marginRight: "auto",
};

const AppWrapper = ({ children }: IProps) => {
  const { pathname } = useLocation();
  return (
    <Box sx={{ ...(pathname !== "/" && { ...pageStylesExceptHome }) }}>
      {children}
    </Box>
  );
};

export default AppWrapper;
