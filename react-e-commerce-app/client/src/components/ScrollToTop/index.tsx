// Styles
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
  params?: any;
}

const ScrollToTop = ({ params }: IProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.getElementById("root")?.scrollIntoView({ behavior: "smooth" });
  }, [params, pathname]);

  return null;
};

export default ScrollToTop;
