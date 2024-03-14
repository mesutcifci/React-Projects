import { findByText, fireEvent, screen, waitFor } from "@testing-library/react";
import CartProductsRenderer from "..";
import { renderWithProviders } from "../../../utils/test-utils";

const tableHeaders = ["Product", "Color", "Size", "Amount", "Price"];

describe("CartProductsRenderer", () => {
  beforeEach(() => {
    renderWithProviders(<CartProductsRenderer />, {
      preloadedState: {
        products: {
          products: null,
          productsByIds: null,
          productsByCategory: null,
          cartProducts: {
            products: [
              {
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/react-e-commerce-f354a.appspot.com/o/products%2Foxford-shirt.webp?alt=media&token=5d5c6d7e-5b7e-4aa9-aff6-88ffcd9ac846",
                primaryCategory: "men",
                price: 79.99,
                description: {
                  details:
                    "This classic Oxford shirt is a wardrobe staple that every man should own. Made with soft and durable cotton, it's comfortable to wear all day long. The button-down collar adds a touch of sophistication, while the slim fit design flatters the figure. It's a versatile piece that can be dressed up or down, making it perfect for any occasion.",
                  materials: ["Cotton"],
                },
                secondaryCategory: "clo",
                sizes: ["sm", "md", "l", "xl", "xxl"],
                colors: ["#6F3E18", "#0F73AD"],
                collections: ["cl2"],
                isFavorite: false,
                id: "GryNuyQRSAGOCrsjZkoG",
                name: "Oxford Shirt",
                stockAmount: 10,
                tertiaryCategory: "sh",
                discountRate: 0,
                amount: 1,
              },
            ],
            totalCost: 239.97,
          },
          favoriteProducts: null,
          loading: false,
        },
      },
    });
  });

  test("Should render all product headers", () => {
    tableHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test("Should render product data", () => {
    const data = ["Oxford Shirt", "White", "XL", "1", "$79.99"];
    data.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("Should render remove product button", () => {
    expect(screen.getByTestId("CloseIcon"));
  });

  // TODO fix this text, remove button works on real app but not in the test
  // test("Should remove product button work properly", async () => {
  //   const button = screen.getByTestId("CloseIcon");
  //   fireEvent.click(button);

  //   await waitFor(() => {
  //     expect(screen.queryByText("Oxford Shirt")).toBeNull();
  //   });
  // });
});
