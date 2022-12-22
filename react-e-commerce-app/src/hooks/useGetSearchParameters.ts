import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { IParameter } from "../types/parameters";

const initialState = {
  primary: "",
  secondary: [],
  tertiary: [],
};

const useGetSearchParameters = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [parameters, setParameters] = useState<IParameter>(initialState);

  useEffect(() => {
    let primary = location.pathname.substring(1);
    let secondary = searchParams.get("secondary")?.split(",");
    const tertiary = searchParams
      .get("tertiary")
      ?.split(",")
      .map((item) => {
        const [value, key] = item.split(":");
        return { [key]: value };
      });

    setParameters({
      primary,
      secondary: secondary || [],
      tertiary: tertiary || [],
    });
  }, [searchParams]);

  return { parameters };
};

export default useGetSearchParameters;
