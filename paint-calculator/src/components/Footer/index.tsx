import { Stack } from "@mui/material";

const Footer = () => {
  return (
    <Stack alignItems="center" sx={{ py: "50px" }}>
      <footer style={{ color: "#38cc8c" }}>
        Created by{" "}
        <a
          style={{ color: "#ff7a7a" }}
          href="https://github.com/mesutcifci"
          target="_blank"
          rel="noreferrer"
        >
          Mesut Çiftçi
        </a>
      </footer>
    </Stack>
  );
};

export default Footer;
