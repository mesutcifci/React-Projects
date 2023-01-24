import { Box, Button, Typography } from "@mui/material";
import categories from "../../constants/categories.json";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { Stack } from "@mui/system";

const InitializeProducts = () => {
  const [message, setMessage] = useState("");

  const colors = [
    "#000000",

    "#6F3E18",

    "#D4BE8D",

    "#838383",

    "#FFFFFF",

    "#0F73AD",
  ];

  // Add your image URL's here
  const men = "";
  const women = "";
  const kids = "";
  const addProducts = () => {
    categories.forEach((category) => {
      category.secondaryCategories.forEach((secondary) => {
        secondary.tertiaryCategories.forEach(async (tertiary, index) => {
          let selectedColors: Set<string> = new Set();

          for (let i = 0; i <= 3; i++) {
            selectedColors.add(colors[Math.floor(Math.random() * 6)]);
          }

          const selectedColors2 = Array.from(selectedColors) as string[];

          const product = {
            name: `Dummy Product - ${category.name}/${tertiary.name}`,
            isFavorite: false,
            primaryCategories: [category.id],

            secondaryCategory: secondary.id,

            tertiaryCategory: tertiary.id,

            collections: [`cl${index}`],

            colors: selectedColors2,

            description: {
              details:
                "Introducing the Dummy Apparel, a stylish and unique addition to your wardrobe. This apparel features a one-of-a-kind pattern that adds personality to your outfit. The slim fit design is both flattering and modern, with a comfortable fit that is perfect for everyday wear. It's versatile and can be paired with a variety of different styles, from dress pants to jeans. Made with high-quality materials, this dummy apparel is durable and built to last. Upgrade your wardrobe with this must-have item today!",

              materials: ["Cotton"],
            },

            discountRate: 0,

            price: 79.99,

            sizes: ["sm", "md", "l", "xl", "xxl"],

            stockAmount: 10,

            imageUrl: `${
              category.id === "men"
                ? men
                : category.id === "women"
                ? women
                : kids
            }`,
          };

          addDoc(collection(db, "products"), product)
            .then((result) => {
              setMessage("Products added successfully");
            })
            .catch((error: string) => {
              setMessage(`something bad happened: ${error}`);
            });
        });
      });
    });
  };

  return (
    <Stack gap="20px" sx={{ alignItems: "center" }}>
      <Button
        variant="contained"
        onClick={addProducts}
        sx={{ marginTop: "300px" }}
      >
        ADD PRODUCTS
      </Button>
      {message.length > 0 && <Typography>{message}</Typography>}
    </Stack>
  );
};

export default InitializeProducts;
