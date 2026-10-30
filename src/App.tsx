import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/hero/HeroSection";
import ProductShowcase, {
  ProductDetailGallery,
  ProductReveal,
} from "./components/product/ProductShowcase";
import IntelligenceWorkflow, {
  BusinessSection,
} from "./components/intelligence/IntelligenceWorkflow";
import AccessibilitySection from "./components/accessibility/AccessibilitySection";
import PrivacySection, {
  RoadmapSection,
} from "./components/privacy/PrivacySection";
import PilotEnquiryForm from "./components/contact/PilotEnquiryForm";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <HeroSection />
        <ProductShowcase />
        <ProductDetailGallery />
        <IntelligenceWorkflow />
        <BusinessSection />
        <AccessibilitySection />
        <PrivacySection />
        <RoadmapSection />
        <ProductReveal />
        <PilotEnquiryForm />
      </main>
      <Footer />
    </>
  );
}
