import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BusinessHero from "./components/hero/BusinessHero";
import BrandReveal from "./components/hero/BrandReveal";
import {
  BusinessProblem,
  BusinessUseCases,
  IntegrationArchitecture,
  RoadmapSection,
} from "./components/sections/BusinessSections";
import ConversationWorkflow from "./components/workflow/ConversationWorkflow";
import RelationshipGraph from "./components/intelligence/RelationshipGraph";
import ConversationWorkspace from "./components/dashboard/ConversationWorkspace";
import ProductExplorer from "./components/hardware/ProductExplorer";
import PrivacySection from "./components/trust/PrivacySection";
import PilotSection from "./components/pilot/PilotSection";
import FounderSection from "./components/founder/FounderSection";
import { useExperienceMotion } from "./hooks/useExperienceMotion";
import type { WorkspaceTab } from "./content/demo";
export default function App() {
  const [view, setView] = useState<WorkspaceTab>("Overview"),
    [selectedId, setSelectedId] = useState("northstar-01");
  useExperienceMotion();
  function openRecord(tab: WorkspaceTab, id: string) {
    setView(tab);
    setSelectedId(id);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <BusinessHero />
        <BusinessProblem />
        <ConversationWorkflow />
        <RelationshipGraph onOpen={openRecord} />
        <ConversationWorkspace
          view={view}
          onView={setView}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <BusinessUseCases onOpen={openRecord} />
        <ProductExplorer />
        <IntegrationArchitecture />
        <PrivacySection />
        <RoadmapSection />
        <PilotSection />
        <FounderSection />
        <BrandReveal />
      </main>
      <Footer />
    </>
  );
}
