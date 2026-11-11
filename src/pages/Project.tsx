import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById, projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import FloatingNav from "@/components/FloatingNav";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Project = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <>
        <main className="min-h-screen bg-background">
          <Navbar />
          <div className="px-6 pb-24 pt-40 text-center">
            <h1 className="text-headline mb-4 font-serif">Item não encontrado</h1>
            <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Voltar para a galeria
            </Link>
          </div>
        </main>
        <FloatingNav />
      </>
    );
  }

  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const cover = project.images[0];

  return (
    <>
      <main className="min-h-screen bg-background page-transition">
        <Navbar />

        <section className="px-4 pt-20 md:px-6">
          <div className="h-[45vh] w-full overflow-hidden rounded-2xl fade-in-up md:h-[80vh] md:rounded-3xl">
            <img
              src={cover.src}
              alt={project.title}
              width={cover.width}
              height={cover.height}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="px-6 py-8">
          <div className="max-w-4xl">
            <div className="mb-6 fade-in-up fade-in-up-delay-1">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {project.category}
              </p>
              <h1 className="text-display mb-3 font-serif font-medium">{project.title}</h1>
              <p className="text-sm text-muted-foreground">
                {[project.category, ...project.tags].map((tag) => `#${tag}`).join(" ")}
              </p>
            </div>

            <div className="max-w-2xl fade-in-up fade-in-up-delay-2">
              <p className="text-lg leading-relaxed text-foreground/90">{project.description}</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-6" aria-label={`Mais imagens de ${project.title}`}>
          <div className="space-y-4">
            {project.images.slice(1).map((galleryImage, index) => (
              <div
                key={`${galleryImage.src}-${index}`}
                className="w-full overflow-hidden rounded-3xl fade-in-up"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <img
                  src={galleryImage.src}
                  alt={`${project.title} — detalhe ${index + 2}`}
                  width={galleryImage.width}
                  height={galleryImage.height}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border px-6 py-12 pb-28">
          <div className="flex items-center justify-between gap-4">
            {prevProject ? (
              <button
                onClick={() => navigate(`/project/${prevProject.id}`)}
                className="group flex items-center gap-3 text-left transition-opacity duration-300 hover:opacity-70"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-2" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Anterior</p>
                  <p className="text-sm">{prevProject.title}</p>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextProject ? (
              <button
                onClick={() => navigate(`/project/${nextProject.id}`)}
                className="group flex items-center gap-3 text-right transition-opacity duration-300 hover:opacity-70"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Próxima</p>
                  <p className="text-sm">{nextProject.title}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </section>
      </main>
      <FloatingNav />
    </>
  );
};

export default Project;
