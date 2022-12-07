import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import footerItems from "../../constants/footer.json";

const Footer = () => {
  const renderFooterItems = () => {
    return footerItems.map((item) => (
      <Grid
        item
        key={item.title}
        xs={12}
        xs350={6}
        sm700={4}
        lg={3}
        xl={2}
        sx={{
          alignItems: "center",
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: { xs: "10px", md: "28px" },
            width: "150px",
          }}
        >
          {item.title}
        </Typography>
        <Stack sx={{ rowGap: "10px", width: "150px" }}>
          {item.children.map((child) => (
            <Typography
              component={RouterLink}
              to={child.link}
              key={child.name}
              sx={{
                fontSize: "13px",
                color: "#000000",
                textDecoration: "none",
                "&:hover": { color: "#FF6666" },
              }}
            >
              {child.name}
            </Typography>
          ))}
        </Stack>
      </Grid>
    ));
  };
  return (
    <>
      <Grid container rowGap="40px" sx={{ padding: "16px" }}>
        {renderFooterItems()}
        <Grid
          item
          sx={{
            rowGap: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          xs={12}
          xs350={6}
          sm700={4}
          lg={3}
          xl={2}
        >
          {[
            { link: "", imageUrl: "./images/common/google-play-badge.png" },
            { link: "", imageUrl: "./images/common/app-store-badge.png" },
          ].map((item) => (
            <Link
              key={item.imageUrl}
              to={item.link}
              component={RouterLink}
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                  transition: "transform 300ms linear",
                },
              }}
            >
              <img src={item.imageUrl} />
            </Link>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          xs350={6}
          sm700={4}
          lg={3}
          xl={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "22.7px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              columnGap: "41px",
              width: "155px",
            }}
          >
            <Link
              to=""
              sx={{ color: "black", "&:hover": { color: "#FF6666" } }}
              component={RouterLink}
            >
              <Facebook />
            </Link>
            <Link
              to=""
              sx={{ color: "black", "&:hover": { color: "#FF6666" } }}
              component={RouterLink}
            >
              <Twitter />
            </Link>
            <Link
              to=""
              sx={{ color: "black", "&:hover": { color: "#FF6666" } }}
              component={RouterLink}
            >
              <LinkedIn />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              columnGap: "41px",
              width: "155px",
            }}
          >
            <Link
              to=""
              sx={{ color: "black", "&:hover": { color: "#FF6666" } }}
              component={RouterLink}
            >
              <Instagram />
            </Link>
            <Link
              to=""
              sx={{ color: "black", "&:hover": { color: "#FF6666" } }}
              component={RouterLink}
            >
              <YouTube />
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Typography
        sx={{
          fontSize: "12px",
          color: "#AEAEAE",
          marginLeft: "auto",
          marginRight: "auto",
          width: "max-content",
        }}
      >
        DESIGN BY ICEO.CO - © 2019. ALL RIGHTS RESERVED.
      </Typography>
    </>
  );
};

export default Footer;
