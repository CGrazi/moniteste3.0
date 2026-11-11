import { Link, useLocation } from "react-router-dom";

const FloatingNav = () => {
  const currentPath = useLocation().pathname;
  const navItems = [
    { name: "Galeria", path: "/" },
    { name: "Sobre", path: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/" || currentPath.startsWith("/project");
    return currentPath.startsWith(path);
  };

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2" aria-label="Navegação principal">
      <div className="flex items-center gap-1 rounded-full bg-muted/85 p-1.5 shadow-sm backdrop-blur-md">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            aria-current={isActive(item.path) ? "page" : undefined}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
              isActive(item.path)
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default FloatingNav;
