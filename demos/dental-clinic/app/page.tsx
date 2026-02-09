import NavbarDentist from "@/components/dentist/NavbarDentist";
import HeroSplitBooking from "@/components/dentist/HeroSplitBooking";
import TrustStats from "@/components/dentist/TrustStats";
import TreatmentsNavigator from "@/components/dentist/TreatmentsNavigator";
import BeforeAfterSlider from "@/components/dentist/BeforeAfterSlider";
import Doctors from "@/components/dentist/Doctors";
import TimelineHowItWorks from "@/components/dentist/TimelineHowItWorks";
import PartnersLogos from "@/components/dentist/PartnersLogos";
import ReviewsCarousel from "@/components/dentist/ReviewsCarousel";
import FAQAccordion from "@/components/dentist/FAQAccordion";
import ContactEmergency from "@/components/dentist/ContactEmergency";
import FooterDentist from "@/components/dentist/FooterDentist";
import StickyCTA from "@/components/dentist/StickyCTA";
import StickyBookCTA from "@/components/dentist/StickyBookCTA";

export default function Home() {
  return (
    <>
      <NavbarDentist />
      <main>
        <HeroSplitBooking />
        <TrustStats />
        <TreatmentsNavigator />
        <BeforeAfterSlider />
        <Doctors />
        <TimelineHowItWorks />
        <PartnersLogos />
        <ReviewsCarousel />
        <FAQAccordion />
        <ContactEmergency />
      </main>
      <FooterDentist />
      <StickyCTA />
      <StickyBookCTA />
    </>
  );
}
