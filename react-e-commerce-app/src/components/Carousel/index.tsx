import { useState } from "react";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface ICarouselItemType {
  id: number;
  src: string;
  text: string;
  link: string;
  imageType: string;
}

interface ICarouselProps {
  variant: string;
  data: ICarouselItemType[];
}

const Carousel = ({ variant, data }: ICarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  const updateCurrentImageIndex = (slideDirection: string) => {
    if (slideDirection === "right") {
      setCurrentImageIndex((prevState) => prevState + 1);
    } else if (slideDirection === "left") {
      setCurrentImageIndex((prevState) => prevState - 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        height: "501px",
        overflow: "hidden",
      }}
    >
      {data.map((item, index) => {
        return (
          <Box
            sx={{
              flexShrink: "0",
              height: "501px",
              width: "100%",
              "& img": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayScale(0.2)",
              },
              "&.slide-item": {
                transform: "translateX(0)",
                position: "absolute",
                transition: "transform 800ms ease",
              },
              transition: "transform 800ms ease",
              "&.hide": { transform: `translateX(calc(100vw * ${index + 1}))` },
            }}
            key={item.id}
            className={`${
              currentImageIndex !== index + 1
                ? "slide-item hide"
                : "slide-item "
            }`}
          >
            <Typography
              sx={{
                position: "absolute",
                fontSize: "43px",
                fontWeight: "bold",
                lineHeight: "42px",
                color: "white",
                transform: "translateY(-50%)",
                top: "50%",
                left: "35px",
                zIndex: 2,
                width: "80%",
              }}
            >
              {item.text}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                bottom: "74px",
                display: "flex",
                columnGap: "22px",
                zIndex: 2,
                left: "35px",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#FBB03B",
                }}
                component="button"
              >
                <ArrowForwardIcon />
              </IconButton>
              <Typography
                sx={{ fontSize: "13px", color: "white", fontWeight: "bold" }}
              >
                SHOP NOW
              </Typography>
            </Box>
            <img src={item.src + (index + 1) + "." + item.imageType} />
          </Box>
        );
      })}
      <Box
        sx={{
          position: "absolute",
          bottom: "10px",
          right: "30px",
          "& .Mui-disabled": {
            backgroundColor: "rgba(255,255,255, 0.2) !important",
            color: "white !important",
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
