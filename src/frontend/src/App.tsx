import AboutSection from "./components/heritage/AboutSection";
import ContactSection from "./components/heritage/ContactSection";
import CultureSection from "./components/heritage/CultureSection";
import Footer from "./components/heritage/Footer";
import GallerySection from "./components/heritage/GallerySection";
import HeroSection from "./components/heritage/HeroSection";
import Navbar from "./components/heritage/Navbar";
import ServicesSection from "./components/heritage/ServicesSection";

export default function App() {
  return (
    <div className="heritage-outer">
      <Navbar />
      <main>
        <div className="heritage-inner">
          <HeroSection />
          <AboutSection />
          <CultureSection />
          <GallerySection />
          <ServicesSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
