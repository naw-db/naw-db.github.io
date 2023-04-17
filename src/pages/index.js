import {
  AboutSection,
  Page,
  Seo,
} from "gatsby-theme-portfolio-minimal";
import React from "react";


export default function IndexPage() {
  return (
    <>
      <Seo title="NBA All-World Database" />
      <Page useSplashScreenAnimation>
        <AboutSection sectionId="about" heading="About" />
      </Page>
    </>
  );
}
