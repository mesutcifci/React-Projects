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
        return <ShippingIcon id={id} sx={{ width: "39px", height: "39px" }} />;
      case "carouselCustomer":
        return (
          <SmileIconWithBackground
            id={id}
            sx={{ width: "39px", height: "39px" }}
            width="39"
            height="39"
            viewBox="0 0 39 39"
          />
        );
      case "Originality Guaranteed":
        return <MoneyBackIcon id={id} sx={{ width: "39px", height: "39px" }} />;
    }
  };

  const renderCarouselBottomData = () => {
    return carouselBottomData.map((data) => (
      <Box key={data.id} sx={{ display: "flex", columnGap: "27px" }}>
        {renderIcon(data.id)}
        <Stack rowGap="9px">
          <Typography
            component="h3"
            sx={{
              fontSize: "14px",
              fontWeight: theme.fontWeight.semiBold,
            }}
          >
            {data.title}
          </Typography>
          <Typography
            sx={{
              color: "#A8A8A8",
              fontSize: "12px",
              fontWeight: theme.fontWeight.regular,
              height: "55px",
              maxWidth: "160px",
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
                fontSize: { xs: "36px", lg: "48px" },
                fontWeight: theme.fontWeight.bold,
                lineHeight: { xs: "46px", lg: "62px" },
                transform: { xs: "translateY(-50%)", lg: "initial" },
                position: "absolute",
                top: { xs: "50%", lg: "20%" },
                left: { xs: "35px", lg: "263px", xl: "363px" },
                zIndex: 2,
                maxWidth: "500px",
                width: { xs: "80%", lg: "480px" },
              }}
            >
              {item.text}
            </Typography>
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                flexDirection: "column",
                rowGap: "18px",
                position: "absolute",
                bottom: { lg: "145px", xl: "189px" },
                left: "160px",
                zIndex: "99",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: theme.fontWeight.semiBold,
                  fontSize: "12px",
                }}
              >
                01
              </Typography>
              <Box
                sx={{
                  width: "2px",
                  height: "250px",
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
                    width: "2px",
                    zIndex: "100",
                  }}
                ></Box>
              </Box>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: theme.fontWeight.semiBold,
                  fontSize: "12px",
                }}
              >
                {data.length < 10 ? "0" + data.length : data.length}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: "74px", lg: "235px" },
                display: "flex",
                columnGap: "22px",
                zIndex: 2,
                left: { xs: "35px", lg: "263px", xl: "363px" },
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
                  fontSize: "13px",
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
                borderTopRightRadius: "131px",
                color: "#000000",
                columnGap: "56px",
                display: { xs: "none", lg: "flex" },
                alignItems: "flex-start",
                height: "131px",
                justifyContent: "space-evenly",
                paddingTop: "36px",
                paddingLeft: { lg: "129px", xl: "298px" },
                paddingRight: { lg: "49px", xl: "97px" },
                position: "absolute",
                bottom: "0px",
                maxWidth: "1221px",
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
          bottom: { xs: "10px", lg: "75px", xl: "59px" },
          right: "30px",
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
            marginRight: "5px",
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
