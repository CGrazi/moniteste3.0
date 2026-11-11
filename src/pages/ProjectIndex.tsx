import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import FloatingNav from "@/components/FloatingNav";

const ProjectIndex = () => {
  const [selectedCategory, setSelectedCategory] = useState("tudo");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "tudo") return projects;
    return projects.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  const tagsFor = (project: (typeof projects)[number], limit?: number) => {
    const tags = [project.category, ...project.tags];
    return (limit ? tags.slice(0, limit) : tags).map((tag) => `#${tag}`).join(" ");
  };

  return (
    <>
      <main className="min-h-screen bg-background page-transition">
        <Navbar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

        <header className="px-6 pb-8 pt-36 md:pb-10 md:pt-28">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Galeria Moniteste
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Um mundo gelado para saborear com os olhos.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Explore sorvetes, sobremesas, eventos e novidades.
          </p>
        </header>

        <section ref={sectionRef} className="px-6 pb-32" aria-label="Itens da galeria">
          <p className="sr-only" aria-live="polite">
            {filteredProjects.length} itens na galeria
          </p>

          <div className="grid grid-cols-2 gap-3 md:hidden">
            {filteredProjects.map((project, index) => {
              const cover = project.images[0];
              return (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className={`project-card group block transition-all duration-700 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={cover.src}
                      alt={project.title}
                      width={cover.width}
                      height={cover.height}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="pb-3 pt-2">
                    <h2 className="line-clamp-1 text-xs font-medium transition-opacity duration-300 group-hover:opacity-70">
                      {project.title}
                    </h2>
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
                      {tagsFor(project, 2)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="hidden columns-2 gap-4 md:block lg:columns-3 3xl:columns-4">
            {filteredProjects.map((project, index) => {
              const cover = project.images[0];
              return (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className={`project-card group mb-4 block break-inside-avoid transition-all duration-700 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-muted">
                    <img
                      src={cover.src}
                      alt={project.title}
                      width={cover.width}
                      height={cover.height}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="pb-4 pt-3">
                    <h2 className="text-sm font-medium transition-opacity duration-300 group-hover:opacity-70">
                      {project.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">{tagsFor(project)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <FloatingNav />
    </>
  );
};

export default ProjectIndex;
