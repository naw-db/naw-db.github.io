
import { graphql } from "gatsby";
import { Animation, Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";
import { isBrowser } from "react-device-detect";

import { scrollIntoView } from "/src/components/common/AnchorScroller";
import { AnchoredSection } from "/src/components/common/AnchoredSection";
import { DEFAULT_TABLE_PAGE_SIZE, DEFAULT_TABLE_PAGE_SIZE_IN_DESKTOP_VIEW } from "/src/components/common/Defaults";
import { AnchoredMarkdownSection } from "/src/components/common/AnchoredMarkdownSection";
import TeamLevelTipsTable from "/src/components/tips/TeamLevelTipsTable";

export default function TipsPage({ data }: { data: any; }) {
  const defaultPageSize = isBrowser ? DEFAULT_TABLE_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_TABLE_PAGE_SIZE;

  scrollIntoView();

  return (
    <>
      <Seo title="Tips" />
      <Page>
        <Animation type="fadeUp">
          <AnchoredSection anchor="level-up-team-level-fast" heading="Level Up Team Level Fast">
            <h5>
              R: Rank, L: Level.
              <br />
              Example: R1L7 → Rank 1 Level 7
            </h5>
            <TeamLevelTipsTable defaultPageSize={defaultPageSize} data={data.allTeamLevelTipsCsv.nodes}/>
          </AnchoredSection>
          <AnchoredMarkdownSection data={data} category="tips" title="Arena Tournaments" anchor="arena-tournaments" />
          <AnchoredMarkdownSection data={data} category="tips" title="Players" anchor="players" />
          <AnchoredMarkdownSection data={data} category="tips" title="Team Levels" anchor="team-levels" />
          <AnchoredMarkdownSection data={data} category="tips" title="Rule the Court" anchor="rule-the-court" />
          <AnchoredMarkdownSection data={data} category="tips" title="Milestones" anchor="milestones" />
          <AnchoredMarkdownSection data={data} category="tips" title="Cash" anchor="cash" />
          <AnchoredMarkdownSection data={data} category="tips" title="Gear" anchor="gear" />
          <AnchoredMarkdownSection data={data} category="tips" title="Boosts" anchor="boosts" />
          <AnchoredMarkdownSection data={data} category="tips" title="Energy" anchor="energy" />
          <AnchoredMarkdownSection data={data} category="tips" title="Referrals" anchor="referrals" />
        </Animation>
      </Page>
    </>
  );
}

export const pageQuery = graphql`
  query pageQuery {
    allTeamLevelTipsCsv {
      nodes {
        teamLevel
        requirement
        action
        totalStarters
        totalAllStars
        totalAllWorlds
      }
    }
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
