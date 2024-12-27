import { useState, useEffect } from "react";
import { Category } from "../types/navigation";
import { motion, AnimatePresence } from "framer-motion";
import chevronLeft from "@assets/images/chevron-left.svg";
import chevronRight from "@assets/images/chevron-right.svg";
import closeIcon from "@assets/images/close.svg";
import Overlay from "./Overlay";

interface HamburgerMenuProps {
  categories: Category[];
  onClose: () => void;
  isOpen: boolean;
}

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

  // Add debug logs
  useEffect(() => {
    console.log("HamburgerMenu - Current categories:", categories);
    console.log("HamburgerMenu - Current path:", path);
    console.log("HamburgerMenu - isOpen:", isOpen);
  }, [categories, path, isOpen]);

  // Determine current categories to display based on the path
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

  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 left-0 z-[101] w-3/4 max-w-sm bg-white h-full shadow-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              {path.length > 0 ? (
                <button onClick={navigateBack} className="text-xl">
                  <img src={chevronLeft} alt="chevron-left" />
                </button>
              ) : (
                <span className="text-lg font-semibold">Menu</span>
              )}
              <button onClick={onClose} className="text-xl">
                <img src={closeIcon} alt="close" />
              </button>
            </div>

            {/* Categories with Animation */}
            <div className="relative h-[calc(100%-4rem)] overflow-hidden">
              <AnimatePresence custom={direction}>
                <motion.ul
                  key={path.length}
                  custom={direction}
                  variants={variants}
                  initial={isFirstRender ? false : "hidden"}
                  animate="visible"
                  exit="exit"
                  className="p-4 space-y-2 overflow-y-auto h-full w-full"
                >
                  {currentCategories.map((category) => (
                    <li
                      key={category._id}
                      className="flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-100 rounded"
                      onClick={() => navigateToCategory(category)}
                    >
                      <span>{category.name}</span>
                      {category.children.length > 0 && (
                        <img src={chevronRight} alt="chevron-right" />
                      )}
                    </li>
                  ))}
                  {currentCategories.length === 0 && (
                    <li className="py-2 text-center text-gray-500">
                      No subcategories
                    </li>
                  )}
                </motion.ul>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
