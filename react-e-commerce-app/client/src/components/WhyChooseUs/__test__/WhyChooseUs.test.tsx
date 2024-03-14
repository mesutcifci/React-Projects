import { render, screen } from "@testing-library/react";
import WhyChooseUs from "../index";
import listData from "../listData.json";

const checkIconsInDocument = () => {
  listData.forEach(({ id }) => {
    test(`should ${id} icon be visible`, () => {
      expect(
        screen.getByTestId(id, { collapseWhitespace: false })
      ).toBeInTheDocument();
    });
  });
};

const checkTitlesInTheDocument = () => {
  listData.forEach(({ id, title }) => {
    test(`should title of ${id} icon be visible`, () => {
      expect(
        screen.getByText(title, { collapseWhitespace: false })
      ).toBeInTheDocument();
    });
  });
};

const checkDescriptionsInTheDocument = () => {
  listData.forEach(({ id, description }) => {
    test(`should description of ${id} icon be visible`, () => {
      expect(
        screen.getByText(description, { collapseWhitespace: false })
      ).toBeInTheDocument();
    });
  });
};

describe("WhyChooseUs", () => {
  beforeEach(() => {
    render(<WhyChooseUs />);
  });

  checkIconsInDocument();
  checkTitlesInTheDocument();
  checkDescriptionsInTheDocument();

  test("should main heading be visible", () => {
    expect(screen.getByText(/Why should you choose us/i)).toBeInTheDocument();
  });
});
