import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "../index";

const data = [
  {
    id: 1,
    src: "./images/mobile/main-carousel/image",
    text: "Carousel text 1",
    link: "",
    imageType: "png",
  },
  {
    id: 2,
    src: "./images/mobile/main-carousel/image",
    text: "Carousel text 2",
    link: "",
    imageType: "png",
  },
];

describe("Carousel mobile", () => {
  beforeEach(() => {
    render(<Carousel variant="mobile" data={data} />);
  });

  test("Forward icon should be visible", () => {
    expect(screen.getByTestId("ArrowForwardIcon")).toBeInTheDocument();
  });

  test("Backward icon should be visible", () => {
    expect(screen.getByTestId("ArrowBackIcon")).toBeInTheDocument();
  });

  test("Shop icon should be visible", () => {
    expect(screen.getAllByTestId("shopIcon")[0]).toBeInTheDocument();
  });

  test("Backward button should be disabled in first render", () => {
    expect(screen.getByTestId("backwardButton")).toBeDisabled();
  });

  test("Forward button should be disabled and backward button not to be disabled when user reach last carousel item", () => {
    const forwardButton = screen.getByTestId("forwardButton");
    const backwardButton = screen.getByTestId("backwardButton");

    fireEvent.click(forwardButton);

    expect(forwardButton).toBeDisabled();
    expect(backwardButton).not.toBeDisabled();
  });

  test("The first slide should be visible on first render", () => {
    expect(screen.getByTestId("carouselItem1")).not.toHaveClass("hide");
  });

  test("clicking forward button should change the displayed carousel item", () => {
    const forwardButton = screen.getByTestId("forwardButton");

    const firstItem = screen.getByTestId("carouselItem1");
    const secondItem = screen.getByTestId("carouselItem2");

    expect(secondItem).toHaveClass("hide");

    fireEvent.click(forwardButton);

    expect(firstItem).toHaveClass("hide");
    expect(secondItem).not.toHaveClass("hide");
  });

  test("clicking backward button should change the displayed carousel item", () => {
    const backwardButton = screen.getByTestId("backwardButton");

    const firstItem = screen.getByTestId("carouselItem1");
    const secondItem = screen.getByTestId("carouselItem2");

    expect(secondItem).toHaveClass("hide");

    fireEvent.click(backwardButton);

    expect(firstItem).not.toHaveClass("hide");
    expect(secondItem).toHaveClass("hide");
  });
});
