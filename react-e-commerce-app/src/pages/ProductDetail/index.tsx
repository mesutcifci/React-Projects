import { useEffect, useState } from "react";

// Styles
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import {
  ChevronRight,
  DescriptionOutlined,
  Star,
  Person2Outlined,
} from "@mui/icons-material";
import theme from "../../theme";

// Components
import { ColorPalette, Counter, FavoriteButton } from "../../components";
import { ProductCareIcon, ProductMaterialsIcon } from "../../ui";

// Hooks
import { useNavigate, useSearchParams } from "react-router-dom";

// Data
import comments from "../../constants/comments.json";
import { IComment } from "../../types/comments";
import { RootState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { fetchProduct } from "../../features/product/productSlice";
import { addUserProductsInCart } from "../../helpers/addUserProductsInCart";
import { setUserLoading } from "../../features/user/userSlice";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    currentUser,
    product,
    user: { user },
  } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<"description" | "reviews">(
    "reviews"
  );

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      dispatch(
        fetchProduct({
          productId: id,
          favoriteProductIds: user?.favoriteProductIds,
        })
      );
    }
  }, [searchParams.get("id"), user]);

  const renderComments = () => {
    return comments.map((comment: IComment) => (
      <Stack key={comment.id} direction="row" columnGap="27px">
        <Avatar
          src={comment.avatarUrl}
          sx={{ width: "40px", height: "40px" }}
          alt={comment.owner}
        />
        <Stack justifyContent="flex-start">
          <Typography
            fontSize="12px"
            fontWeight={theme.fontWeight.semiBold}
            marginBottom="5.5px"
          >
            {comment.owner}
          </Typography>
          <Rating
            readOnly
            value={comment.ratingPoint}
            precision={0.5}
            sx={{ marginBottom: "12.1px" }}
          />
          <Typography
            fontSize="12px"
            fontWeight={theme.fontWeight.regular}
            sx={{ width: "100%", maxWidth: "500px" }}
          >
            {comment.comment}
          </Typography>
        </Stack>
      </Stack>
    ));
  };

  const renderProductDescription = () => {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        rowGap="40px"
        sx={{
          flexDirection: { md: "row" },
          columnGap: { xs: "60px", xl: "177px" },
        }}
      >
        {/* DESCRIPTION */}
        <Stack alignItems="center" sx={{ width: { md: "50%" } }}>
          <DescriptionOutlined
            sx={{
              marginBottom: "49px",
              height: "67px",
              width: "52.2px",
              opacity: "0.1",
            }}
          />
          <Typography
            fontSize="16px"
            fontWeight={theme.fontWeight.semiBold}
            textAlign="center"
            sx={{ marginBottom: "35px" }}
          >
            Details and product description
          </Typography>
          <Typography fontSize="14px" fontWeight={theme.fontWeight.regular}>
            {product.product?.description.details}
          </Typography>
        </Stack>

        {/* MATERIALS */}
        <Stack alignItems="center" sx={{ width: { md: "50%" } }}>
          <ProductMaterialsIcon
            sx={{
              marginBottom: "49px",
              height: "67px",
              width: "52.2px",
            }}
            viewBox="0 0 30.15 67"
            data-testid="productMaterials"
          />
          <Typography
            fontSize="16px"
            fontWeight={theme.fontWeight.semiBold}
            textAlign="center"
            sx={{ marginBottom: "35px" }}
          >
            Material(s) and care
          </Typography>
          <Typography
            fontSize="14px"
            fontWeight={theme.fontWeight.regular}
            sx={{ marginBottom: "10px" }}
          >
            {product.product?.description.materials}
          </Typography>
          <ProductCareIcon
            sx={{
              height: "28px",
              width: "215px",
            }}
            viewBox="0 0 215 28"
            data-testid="productMaterials"
          />
        </Stack>
      </Stack>
    );
  };

  const renderProductReviews = () => {
    return (
      <Stack
        rowGap="40px"
        sx={{
          columnGap: { xs: "60px", xl: "177px" },
          flexDirection: { md: "row" },
          alignItems: "center",
        }}
      >
        {/* RATING*/}
        <Stack rowGap="40px" sx={{ width: { md: "50%" } }}>
          <Stack gap="40px" direction="row" flexWrap="wrap" alignItems="center">
            {/* RATING POINTS */}
            <Stack alignItems="center">
              <Typography
                fontSize="59px"
                fontWeight={theme.fontWeight.semiBold}
              >
                4.5
              </Typography>
              <Rating
                name="read-only"
                defaultValue={4.5}
                precision={0.5}
                readOnly
                size="small"
                sx={{ marginBottom: "14px" }}
              />
              <Typography
                fontSize="12px"
                fontWeight={theme.fontWeight.regular}
                color="#B9B9B9"
                sx={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <Person2Outlined sx={{ height: "15px" }} /> 81 all opinions
              </Typography>
            </Stack>

            {/* RATING CHART */}
            <Stack rowGap="7px">
              {[1, 2, 3, 4, 5].map((number, index) => (
                <Stack direction="row" alignItems="center" key={number}>
                  <Star sx={{ fill: "#ffb53d" }} />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: theme.fontWeight.regular,
                      marginLeft: "9px",
                      marginRight: "18px",
                      width: "4px",
                    }}
                  >
                    {number}
                  </Typography>
                  <Box
                    sx={{
                      width: "142px",
                      height: "2px",
                      background: "#DBDBDB",
                      borderRadius: "2px",
                      position: "relative",
                      "&:before": {
                        background: "#ffb53d",
                        borderRadius: "2px",
                        content: '""',
                        height: "2px",
                        position: "absolute",
                        left: "0px",
                        right: `calc(${Math.floor(Math.random() * 101)}%)`,
                        zIndex: 2,
                      },
                    }}
                  ></Box>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <Button
            sx={{
              backgroundColor: "#FBB03B",
              borderRadius: "56px",
              color: "#000000",
              display: "flex",
              alignItems: "center",
              fontSize: "13px",
              fontWeight: theme.fontWeight.semiBold,
              height: "49px",
              maxWidth: { xs: "400px", sm: "448px" },
              textAlign: "center",
              width: "189px",
              "&:hover": {
                backgroundColor: "#ffb53d",
              },
            }}
          >
            ADD TO OPINION
          </Button>
        </Stack>

        {/* COMMENT */}
        <Stack rowGap="37px" sx={{ width: { md: "50%" } }}>
          {renderComments()}
        </Stack>
      </Stack>
    );
  };

  const handleClickAddToCartButton = () => {
    if (product.product && currentUser.currentUser) {
      dispatch(setUserLoading(true));
      const promise = addUserProductsInCart({
        productId: product.product.id,
        amount: productQuantity,
        userId: currentUser.currentUser.uid,
      })
        .then((result) => {
          dispatch(setUserLoading(false));
        })
        .catch((error) => {
          console.log(error);
          dispatch(setUserLoading(false));
        });
    } else {
      navigate("/auth/login");
    }
  };

  const handleClickDecreaseButton = () => {
    setProductQuantity((prevState) => prevState - 1);
  };

  const handleClickIncreaseButton = () => {
    setProductQuantity((prevState) => prevState + 1);
  };

  return (
    <>
      <Stack
        sx={{
          minHeight: "500px",
          width: "100%",
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
        {product.product && (
          <>
            <Stack
              sx={{ flexDirection: { xs: "column", lg: "row" } }}
              columnGap="110px"
            >
              {/* PRODUCT IMAGE */}
              <Stack direction="row" justifyContent="center">
                <Box
                  sx={{
                    position: "relative",
                    width: "max-content",
                    maxWidth: { xs: "100%", sm768: "601px", lg: "476px" },
                    "& .product-detail-image": { maxWidth: "100%" },
                  }}
                >
                  <img
                    src={product.product.imageUrl}
                    className="product-detail-image"
                    alt={product.product.name}
                  />
                  <FavoriteButton
                    sx={{ display: { xs: "flex", lg: "none" } }}
                    productId={product.product.id}
                    isFavorite={product.product.isFavorite}
                  />
                </Box>
              </Stack>

              {/* PRICE - COLOR - BUTTONS */}
              <Stack
                sx={{
                  padding: "36px",
                  paddingTop: { lg: "0px" },
                  rowGap: "39px",
                }}
              >
                {/* NAME AND PRICE */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "21px", sm768: "25px", lg: "30px" },
                      fontWeight: theme.fontWeight.light,
                    }}
                  >
                    {product.product.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "21px", sm768: "25px", lg: "30px" },
                      fontWeight: theme.fontWeight.regular,
                    }}
                  >
                    ${product.product.price}
                  </Typography>
                </Box>

                {/* COLOR PALETTE */}
                <Box>
                  <Typography
                    fontSize="13px"
                    fontWeight={theme.fontWeight.light}
                    marginBottom="17px"
                  >
                    Color:
                  </Typography>
                  <ColorPalette
                    colors={product.product.colors}
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
                    <Typography
                      fontSize="13"
                      fontWeight={theme.fontWeight.light}
                    >
                      Size:{" "}
                    </Typography>
                    <Typography
                      fontSize="13px"
                      fontWeight={theme.fontWeight.semiBold}
                      sx={{
                        cursor: "pointer",
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
                      fontWeight={theme.fontWeight.regular}
                      textTransform="uppercase"
                    >
                      Choose size
                    </Typography>
                    <ChevronRight sx={{ fontSize: "20px", fill: "#B5B5B5" }} />
                  </IconButton>
                </Box>

                <Typography
                  fontSize="13px"
                  fontWeight={theme.fontWeight.light}
                  marginBottom="-17px"
                >
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
                  <Counter
                    counterValue={productQuantity}
                    handleClickDecreaseButton={handleClickDecreaseButton}
                    handleClickIncreaseButton={handleClickIncreaseButton}
                    maxValue={product.product.stockAmount || 0}
                  />

                  {/* ADD TO CART - FAVORITE */}
                  <Stack direction="row" gap="15px" alignItems="center">
                    <Button
                      sx={{
                        backgroundColor: "#FBB03B",
                        borderRadius: "56px",
                        color: "#000000",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "13px",
                        fontWeight: theme.fontWeight.semiBold,
                        height: "49px",
                        maxWidth: { xs: "400px", sm: "448px" },
                        textAlign: "center",
                        width: "189px",
                        "&:hover": {
                          backgroundColor: "#ffb53d",
                        },
                      }}
                      onClick={handleClickAddToCartButton}
                    >
                      ADD TO CART
                    </Button>
                    <FavoriteButton
                      position="static"
                      sx={{ display: { xs: "none", lg: "flex" } }}
                      productId={product.product.id}
                      isFavorite={product.product.isFavorite}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            {/* DESCRIPTION - REVIEWS */}
            <Stack
              padding="36px"
              marginTop="33px"
              rowGap="39px"
              maxWidth="1500px"
            >
              <Stack
                direction="row"
                sx={{
                  columnGap: { xs: "10px", md: "40px" },
                  justifyContent: { sm: "center" },
                }}
              >
                <Button
                  sx={{
                    height: "49px",
                    width: "189px",
                    border: `1px solid ${
                      selectedTab === "description" ? "#FBB03B" : "#D8D8D8"
                    }`,
                    borderRadius: "49px",
                    color: `${
                      selectedTab === "description" ? "#000000" : "#D4D4D4"
                    }`,
                    fontSize: "13px",
                    fontWeight: `${
                      selectedTab === "description"
                        ? theme.fontWeight.semiBold
                        : theme.fontWeight.regular
                    }`,
                    textAlign: "center",
                    "&:hover": {
                      background: `${
                        selectedTab === "description" && "#FBB03B"
                      }`,
                    },
                  }}
                  onClick={() => setSelectedTab("description")}
                >
                  DESCRIPTION
                </Button>
                <Button
                  sx={{
                    height: "49px",
                    width: "189px",
                    border: `1px solid ${
                      selectedTab === "reviews" ? "#FBB03B" : "#D8D8D8"
                    }`,
                    borderRadius: "49px",
                    color: `${
                      selectedTab === "reviews" ? "#000000" : "#D4D4D4"
                    }`,
                    fontSize: "13px",
                    fontWeight: `${
                      selectedTab === "reviews"
                        ? theme.fontWeight.semiBold
                        : theme.fontWeight.regular
                    }`,
                    textAlign: "center",
                    "&:hover": {
                      background: `${selectedTab === "reviews" && "#FBB03B"}`,
                    },
                  }}
                  onClick={() => setSelectedTab("reviews")}
                >
                  REVIEWS &nbsp; (3)
                </Button>
              </Stack>
              <Stack rowGap="20px">
                {selectedTab === "reviews"
                  ? renderProductReviews()
                  : renderProductDescription()}
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default ProductDetail;
