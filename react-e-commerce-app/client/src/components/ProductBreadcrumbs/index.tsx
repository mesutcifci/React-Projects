// Styles
import { Breadcrumbs, Link, SxProps } from "@mui/material";
import { HomeOutlined as HomeIcon } from "@mui/icons-material";
import theme from "../../theme";

interface IProps {
  sx?: SxProps;
}

const ProductBreadcrumbs = ({ sx }: IProps) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ ...sx }}>
      <Link
        href="/"
        color="#B2B2B2"
        sx={{ display: "flex", alignItems: "center" }}
        fontSize="0.81rem"
        fontWeight={theme.fontWeight.regular}
      >
        <HomeIcon color="inherit" sx={{ height: "1.5rem" }} />
      </Link>
      <Link
        underline="hover"
        color="#B2B2B2"
        href=""
        fontSize="0.81rem"
        fontWeight={theme.fontWeight.regular}
      >
        Primary
      </Link>
      <Link
        underline="hover"
        color="#B2B2B2"
        href=""
        fontSize="0.81rem"
        fontWeight={theme.fontWeight.regular}
      >
        Secondary
      </Link>
      <Link
        underline="hover"
        color="#000000"
        href=""
        fontSize="0.81rem"
        fontWeight={theme.fontWeight.regular}
      >
        Tertiary
      </Link>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
