import Carousel from "../../components/Carousel";
import mobileCarouselData from "../../constants/mainCarouselMobileData.json";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <main>
      <Box>
        <Carousel variant={"mobile"} data={mobileCarouselData} />
      </Box>
    </main>
  );
};

export default Home;
