import Box from "@mui/material/Box";

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
  return (
    <Box sx={{ "& img": { maxWidth: "100%" } }}>
      {data.map((item, index) => {
        return (
          <img
            key={item.id}
            src={item.src + (index + 1) + "." + item.imageType}
          />
        );
      })}
    </Box>
  );
};

export default Carousel;
