import { useEffect, useState } from "react";
import { fetchApi } from "../api/api";
import bag from "@assets/images/bag.svg";
import hamburger from "@assets/images/hamburger.svg";
import logo from "@assets/images/logo.svg";
import search from "@assets/images/search.svg";
import { Category } from "../types/navigation";
import HamburgerMenu from "./HamburgerMenu";

export function Navigation() {
  const [categories, setCategories] = useState<Category[]>([]);
  // const [extraItems, setExtraItems] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const data = await fetchApi("/navigation/navigation-menu");

        if (data.data.categories?.length > 0) {
          setCategories(data.data.categories);
          console.log("Fetched categories:", data.data.categories);
        }

        // if (data.data.extraItems?.length > 0) {
        //   setExtraItems(data.data.extraItems);
        // }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchNavigation();
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center px-3 py-4">
      <div className="flex items-center gap-x-3">
        <img
          src={hamburger}
          width={26}
          height={26}
          className="cursor-pointer lg:hidden"
          onClick={openMenu}
        />
        <img
          src={logo}
          width={114}
          height={22}
          className="lg:w-[9.6875rem] lg:h-[1.875rem] cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-x-4">
        <img src={search} width={26} height={26} className="cursor-pointer" />
        <div className="flex items-center">
          <img src={bag} width={26} height={26} className="cursor-pointer" />
          <span className="flex items-center justify-center p-1 min-w-[1.25rem] min-h-[1.25rem] max-w-8 max-h-8 text-xs leading-[.625rem] font-inter font-bold text-white bg-black rounded-full aspect-square cursor-pointer">
            2
          </span>
        </div>
      </div>
      <HamburgerMenu
        categories={categories}
        onClose={closeMenu}
        isOpen={isMenuOpen}
      />
    </nav>
  );
}
