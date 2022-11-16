import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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

  const handleClickForwardButton = () => {
    const lastItemIndex = data.length;
    setCurrentImageIndex((prevState) => {
      // if user reach last image and click forward button show first image
      if (prevState + 1 > lastItemIndex) {
        return 1;
      } else {
        return prevState + 1;
      }
    });
  };

  const handleClickBackwardButton = () => {
    const lastItemIndex = data.length;
    setCurrentImageIndex((prevState) => {
      // if user reach last image and click backward button show last image
      if (prevState - 1 <= 0) {
        return lastItemIndex;
      } else {
        return prevState - 1;
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        height: "501px",
      }}
    >
      {data.map((item, index) => {
        return (
          <Box
            sx={{
              flexShrink: "0",
              height: "501px",
              width: "100%",
              "& img": { width: "100%", height: "100%", objectFit: "cover" },
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
            <img src={item.src + (index + 1) + "." + item.imageType} />
          </Box>
        );
      })}
      <Box sx={{ position: "absolute", bottom: "10px" }}>
        <Button variant="contained" onClick={handleClickBackwardButton}>
          Back
        </Button>
        <Button variant="contained" onClick={handleClickForwardButton}>
          Forward
        </Button>
      </Box>
    </Box>
  );
};

export default Carousel;
