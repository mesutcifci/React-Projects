import { useState, useRef } from "react";
import useWindowResize from "../../hooks/useWindowResize";

// Styles
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { IconButton, Typography, Box, Stack } from "@mui/material";
import theme from "../../theme";

// Data
import carouselBottomData from "./carouselBottomData.json";

// Components
import { MoneyBackIcon, ShippingIcon, SmileIconWithBackground } from "../../ui";
import { useNavigate } from "react-router-dom";

// Data
import data from "../../constants/mainCarouselData.json";

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [sliderWrapperHeight, setSliderWrapperHeight] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const updateSliderWrapperHeight = () => {
    if (ref.current) {
      setSliderWrapperHeight(ref.current.clientHeight);
    }
  };
  useWindowResize(updateSliderWrapperHeight);

  const updateCurrentImageIndex = (slideDirection: string) => {
    if (slideDirection === "right") {
      setCurrentImageIndex((prevState) => prevState + 1);
    } else if (slideDirection === "left") {
      setCurrentImageIndex((prevState) => prevState - 1);
    }
  };

  const renderIcon = (id: string) => {
    switch (id) {
      case "carouselShipping":
        return (
          <ShippingIcon id={id} sx={{ width: "2.43rem", height: "2.43rem" }} />
        );
      case "carouselCustomer":
        return (
          <SmileIconWithBackground
            id={id}
            sx={{ width: "2.43rem", height: "2.43rem" }}
            width="39"
            height="39"
            viewBox="0 0 39 39"
          />
        );
      case "Originality Guaranteed":
        return (
          <MoneyBackIcon id={id} sx={{ width: "2.43rem", height: "2.43rem" }} />
        );
    }
  };

  const renderCarouselBottomData = () => {
    return carouselBottomData.map((data) => (
      <Box key={data.id} sx={{ display: "flex", columnGap: "1.68rem" }}>
        {renderIcon(data.id)}
        <Stack rowGap="0.56rem">
          <Typography
            component="h3"
            sx={{
              fontSize: "0.875rem",
              fontWeight: theme.fontWeight.semiBold,
            }}
          >
            {data.title}
          </Typography>
          <Typography
            sx={{
              color: "#A8A8A8",
              fontSize: "0.75rem",
              fontWeight: theme.fontWeight.regular,
              height: "3.5rem",
              maxWidth: "10rem",
              WebkitLineClamp: "3",
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitBoxOrient: "vertical",
            }}
          >
            {data.description}
          </Typography>
        </Stack>
      </Box>
    ));
  };

  const returnSliderTrackPosition = () => {
    const height = 250 / data.length;
    return { top: height * (currentImageIndex - 1) + "px" };
  };

  const handleClickShopNowButton = () => {
    navigate({ pathname: "/women" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        overflow: "hidden",
        height: sliderWrapperHeight + "px",
      }}
    >
      {data.map((item, index) => {
        return (
          <Box
            data-testid={`carouselItem${item.id}`}
            {...(index === 0 && { ref: ref })}
            sx={{
              flexShrink: "0",
              width: "100%",
              position: "absolute",
              "& img": {
                width: "100%",
                height: "100%",
                filter: "grayScale(0.2)",
              },
              "&.carousel-item": {
                transform: "translateX(0)",
                transition: "transform 800ms ease",
              },
              transition: "transform 800ms ease",
              "&.hide": { transform: `translateX(calc(100%))` },
            }}
            key={item.id}
            className={`${
              currentImageIndex !== index + 1
                ? "carousel-item hide"
                : "carousel-item "
            }`}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "2.25rem", lg: "3rem" },
                fontWeight: theme.fontWeight.bold,
                lineHeight: { xs: "2.875rem", lg: "3.875rem" },
                transform: { xs: "translateY(-50%)", lg: "initial" },
                position: "absolute",
                top: { xs: "50%", lg: "20%" },
                left: { xs: "2.18rem", lg: "16.43rem", xl: "22.68rem" },
                zIndex: 2,
                maxWidth: "31.25rem",
                width: { xs: "80%", lg: "30rem" },
              }}
            >
              {item.text}
            </Typography>
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                flexDirection: "column",
                rowGap: "1.125rem",
                position: "absolute",
                bottom: { lg: "9.06rem", xl: "11.81rem" },
                left: "10rem",
                zIndex: "99",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: theme.fontWeight.semiBold,
                  fontSize: "0.75rem",
                }}
              >
                01
              </Typography>
              <Box
                sx={{
                  width: "0.125rem",
                  height: "15.625rem",
                  backgroundColor: "rgba(255,255,255,.27)",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    height: `calc(100% / ${data.length})`,
                    position: "absolute",
                    ...returnSliderTrackPosition(),
                    width: "0.125rem",
                    zIndex: "100",
                  }}
                ></Box>
              </Box>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: theme.fontWeight.semiBold,
                  fontSize: "0.75rem",
                }}
              >
                {data.length < 10 ? "0" + data.length : data.length}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: "4.625rem", lg: "14.6875rem" },
                display: "flex",
                columnGap: "1.375rem",
                zIndex: 2,
                left: { xs: "2.18rem", lg: "16.43rem", xl: "22.68rem" },
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#FBB03B",
                }}
                component="button"
                onClick={handleClickShopNowButton}
              >
                <ArrowForwardIcon data-testid="shopIcon" />
              </IconButton>
              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: "0.81rem",
                  color: "white",
                  fontWeight: theme.fontWeight.semiBold,
                }}
                onClick={handleClickShopNowButton}
              >
                SHOP NOW
              </Typography>
            </Box>
            <picture>
              <source media="(min-width: 1440px)" srcSet={item.src.xl} />
              <source media="(min-width: 1024px)" srcSet={item.src.lg} />
              <source media="(min-width: 768px)" srcSet={item.src.md} />
              <source media="(min-width: 425px)" srcSet={item.src.sm} />
              <img src={item.src.xs} onLoad={updateSliderWrapperHeight} />
            </picture>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                borderTopRightRadius: "8.18rem",
                color: "#000000",
                columnGap: "3.5rem",
                display: { xs: "none", lg: "flex" },
                alignItems: "flex-start",
                height: "8.18rem",
                justifyContent: "space-evenly",
                paddingTop: "2.25rem",
                paddingLeft: { lg: "8.125rem", xl: "18.625rem" },
                paddingRight: { lg: "3.0625rem", xl: "6.125rem" },
                position: "absolute",
                bottom: "0rem",
                maxWidth: "76.31rem",
                width: "90%",
              }}
            >
              {renderCarouselBottomData()}
            </Box>
          </Box>
        );
      })}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "0.625rem", lg: "4.68rem", xl: "3.68rem" },
          right: "1.875rem",
          "& .Mui-disabled": {
            backgroundColor: "white !important",
          },
        }}
      >
        <IconButton
          sx={{
            color: "black",
            backgroundColor: "white",
            borderRadius: "0",
            marginRight: "0.31rem",
            "&:hover": { color: "black", backgroundColor: "white" },
          }}
          component="button"
          data-testid="backwardButton"
          onClick={() => updateCurrentImageIndex("left")}
          {...(currentImageIndex === 1 && { disabled: true })}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "black",
            backgroundColor: "white",
            borderRadius: "0",
            "&:hover": { color: "black", backgroundColor: "white" },
          }}
          component="button"
          data-testid="forwardButton"
          onClick={() => updateCurrentImageIndex("right")}
          {...(currentImageIndex === data.length && { disabled: true })}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Carousel;
