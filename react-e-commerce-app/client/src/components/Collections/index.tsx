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
                borderRadius: "1.875rem",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: "600",
                fontFamily: "Poppins, sans-serif",
                height: "1.875rem",
                minWidth: "3.5rem",
                padding: "0.31rem",
                position: "absolute",
                top: "118px",
                left: { md: "2.5rem", lg: "52px" },
                zIndex: 3,
              }}
            >
              {data.discountRate}%
            </Box>
          )}
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "1.56rem",
              position: "absolute",
              top: "163px",
              left: { md: "2.5rem", lg: "52px" },
              width: "165px",
              zIndex: 3,
            }}
          >
            {data.text}
          </Typography>
          <Button
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "3.125rem",
              color: "#000000",
              fontSize: "0.81rem",
              height: "3.125rem",
              position: "absolute",
              left: { md: "2.5rem", lg: "52px" },
              bottom: "3.875rem",
              minWidth: "111px",
              padding: "1.25rem",
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
