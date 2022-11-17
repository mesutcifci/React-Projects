import { nanoid } from "@reduxjs/toolkit";
import colors from "./colors.json";

export const products = [
  {
    id: nanoid(),
    displayName: "T-Shirt Summer Vibes",
    colors: [colors.black, colors.red, colors.white],
    sizes: ["sm", "md", "l", "xl", "xxl"],
    price: 89.99,
    stockAmount: 10,
    amount: 0,
    isFavorite: false,
    isInCart: false,
    discountRate: 5,
    description: {
      details: "This is a beautiful product",
      materials: ["Cotton"],
    },
    primaryCategories: [{ name: "men", displayName: "Men" }],
    secondaryCategories: [
      { name: "topsAndTShirts", displayName: "Tops & T-Shirts" },
    ],
    tertiaryCategories: [
      { name: "graphicTShirts", displayName: "Graphic T-Shirts" },
    ],
    collections: [{ name: "collection1", displayName: "Collection 1" }],
  },
  {
    id: nanoid(),
    displayName: "Basic Slim Fit T-Shirt",
    colors: [colors.black, colors.red, colors.white],
    sizes: ["sm", "md", "l", "xl", "xxl"],
    price: 79.99,
    stockAmount: 10,
    amount: 0,
    isFavorite: false,
    isInCart: false,
    discountRate: 0,
    description: {
      details: "This is a beautiful product",
      materials: ["Cotton"],
    },
    primaryCategories: [{ name: "men", displayName: "Men" }],
    secondaryCategories: [
      { name: "topsAndTShirts", displayName: "Tops & T-Shirts" },
    ],
    tertiaryCategories: [
      { name: "graphicTShirts", displayName: "Graphic T-Shirts" },
    ],
    collections: [{ name: "collection1", displayName: "Collection 1" }],
  },
];
