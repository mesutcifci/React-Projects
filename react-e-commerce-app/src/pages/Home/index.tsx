import Carousel from "../../components/Carousel";
import WhyChooseUs from "../../components/WhyChooseUs";
import mobileCarouselData from "../../constants/mainCarouselMobileData.json";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <main>
      <Box>
        <Carousel variant={"mobile"} data={mobileCarouselData} />
        <WhyChooseUs />
      </Box>
    </main>
  );
};

export default Home;
