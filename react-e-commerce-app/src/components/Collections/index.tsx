// Styles
import { Button, Stack, Typography, Box } from "@mui/material";

// Data
import collectionData from "./collectionData.json";

const Collections = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        columnGap: "34px",
        marginTop: "73px",
        maxWidth: { lg: "1000px", xl: "1280px" },
        justifyContent: "space-around",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {collectionData.map((data) => (
        <Stack
          key={data.id}
          sx={{
            position: "relative",
            "& img": {
              width: "100%",
              height: "373px",
            },
            "&:hover .overlay": {
              backgroundColor: "rgba(0,0,0,0.3)",
              transition: "background-color 400ms linear",
            },
          }}
        >
          <Box
            className="overlay"
            sx={{
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "absolute",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
              zIndex: 2,
            }}
          ></Box>
          {data.discountRate >= 10 && (
            <Box
              color="error"
              sx={{
                backgroundColor: "#FF0000",
                borderRadius: "30px",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "600",
                fontFamily: "Poppins, sans-serif",
                height: "30px",
                minWidth: "55px",
                padding: "5px",
                position: "absolute",
                top: "118px",
                left: { md: "40px", lg: "52px" },
                zIndex: 3,
              }}
            >
              {data.discountRate}%
            </Box>
          )}
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "25px",
              position: "absolute",
              top: "163px",
              left: { md: "40px", lg: "52px" },
              width: "165px",
              zIndex: 3,
            }}
          >
            {data.text}
          </Typography>
          <Button
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "49px",
              color: "#000000",
              fontSize: "13px",
              height: "49px",
              position: "absolute",
              left: { md: "40px", lg: "52px" },
              bottom: "62px",
              minWidth: "111px",
              padding: "20px",
              zIndex: 3,

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.8)",
              },
            }}
          >
            {data.buttonText}
          </Button>
          <img src={data.imageUrl} loading="lazy" alt={data.text} />
        </Stack>
      ))}
    </Box>
  );
};

export default Collections;
