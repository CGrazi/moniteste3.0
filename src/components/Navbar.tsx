import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { getCategories } from "@/data/projects";

interface NavbarProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const Navbar = ({ selectedCategory, onCategoryChange }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const categories = ["tudo", ...getCategories()];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  const categoryButton = (category: string, mobile = false) => (
    <button
      key={category}
      onClick={() => onCategoryChange?.(category)}
      aria-pressed={selectedCategory === category}
      className={`${mobile ? "px-4 py-2 whitespace-nowrap" : "px-4 py-1.5"} rounded-full text-sm capitalize transition-all duration-300 ${
        selectedCategory === category
          ? "bg-primary text-primary-foreground"
          : mobile
            ? "bg-muted text-muted-foreground"
            : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {category}
    </button>
  );

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="px-6">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="font-serif text-2xl font-semibold tracking-tight transition-opacity duration-300 hover:opacity-70"
              aria-label="Moniteste — página inicial"
            >
              Moniteste
            </Link>

            {isHomePage && onCategoryChange && (
              <div className="hidden items-center gap-1 md:flex">
                {categories.map((category) => categoryButton(category))}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="rounded-full p-2 transition-colors duration-300 hover:bg-muted"
              aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {isHomePage && onCategoryChange && (
        <div className="fixed left-0 right-0 top-16 z-40 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex w-max gap-2 px-6 py-3">
              {categories.map((category) => categoryButton(category, true))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
