import { useState, useEffect } from "react";
import { Category } from "../types/navigation";

// Components
import { motion, AnimatePresence } from "framer-motion";
import Overlay from "./Overlay";

// Images
import chevronLeft from "@assets/images/chevron-left.svg";
import chevronRight from "@assets/images/chevron-right.svg";
import closeIcon from "@assets/images/close.svg";
import logo from "@assets/images/logo.svg";
import x from "@assets/images/x.svg";
import instagram from "@assets/images/instagram.svg";
import facebook from "@assets/images/facebook.svg";
import email from "@assets/images/email.svg";

interface HamburgerMenuProps {
  categories: Category[];
  onClose: () => void;
  isOpen: boolean;
}

/*
 * #DOC
 * hidden, visible and exit are the states of the component
 */
const variants = {
  hidden: (direction: string) => ({
    x: direction === "forward" ? "100%" : "-100%",
    opacity: 0,
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (direction: string) => ({
    x: direction === "forward" ? "-100%" : "100%",
    opacity: 0,
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const socialLinks = [
  { icon: facebook, href: "https://facebook.com/", alt: "facebook" },
  { icon: instagram, href: "https://instagram.com/", alt: "instagram" },
  { icon: x, href: "https://x.com/", alt: "x" },
  { icon: email, href: "mailto:example@mail.com", alt: "email" },
];

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  categories,
  onClose,
  isOpen,
}) => {
  const [path, setPath] = useState<Category[]>([]);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsFirstRender(false);
    }
  }, [isOpen]);

  let currentCategories: Category[] = categories;
  if (path.length > 0) {
    const last = path[path.length - 1];
    currentCategories = last.children;
  }

  const navigateToCategory = (category: Category) => {
    if (category.children.length > 0) {
      setDirection("forward");
      setPath([...path, category]);
    }
  };

  const navigateBack = () => {
    setDirection("backward");
    setPath(path.slice(0, -1));
  };

  useEffect(() => {
    console.log("path", path.length);
  }, [path]);

  return (
    <>
      {/* The hamburger menu and the overlay share same state*/}
      <Overlay isOpen={isOpen} onClose={onClose} />

      {/*
       * #DOC
       * We need to use AnimatePresence component to animate components that removed from the DOM.
       * If a component have exit property it will be animated when removed from the DOM
       */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 left-0 z-[101] bg-white h-full w-full max-w-lg overflow-y-auto shadow-lg lg:hidden flex flex-col pb-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              {path.length > 0 ? (
                <button onClick={navigateBack} className="text-xl">
                  <img
                    src={chevronLeft}
                    alt="chevron-left"
                    className="w-6 h-6"
                  />
                </button>
              ) : (
                <img
                  src={logo}
                  alt="logo"
                  className="w-[7.125rem] h-[1.375rem]"
                />
              )}
              <button onClick={onClose} className="ml-auto">
                <img src={closeIcon} alt="close" className="w-7 h-7" />
              </button>
            </div>

            {/* Categories */}
            <div className="relative h-[calc(100%-400px)]">
              <AnimatePresence custom={direction}>
                <motion.ul
                  key={path.length}
                  custom={direction}
                  variants={variants}
                  initial={isFirstRender ? false : "hidden"}
                  animate="visible"
                  exit="exit"
                  className="p-6 h-full w-full flex flex-col gap-y-6"
                >
                  {currentCategories.map((category) => (
                    <li
                      key={category._id}
                      className="flex justify-between items-center cursor-pointer rounded"
                      onClick={() => navigateToCategory(category)}
                    >
                      <span className="text-xl text-mesblack">
                        {category.name}
                      </span>
                      {category.children.length > 0 && (
                        <img
                          src={chevronRight}
                          alt="chevron-right"
                          className="w-6 h-6"
                        />
                      )}
                    </li>
                  ))}
                  {currentCategories.length === 0 && (
                    <li className="text-center text-sm text-mesblack">
                      No subcategories
                    </li>
                  )}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* Social Links & Sign in */}
            {path.length === 0 && (
              <div className="flex flex-col gap-y-6 mt-auto">
                <div className="flex justify-center gap-x-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.alt}
                      href={link.href}
                      target={
                        link.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-mesgray"
                    >
                      <img
                        src={link.icon}
                        alt={link.alt}
                        className="w-[1.125rem] h-[1.125rem]"
                      />
                    </a>
                  ))}
                </div>
                <div className="px-6">
                  <button className="w-full bg-black text-white h-10 rounded-[.375rem] text-sm">
                    Sign in
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
