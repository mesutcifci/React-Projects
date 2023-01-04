import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useFetchProduct } from "../../hooks";
import { ColorPalette, FavoriteButton, Loading } from "../../components";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ChevronRight,
} from "@mui/icons-material";
import { useState } from "react";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, product } = useFetchProduct(searchParams.get("id") || "");
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<"description" | "reviews">(
    "reviews"
  );

  const renderProductDescription = () => {
    return <Stack></Stack>;
  };

  const renderProductReviews = () => {
    return <Stack></Stack>;
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Stack sx={{ minHeight: "500px" }}>
        {product ? (
          <>
            {/* PRODUCT IMAGE */}
            <Box
              sx={{
                position: "relative",
                maxHeight: "375px",
                width: "100%",
                "& .product-detail-image": { maxWidth: "100%" },
              }}
            >
              <img src={product.imageUrl} className="product-detail-image" />
              <FavoriteButton />
            </Box>
            {/* PRICE - COLOR - BUTTONS */}
            <Stack
              sx={{
                padding: "36px",
                marginTop: "33px",
                rowGap: "39px",
              }}
            >
              {/* NAME AND PRICE */}
              <Box>
                <Typography fontSize="21px" fontWeight="400">
                  {product.name}
                </Typography>
                <Typography fontSize="21px" fontWeight="400">
                  ${product.price}
                </Typography>
              </Box>
              {/* COLOR PALETTE */}
              <Box>
                <Typography
                  fontSize="13px"
                  fontWeight="300"
                  marginBottom="17px"
                >
                  Color:
                </Typography>
                <ColorPalette
                  colors={product.colors}
                  sx={{
                    columnGap: "13px",
                    "& .colorBox": { border: "1px solid #E6E6E6 !important" },
                  }}
                />
              </Box>
              {/* SIZE */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "17px",
                  }}
                >
                  <Typography fontSize="13" fontWeight="300">
                    Size:{" "}
                  </Typography>
                  <Typography
                    fontSize="13"
                    sx={{
                      cursor: "pointer",
                      fontWeight: { xs: "400", sm: "600" },
                    }}
                  >
                    See size table
                  </Typography>
                </Box>
                <IconButton
                  component="button"
                  sx={{
                    border: "1px solid #D8D8D8",
                    borderRadius: "49px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px 26.9px 15px 31px",
                    height: "49px",
                    width: "184px",
                  }}
                >
                  <Typography
                    color="#AAAAAA"
                    fontSize="13px"
                    fontWeight="500"
                    textTransform="uppercase"
                  >
                    Choose size
                  </Typography>
                  <ChevronRight sx={{ fontSize: "20px", fill: "#B5B5B5" }} />
                </IconButton>
              </Box>
              <Typography fontSize="13px" fontWeight="300" marginBottom="-17px">
                Quantity:
              </Typography>
              {/* BUTTONS  */}
              <Stack
                direction="row"
                gap="15px"
                flexWrap="wrap"
                alignItems="center"
              >
                {/* QUANTITY */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  columnGap="21px"
                  sx={{
                    border: "1px solid #D8D8D8",
                    borderRadius: "49px",
                    padding: "15px",
                    height: "49px",
                    width: "184px",
                  }}
                >
                  <IconButton
                    component="button"
                    sx={{
                      color: `${productQuantity > 1 ? "#000000" : "#D8D8D8"}`,
                    }}
                    {...(productQuantity === 1 && { disabled: true })}
                    onClick={() =>
                      setProductQuantity((prevState) => prevState - 1)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    color="#000000"
                    fontSize="16px"
                    fontWeight="500"
                    textAlign="center"
                    sx={{ width: "10px" }}
                  >
                    {productQuantity}
                  </Typography>
                  <IconButton
                    component="button"
                    sx={{
                      color: `${
                        productQuantity >= product.stockAmount
                          ? "#D8D8D8"
                          : "#000000"
                      }`,
                    }}
                    {...(productQuantity >= product.stockAmount && {
                      disabled: true,
                    })}
                    onClick={() =>
                      setProductQuantity((prevState) => prevState + 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
                {/* ADD TO CART */}
                <Stack direction="row" gap="15px" alignItems="center">
                  <Button
                    sx={{
                      backgroundColor: "#FBB03B",
                      borderRadius: "56px",
                      color: "#000000",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "13px",
                      height: "49px",
                      maxWidth: { xs: "400px", sm: "448px" },
                      textAlign: "center",
                      width: "189px",
                      "&:hover": {
                        backgroundColor: "#ffb53d",
                      },
                    }}
                  >
                    ADD TO CART
                  </Button>
                  <FavoriteButton position="static" />
                </Stack>
              </Stack>
            </Stack>
            {/* DESCRIPTION - REVIEWS */}

            <Stack
              sx={{
                padding: "36px",
                marginTop: "33px",
                rowGap: "39px",
              }}
            >
              <Stack direction="row"></Stack>
              <Stack>
                {selectedTab === "reviews"
                  ? renderProductReviews()
                  : renderProductDescription()}
              </Stack>
            </Stack>
          </>
        ) : (
          <Typography>Something went wrong</Typography>
        )}
      </Stack>
    </>
  );
};

export default ProductDetail;
