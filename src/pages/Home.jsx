import Hero from "../components/Hero.jsx";
import StackBand from "../components/StackBand.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Experience from "../components/Experience.jsx";
import Projects from "../components/Projects.jsx";
import Contact from "../components/Contact.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";

export default function Home() {
  useDocumentMeta();
  return (
    <>
      <Hero />
      <StackBand />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
