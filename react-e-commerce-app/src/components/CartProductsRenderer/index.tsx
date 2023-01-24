import { useEffect, useState } from "react";

// Styles
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  LinearProgress,
  Typography,
  Stack,
  Link,
} from "@mui/material";
import theme from "../../theme";
import { Close as CloseIcon } from "@mui/icons-material";

// Data
import { IModifiedProduct } from "../../types/product";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import Counter from "../Counter";

// Hooks
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { fetchAllProducts } from "../../features/products/productsSlice";
import { setCartProductsAndTotalCost } from "../../features/cartProducts/cartProductsSlice";
import { addUserProductsInCart } from "../../helpers/addUserProductsInCart";

const CartProductsRenderer = () => {
  const [rows, setRows] = useState<GridRowsProp>();
  const {
    user: { user },
    currentUser,
    cartProducts,
    products: { productsByIds },
  } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productsByIds && user) {
      dispatch(
        setCartProductsAndTotalCost({
          products: productsByIds,
          userProductsInCart: user.userProductsInCart,
        })
      );
    }
  }, [productsByIds, user]);

  useEffect(() => {
    const productIds = user?.userProductsInCart.map((product) => product.id);
    if (productIds) {
      dispatch(fetchAllProducts(productIds));
    }
  }, [user]);

  useEffect(() => {
    createGridRows();
  }, [cartProducts.products]);

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

  const handleClickRemoveProductButton = async (params: GridRowParams) => {
    if (currentUser.currentUser) {
      const docRef = doc(db, "users", currentUser.currentUser.uid);
      await updateDoc(docRef, {
        userProductsInCart: arrayRemove({
          id: params.row.id,
          amount: params.row.amount,
        }),
      });
    }
  };

  const columns: GridColumns = [
    {
      field: "product",
      headerName: "Product",
      renderCell: (params: GridRenderCellParams) => {
        const url = `/product-detail?id=${params.row.id}`;
        return (
          <Stack direction="row" alignItems="center" columnGap="24px">
            <Link href={url}>
              <Avatar
                src={params.row.product?.img}
                sx={{ width: "70px", height: "70px" }}
                alt={params.row?.product?.name}
              />
            </Link>
            <Link href={url} sx={{ color: "initial", textDecoration: "none" }}>
              <Typography
                fontSize="16px"
                fontWeight={theme.fontWeight.semiBold}
              >
                {params.row.product?.name}
              </Typography>
            </Link>
          </Stack>
        );
      },
      sortable: false,
      minWidth: 300,
      flex: 1,
    },
    {
      field: "color",
      headerName: "Color",
      minWidth: 150,
      sortable: false,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "size",
      headerName: "Size",
      minWidth: 150,
      sortable: false,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 200,
      sortable: false,
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Counter
            maxValue={params.row.stockAmount}
            counterValue={params.row.amount}
            handleClickDecreaseButton={() =>
              handleClickAmountButtons(params.row.id, "decrease")
            }
            handleClickIncreaseButton={() =>
              handleClickAmountButtons(params.row.id, "increase")
            }
          />
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      sortable: false,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography fontSize="14px" fontWeight={theme.fontWeight.regular}>
          {params.row.price}
        </Typography>
      ),
    },
    {
      field: "removeProduct",
      type: "actions",
      align: "right",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          onClick={() => handleClickRemoveProductButton(params)}
          icon={<CloseIcon sx={{ color: "#000000" }} />}
          label="Delete"
        />,
      ],
    },
  ];

  const createGridRows = () => {
    if (cartProducts.products?.length) {
      const gridRows = cartProducts.products.map((product) => {
        return {
          id: product.id,
          product: { img: product.imageUrl, name: product.name },
          color: "White",
          size: "XL",
          amount: product.amount,
          stockAmount: product.stockAmount,
          price: `$${product.price}`,
        };
      });

      setRows(gridRows);
    } else {
      setRows(undefined);
    }
  };
  return (
    <Box sx={{ minHeight: "400px" }}>
      <DataGrid
        columns={columns}
        rows={rows || []}
        loading={!cartProducts.products?.length}
        autoHeight
        disableColumnSelector
        disableColumnFilter
        disableColumnMenu
        disableSelectionOnClick
        disableVirtualization
        hideFooter
        rowHeight={90}
        sx={{
          border: "none",
          "& .MuiDataGrid-columnSeparator": { display: "none" },
          "& .MuiDataGrid-columnHeaders": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#C1C1C1",
            fontWeight: 400,
            fontSize: "14px",
          },
          "& .MuiDataGrid-row:hover": {
            background: "initial",
          },
          "& .MuiDataGrid-cell": { border: "none" },
        }}
        components={{
          LoadingOverlay: LinearProgress,
        }}
      />
    </Box>
  );
};

export default CartProductsRenderer;
