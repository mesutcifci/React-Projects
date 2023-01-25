import {
  Avatar,
  Box,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import theme from "../../theme";
import { FavoriteButton } from "../../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import {
  fetchAllProducts,
  setFavoriteProducts,
} from "../../features/products/productsSlice";

const FavoriteProducts = () => {
  const [rows, setRows] = useState<GridRowsProp>();
  const {
    user: { user },
    currentUser,
    products: { products, favoriteProducts },
  } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products && user) {
      dispatch(setFavoriteProducts(user.favoriteProductIds));
    }
  }, [products, user]);

  useEffect(() => {
    const productIds = user?.userProductsInCart.map((product) => product.id);
    if (productIds) {
      dispatch(fetchAllProducts(productIds));
    }
  }, [user]);

  useEffect(() => {
    createGridRows();
  }, [favoriteProducts]);

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
      getActions: (params: GridRowParams) => {
        const productId = params.row.id;
        const isFavorite = params.row.isFavorite;
        return [
          <GridActionsCellItem
            icon={
              <FavoriteButton
                productId={productId}
                isFavorite={isFavorite}
                position="static"
              />
            }
            label="Delete"
          />,
        ];
      },
    },
  ];

  const createGridRows = () => {
    if (favoriteProducts?.length) {
      const gridRows = favoriteProducts.map((product) => {
        return {
          id: product.id,
          product: { img: product.imageUrl, name: product.name },
          color: "White",
          size: "XL",
          stockAmount: product.stockAmount,
          price: `$${product.price}`,
          isFavorite: product.isFavorite,
        };
      });

      setRows(gridRows);
    } else {
      setRows(undefined);
    }
  };
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
        <DataGrid
          columns={columns}
          rows={rows || []}
          loading={!favoriteProducts?.length}
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
    </Box>
  );
};

export default FavoriteProducts;
