import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-16 lg:pt-20">
        <Hero />
        <Services />
        <Team />
        <Gallery />
        <Reviews />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <StickyMobileBar />
    </>
  );
}
