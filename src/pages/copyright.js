import React from "react";
import { LegalSection, Page, Seo } from "gatsby-theme-portfolio-minimal";

export default function CopyrightPage() {
  return (
    <>
      <Seo title="Copyright" useTitleTemplate={true} noIndex={true} />
      <Page>
        <LegalSection sectionId="copyright" heading="Copyright" />
      </Page>
    </>
  );
}
