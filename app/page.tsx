import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Principles } from "@/components/sections/Principles";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Principles />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
