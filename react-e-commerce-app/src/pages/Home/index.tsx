// Components
import { Carousel, Collections, WhyChooseUs } from "../../components";

// Styles
import { Box } from "@mui/material";

const Home = () => {
  return (
    <main>
      <Box>
        <Carousel />
        <Collections />
        <WhyChooseUs />
      </Box>
    </main>
  );
};

export default Home;
