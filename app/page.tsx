import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioReel from "@/components/PortfolioReel";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />

          {/* Divider */}
          <div className="flex items-center justify-center py-10">
            <div className="section-divider max-w-xs" />
          </div>

          <PortfolioReel />

          {/* Divider */}
          <div className="flex items-center justify-center py-10">
            <div className="section-divider max-w-xs" />
          </div>

          <About />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
