// Components
import { Carousel, Collections, WhyChooseUs } from "../../components";

// Data
import mobileCarouselData from "../../constants/mainCarouselMobileData.json";
import desktopCarouselData from "../../constants/mainCarouselDesktopData.json";

// Styles
import { Box } from "@mui/material";

const Home = () => {
  return (
    <main>
      <Box>
        <Carousel variant={"mobile"} data={mobileCarouselData} />
        <Carousel variant={"desktop"} data={desktopCarouselData} />
        <Collections />
        <WhyChooseUs />
      </Box>
    </main>
  );
};

export default Home;
