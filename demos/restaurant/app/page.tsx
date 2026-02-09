import NavbarIzakaya from "@/components/izakaya/NavbarIzakaya";
import HeroCinematicReserve from "@/components/izakaya/HeroCinematicReserve";
import TrustStats from "@/components/izakaya/TrustStats";
import SignatureExperience from "@/components/izakaya/SignatureExperience";
import OmakaseHighlight from "@/components/izakaya/OmakaseHighlight";
import MenuNavigator from "@/components/izakaya/MenuNavigator";
import GalleryMasonry from "@/components/izakaya/GalleryMasonry";
import NightRitualTimeline from "@/components/izakaya/NightRitualTimeline";
import ReviewsCarousel from "@/components/izakaya/ReviewsCarousel";
import FAQAccordion from "@/components/izakaya/FAQAccordion";
import LocationHoursMap from "@/components/izakaya/LocationHoursMap";
import FooterIzakaya from "@/components/izakaya/FooterIzakaya";
import StickyCTA from "@/components/izakaya/StickyCTA";
import StickyDesktopReserve from "@/components/izakaya/StickyDesktopReserve";

export default function Home() {
  return (
    <>
      <NavbarIzakaya />

      <main>
        <HeroCinematicReserve />
        <TrustStats />
        <SignatureExperience />
        <OmakaseHighlight />
        <MenuNavigator />
        <GalleryMasonry />
        <NightRitualTimeline />
        <ReviewsCarousel />
        <FAQAccordion />
        <LocationHoursMap />
      </main>

      <FooterIzakaya />
      <StickyCTA />
      <StickyDesktopReserve />
    </>
  );
}
