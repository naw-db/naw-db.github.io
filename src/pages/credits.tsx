import { graphql } from "gatsby";
import { Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import { AnchoredMarkdownSection } from "/src/components/common/AnchoredMarkdownSection";

export default function CreditsPage({ data }: { data: any; }) {
  return (
    <>
      <Seo title="Credits" />
      <Page>
        <AnchoredMarkdownSection data={data} category="credits" title="Web Dev" anchor="web-dev" />
        <AnchoredMarkdownSection data={data} category="credits" title="Data" anchor="data" />
        <AnchoredMarkdownSection data={data} category="credits" title="Other Contributors" anchor="other-contributors" />
      </Page>
    </>
  );
}

export const pageQuery = graphql`
  query pageQuery {
    allMarkdownRemark {
      nodes {
        frontmatter {
          category
          title
        }
        html
      }
    }
  }
`;
