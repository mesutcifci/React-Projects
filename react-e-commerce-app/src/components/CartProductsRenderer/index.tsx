import { useEffect, useState } from "react";
import { IModifiedProduct } from "../../types/product";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { Avatar, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";

interface IProps {
  products: IModifiedProduct[];
}

const columns: GridColDef[] = [
  {
    field: "product",
    headerName: "Product",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      console.log(params.row);
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
          <Typography fontSize="16px">{params.row.product?.name}</Typography>
        </Stack>
      );
    },
    sortable: false,
  },
  { field: "color", headerName: "Color", width: 40, sortable: false },
  { field: "size", headerName: "Size", width: 40, sortable: false },
  { field: "price", headerName: "Price", width: 150, sortable: false },
];

const CartProductsRenderer = ({ products }: IProps) => {
  const [rows, setRows] = useState<GridRowsProp>();

  useEffect(() => {
    createGridRows();
  }, [products]);

  const createGridRows = () => {
    if (products.length) {
      const gridRows = products.map((product) => {
        return {
          id: product.id,
          product: { img: product.imageUrl, name: product.name },
          color: "White",
          size: "XL",
          amount: product.amount,
          price: product.price,
        };
      });

      setRows(gridRows);
    }
  };
  return (
    <DataGrid
      columns={columns}
      rows={rows || []}
      loading={!products.length}
      autoHeight
      disableColumnSelector
      disableColumnFilter
      disableColumnMenu
      disableSelectionOnClick
      disableVirtualization
      rowHeight={90}
      sx={{
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
    />
  );
};

export default CartProductsRenderer;
