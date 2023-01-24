import { useEffect } from "react";

// Styles
import { Box, Stack } from "@mui/material";
import theme from "../../theme";

// Components
import {
  ProductBreadcrumbs,
  ProductList,
  ProductsDrawer,
} from "../../components";

// Hooks
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { setCategorySearchParameters } from "../../features/categorySearchParameters/categorySearchParametersSlice";

const Products = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const primary = pathname.substring(1);
    const primaryCategoryIds = ["men", "women", "kids"];
    const isPrimaryValid = primaryCategoryIds.some((id) => id === primary);

    if (!isPrimaryValid) {
      const randomIndex = Math.floor(Math.random() * 3);
      navigate({ pathname: `/${primaryCategoryIds[randomIndex]}` });
    }

    if (primary.length && isPrimaryValid) {
      let secondary = searchParams.get("secondary")?.split(",") || [];
      const tertiary =
        searchParams
          .get("tertiary")
          ?.split(",")
          .map((item) => {
            // ["ls", "sho"];
            const [tertiaryCategoryId, secondaryCategoryId] = item.split(":");
            return { [secondaryCategoryId]: tertiaryCategoryId };
          }) || [];

      dispatch(
        setCategorySearchParameters({
          primary,
          secondary,
          tertiary,
        })
      );
    }
  }, [searchParams, pathname]);
  return (
    <Box
      sx={{
        marginTop: { xs: "83px", md: "29px" },
        paddingLeft: {
          xs: theme.padding?.pagePaddingXS + "px",
          lg: theme.padding?.pagePaddingLG + "px",
          xl: theme.padding?.pagePaddingXL + "px",
        },
        paddingRight: {
          xs: theme.padding?.pagePaddingXS + "px",
          lg: theme.padding?.pagePaddingLG + "px",
          xl: theme.padding?.pagePaddingXL + "px",
        },
      }}
    >
      <ProductBreadcrumbs
        sx={{
          display: { xs: "none", md: "block" },
          marginBottom: "35px",
          width: "max-content",
        }}
      />
      <Stack direction="row" sx={{ columnGap: { md: "14px", lg: "34px" } }}>
        <ProductsDrawer />
        <ProductList />
      </Stack>
    </Box>
  );
};

export default Products;
