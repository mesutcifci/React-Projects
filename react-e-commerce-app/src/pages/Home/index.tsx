import { Carousel, WhyChooseUs } from "../../components";
import mobileCarouselData from "../../constants/mainCarouselMobileData.json";
import desktopCarouselData from "../../constants/mainCarouselDesktopData.json";

import { Box } from "@mui/material";

const Home = () => {
  return (
    <main>
      <Box>
        <Carousel variant={"mobile"} data={mobileCarouselData} />
        <Carousel variant={"desktop"} data={desktopCarouselData} />

        <WhyChooseUs />
      </Box>
    </main>
  );
};

export default Home;
