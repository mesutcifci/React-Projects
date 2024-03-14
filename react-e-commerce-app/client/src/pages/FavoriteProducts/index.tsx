import {
  Avatar,
  Box,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import theme from "../../theme";
import { FavoriteButton } from "../../components";
import { useEffect } from "react";
import {
  fetchAllProducts,
  setFavoriteProducts,
} from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const FavoriteProducts = () => {
  const {
    user: { user },
    products: { products, favoriteProducts },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products && user) {
      dispatch(setFavoriteProducts(user.favoriteProductIds));
    }
  }, [products, user]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [user]);

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
      <Box sx={{ minHeight: "400px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#c1c1c1",
                    fontSize: "0.875rem",
                    fontWeight: theme.fontWeight.regular,
                    minWidth: "18.75rem",
                  }}
                >
                  Product
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#c1c1c1",
                    fontSize: "0.875rem",
                    fontWeight: theme.fontWeight.regular,
                    minWidth: "9.375rem",
                  }}
                >
                  Color
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#c1c1c1",
                    fontSize: "0.875rem",
                    fontWeight: theme.fontWeight.regular,
                    minWidth: "9.375rem",
                  }}
                >
                  size
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#c1c1c1",
                    fontSize: "0.875rem",
                    fontWeight: theme.fontWeight.regular,
                    minWidth: "6.25rem",
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    minWidth: "6.25rem",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favoriteProducts?.map((product) => {
                const url = `/product-detail?id=${product.id}`;
                return (
                  <TableRow
                    key={product.id}
                    sx={{ "& td": { borderBottom: 0 } }}
                  >
                    <TableCell sx={{ minWidth: "18.75rem" }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        columnGap="1.5rem"
                      >
                        <Link href={url}>
                          <Avatar
                            src={product.imageUrl}
                            sx={{ width: "70px", height: "70px" }}
                            alt={product.name}
                          />
                        </Link>
                        <Link
                          href={url}
                          sx={{ color: "initial", textDecoration: "none" }}
                        >
                          <Typography
                            fontSize="1rem"
                            fontWeight={theme.fontWeight.semiBold}
                          >
                            {product.name}
                          </Typography>
                        </Link>
                      </Stack>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: theme.fontWeight.regular,
                        minWidth: "9.375rem",
                      }}
                    >
                      White
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: theme.fontWeight.regular,
                        minWidth: "9.375rem",
                      }}
                    >
                      XL
                    </TableCell>
                    <TableCell sx={{ minWidth: "6.25rem" }}>
                      <Typography
                        fontSize="1rem"
                        fontWeight={theme.fontWeight.semiBold}
                        textAlign="center"
                      >
                        {product.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <FavoriteButton
                        productId={product.id}
                        isFavorite={product.isFavorite}
                        position="static"
                        sx={{ marginLeft: "auto" }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default FavoriteProducts;
