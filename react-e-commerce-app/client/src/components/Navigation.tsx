import { useEffect, useState } from "react";
import { fetchApi } from "../api/api";

export function Navigation() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const data = await fetchApi("/navigation/navigation-menu");

        console.log("data", data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchNavigation();
  }, []);

  return <h3>Example</h3>;
}
