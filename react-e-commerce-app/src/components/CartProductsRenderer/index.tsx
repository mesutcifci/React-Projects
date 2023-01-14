import { useEffect, useState } from "react";
import { IModifiedProduct } from "../../types/product";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { Avatar, Box, LinearProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Counter from "../Counter";
import theme from "../../theme";
import { Close as CloseIcon } from "@mui/icons-material";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useUser } from "../../hooks";

interface IProps {
  modifiedProducts: IModifiedProduct[];
  setProducts: React.Dispatch<
    React.SetStateAction<IModifiedProduct[] | undefined>
  >;
}

const CartProductsRenderer = ({ modifiedProducts, setProducts }: IProps) => {
  const [rows, setRows] = useState<GridRowsProp>();
  const { currentUser, addProductToCart } = useUser();

  const handleClickAmountButtons = async (
    productId: string,
    operation: "increase" | "decrease"
  ) => {
    const copyProducts: IModifiedProduct[] = JSON.parse(
      JSON.stringify(modifiedProducts)
    );
    const selectedProduct = copyProducts.find(
      (copyProduct) => copyProduct.id === productId
    );
    if (selectedProduct && operation === "increase") {
      selectedProduct.amount += +1;
    } else if (selectedProduct && operation === "decrease") {
      selectedProduct.amount -= 1;
    }

    if (currentUser && selectedProduct) {
      await addProductToCart(productId, selectedProduct.amount);
    }

    // setProducts(copyProducts);
  };

  const handleClickRemoveProductButton = async (params: GridRowParams) => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        productsInCart: arrayRemove({
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
        return (
          <Stack direction="row" alignItems="center" columnGap="24px">
            <Avatar
              src={params.row.product?.img}
              sx={{ width: "70px", height: "70px" }}
              alt={params.row?.product?.name}
            />
            <Typography fontSize="16px" fontWeight={theme.fontWeight.semiBold}>
              {params.row.product?.name}
            </Typography>
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

  useEffect(() => {
    createGridRows();
  }, [modifiedProducts]);

  const createGridRows = () => {
    if (modifiedProducts.length) {
      const gridRows = modifiedProducts.map((product) => {
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
    }
  };
  return (
    <Box sx={{ minHeight: "400px" }}>
      <DataGrid
        columns={columns}
        rows={rows || []}
        loading={!modifiedProducts.length}
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
