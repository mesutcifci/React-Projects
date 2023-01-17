// Styles
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
  params?: any;
}

const ScrollToTop = ({ params }: IProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canControlScrollRestoration = "scrollRestoration" in window.history;
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    document.getElementById("root")?.scrollIntoView({ behavior: "smooth" });
  }, [params, pathname]);

  return null;
};

export default ScrollToTop;
