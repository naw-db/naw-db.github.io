import {
  AboutSection,
  HeroSection,
  Page,
  Seo,
} from "gatsby-theme-portfolio-minimal";
import React from "react";

export default function IndexPage() {
  return (
    <>
      <Seo title="NAW Database" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="hero" />
        <AboutSection sectionId="about" heading="About" />
      </Page>
    </>
  );
}
