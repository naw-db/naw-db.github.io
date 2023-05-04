import { graphql } from "gatsby";
import { AboutSection, ContactSection, HeroSection, Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import { AnnouncementsSection } from "src/components/sections/AnnouncementsSection";

export default function IndexPage({ data }: { data: any; }) {
  return (
    <>
      <Seo title="NAW Database" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="hero" />
        <AboutSection sectionId="about" heading="About" />
        <AnnouncementsSection sectionId="announcements" heading="Announcements" data={data.allAnnouncementsCsv.nodes} />
        <ContactSection sectionId="github" heading="Issues?" />
      </Page>
    </>
  );
}

export const pageQuery = graphql`
  query pageQuery {
    allAnnouncementsCsv {
      nodes {
        id
        type
        date
        text
      }
    }
  }
`;
