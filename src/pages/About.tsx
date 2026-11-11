import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingNav from "@/components/FloatingNav";
import ScrollRevealText from "@/components/ScrollRevealText";

const gallerySections = [
  {
    number: "01",
    title: "Sabores e sorvetes",
    description: "Casquinhas, taças e combinações que colocam cada sabor no centro da cena.",
  },
  {
    number: "02",
    title: "Produtos e sobremesas",
    description: "Criações geladas e apresentações especiais para abrir o apetite.",
  },
  {
    number: "03",
    title: "Eventos e novidades",
    description: "Um espaço para divulgar encontros, lançamentos e tudo o que está acontecendo.",
  },
];

const About = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <main className="min-h-screen bg-background page-transition">
        <Navbar />

        <section className="flex min-h-[60vh] flex-col justify-center px-6 pb-12 pt-28">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Sobre esta galeria
          </p>
          <div className="max-w-6xl">
            <ScrollRevealText
              text="A Moniteste em imagens: sorvetes, sobremesas e momentos gelados reunidos em um só lugar."
              className="font-serif text-4xl font-medium leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl"
            />
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="grid gap-10 border-t border-border pt-8 md:grid-cols-3">
            {gallerySections.map((section) => (
              <article key={section.number}>
                <p className="mb-6 text-xs text-primary">{section.number}</p>
                <h2 className="mb-3 font-serif text-2xl font-medium">{section.title}</h2>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 pb-32">
          <div className="rounded-3xl bg-secondary p-6 md:flex md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="font-serif text-3xl font-medium">Qual será o seu favorito?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Passe pela galeria e descubra.</p>
            </div>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 md:mt-0"
            >
              Explorar galeria
              <ArrowRight size={16} />
            </Link>
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            As imagens e descrições desta versão são demonstrativas e podem ser substituídas pelas fotos e informações reais da Moniteste.
          </p>
        </section>
      </main>
      <FloatingNav />
    </>
  );
};

export default About;
