import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { IParameter } from "../types/parameters";

const initialState = {
  primary: "",
  secondary: [],
  tertiary: [],
};

const useSearchParameters = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const [modifiedParameters, setModifiedParameters] =
    useState<IParameter>(initialState);

  let primary = pathname.substring(1);

  useEffect(() => {
    primary = pathname.substring(1);
    let secondary = searchParams.get("secondary")?.split(",");
    const tertiary = searchParams
      .get("tertiary")
      ?.split(",")
      .map((item) => {
        // ["ls", "sho"];
        const [tertiaryCategoryId, secondaryCategoryId] = item.split(":");
        return { [secondaryCategoryId]: tertiaryCategoryId };
      });

    setModifiedParameters({
      primary,
      secondary: secondary || [],
      tertiary: tertiary || [],
    });
  }, [searchParams, primary]);

  return {
    modifiedParameters,
    searchParams,
  };
};

export default useSearchParameters;
