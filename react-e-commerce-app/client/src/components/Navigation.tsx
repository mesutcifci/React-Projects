import { useEffect, useState } from "react";

// Data
import { fetchApi } from "../api/api";
import { Category } from "../types/navigation";

// Images
import bag from "@assets/images/bag.svg";
import hamburger from "@assets/images/hamburger.svg";
import logo from "@assets/images/logo.svg";
import search from "@assets/images/search.svg";

// Components
import HamburgerMenu from "./HamburgerMenu";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { Resize } from "@cloudinary/url-gen/actions";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

export function Navigation() {
  const [categories, setCategories] = useState<Category[]>([]);
  // const [extraItems, setExtraItems] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  return (
    <nav className="relative">
      <div className="flex justify-between items-center px-3 py-4 lg:pb-0 lg:items-stretch">
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
        {/* Categories */}
        <div className="hidden lg:flex items-stretch">
          {categories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => handleCategoryHover(category.id)}
              onMouseLeave={handleCategoryLeave}
              className="pr-6 last:pr-0"
            >
              <span
                className={`cursor-pointer text-xl xl:text-2xl text-mesblack  ${
                  activeCategory === category.id ? "text-lifblue" : ""
                }`}
              >
                {category.name}
              </span>

              {/* Mega Menu */}
              {activeCategory === category.id && (
                <div className="absolute top-full left-0 w-full shadow-lg p-6 z-50">
                  <div className="flex justify-between max-w-screen-xl mx-auto pt-6">
                    {/* Categories List */}
                    <div className="flex gap-y-6 gap-x-[5.5rem] flex-wrap xl:self-center xl:mx-auto">
                      {category.children?.map((subCategory) => (
                        <div
                          key={subCategory.id}
                          className="gap-y-2 flex flex-col"
                        >
                          <a
                            href={`/${subCategory.slug}`}
                            className="text-mesblack text-base xl:text-lg font-medium hover:text-lifblue"
                          >
                            {subCategory.name}
                          </a>
                          <ul className="flex flex-col gap-y-2">
                            {subCategory.children?.map((item) => (
                              <li key={item.id}>
                                <a
                                  href={`/${item.slug}`}
                                  className="text-mesblack hover:text-lifblue font-normal text-sm xl:text-base"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {/* Images */}
                    {category.images?.length > 0 && (
                      <div className="flex gap-x-6 shrink-0 self-center">
                        {category.images?.map((image) => (
                          <a key={image.id} href={image.link} className="block">
                            <AdvancedImage
                              cldImg={cld
                                .image(image.url)
                                .format("auto")
                                .resize(Resize.fill(500, 750))}
                              width={250}
                              height={375}
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
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
      </div>
      <HamburgerMenu
        categories={categories}
        onClose={closeMenu}
        isOpen={isMenuOpen}
      />
    </nav>
  );
}
