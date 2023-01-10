import { useEffect, useState } from "react";
import { IModifiedProduct } from "../../types/product";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { Avatar, Box, LinearProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Counter from "../Counter";

interface IProps {
  modifiedProducts: IModifiedProduct[];
  setProducts: React.Dispatch<
    React.SetStateAction<IModifiedProduct[] | undefined>
  >;
}

const CartProductsRenderer = ({ modifiedProducts, setProducts }: IProps) => {
  const [rows, setRows] = useState<GridRowsProp>();

  const handleClickAmountButtons = (
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
    setProducts(copyProducts);
  };

  const columns: GridColDef[] = [
    {
      field: "product",
      headerName: "Product",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            fontWeight="600"
            columnGap="24px"
          >
            <Avatar
              src={params.row.product?.img}
              sx={{ width: "70px", height: "70px" }}
              alt={params.row?.product?.name}
            />
            <Typography fontSize="16px" fontWeight="500">
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
        <Typography fontSize="16px" fontWeight="500">
          {params.row.price}
        </Typography>
      ),
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
