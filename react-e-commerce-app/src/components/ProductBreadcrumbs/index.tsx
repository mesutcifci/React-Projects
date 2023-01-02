import { Breadcrumbs, Link, Stack, SxProps } from "@mui/material";
import { HomeOutlined as HomeIcon } from "@mui/icons-material";

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
        fontSize="13px"
      >
        <HomeIcon color="inherit" sx={{ height: "24px" }} />
      </Link>
      <Link underline="hover" color="#B2B2B2" href="" fontSize="13px">
        Primary
      </Link>
      <Link underline="hover" color="#B2B2B2" href="" fontSize="13px">
        Secondary
      </Link>
      <Link underline="hover" color="#000000" href="" fontSize="13px">
        Tertiary
      </Link>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
