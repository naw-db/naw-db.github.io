import { Animation, Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import CreditsSection from "/src/components/credits/CreditsSection";

export default function CreditsPage() {
  return (
    <>
      <Seo title="Credits" />
      <Page>
        <Animation type="fadeUp">
          <CreditsSection />
        </Animation>
      </Page>
    </>
  );
}
