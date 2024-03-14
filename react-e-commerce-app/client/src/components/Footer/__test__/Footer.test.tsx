import { screen, render } from "@testing-library/react";
import Footer from "../index";
import footerItems from "../../../constants/footer.json";
import { BrowserRouter } from "react-router-dom";

describe("Footer", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  test("Should footer items render correctly", () => {
    footerItems.forEach((item) => {
      const titleElement = screen.getByText(item.title);
      expect(titleElement).toBeInTheDocument();
      item.children.forEach((child) => {
        const childElement = screen.getByText(child.name);
        expect(childElement).toBeInTheDocument();
      });
    });
  });

  test("Should google play and apple store badges render correctly", () => {
    const googlePlayBadge = screen.getByAltText("Google Play Badge");
    const appleStoreBadge = screen.getByAltText("Apple Store Badge");

    expect(googlePlayBadge).toBeInTheDocument();
    expect(appleStoreBadge).toBeInTheDocument();
  });

  test("Should social icons render correctly", () => {
    const testIds = [
      "FacebookIcon",
      "TwitterIcon",
      "LinkedInIcon",
      "InstagramIcon",
      "YouTubeIcon",
    ];
    testIds.map((id) => {
      const socialIcon = screen.getByTestId(id);
      expect(socialIcon).toBeInTheDocument();
    });
  });

  test("Should render bottom text correctly", () => {
    const bottomTextElement = screen.getByText("ICEO.CO");
    expect(bottomTextElement).toBeInTheDocument();
  });
});
