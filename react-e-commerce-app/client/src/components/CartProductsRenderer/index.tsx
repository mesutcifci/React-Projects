import { useEffect } from "react";

// Styles
import {
  Avatar,
  Box,
  Typography,
  Stack,
  Link,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import theme from "../../theme";
import { Close as CloseIcon } from "@mui/icons-material";

// Data
import { IModifiedProduct } from "../../types/product";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  fetchAllProducts,
  setCartProductsAndTotalCost,
} from "../../features/products/productsSlice";

// Components
import Counter from "../Counter";

import { addUserProductsInCart } from "../../helpers/addUserProductsInCart";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const CartProductsRenderer = () => {
  const {
    user: { user },
    currentUser,
    products: { products, cartProducts },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setCartProductsAndTotalCost(user.userProductsInCart));
    }
  }, [user, products]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [user]);

  const handleClickAmountButtons = async (
    productId: string,
    operation: "increase" | "decrease"
  ) => {
    const copyProducts: IModifiedProduct[] = JSON.parse(
      JSON.stringify(cartProducts.products)
    );
    const selectedProduct = copyProducts.find(
      (copyProduct) => copyProduct.id === productId
    );
    if (selectedProduct && operation === "increase") {
      selectedProduct.amount += +1;
    } else if (selectedProduct && operation === "decrease") {
      selectedProduct.amount -= 1;
    }

    if (currentUser.currentUser && selectedProduct) {
      addUserProductsInCart({
        productId: selectedProduct.id,
        amount: selectedProduct.amount,
        userId: currentUser.currentUser.uid,
      });
    }
  };

  const handleClickRemoveProductButton = async (id: string, amount: number) => {
    if (currentUser.currentUser) {
      const docRef = doc(db, "users", currentUser.currentUser.uid);
      await updateDoc(docRef, {
        userProductsInCart: arrayRemove({
          id,
          amount,
        }),
      });
    }
  };

  return (
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
                Size
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#c1c1c1",
                  fontSize: "0.875rem",
                  fontWeight: theme.fontWeight.regular,
                  minWidth: "200px",
                }}
              >
                Amount
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
            {cartProducts.products?.map((product) => {
              const url = `/product-detail?id=${product.id}`;
              return (
                <TableRow key={product.id} sx={{ "& td": { borderBottom: 0 } }}>
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
                  <TableCell sx={{ minWidth: "200px" }}>
                    <Counter
                      sx={{ marginLeft: "auto", marginRight: "auto" }}
                      maxValue={product.stockAmount}
                      counterValue={product.amount}
                      handleClickDecreaseButton={() =>
                        handleClickAmountButtons(product.id, "decrease")
                      }
                      handleClickIncreaseButton={() =>
                        handleClickAmountButtons(product.id, "increase")
                      }
                    />
                  </TableCell>
                  <TableCell sx={{ minWidth: "6.25rem" }}>
                    <Typography
                      fontSize="1rem"
                      fontWeight={theme.fontWeight.semiBold}
                      textAlign="center"
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: "6.25rem" }}>
                    <CloseIcon
                      sx={{ color: "#000000", cursor: "pointer" }}
                      onClick={() =>
                        handleClickRemoveProductButton(
                          product.id,
                          product.amount
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartProductsRenderer;
