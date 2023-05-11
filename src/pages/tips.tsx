
import { graphql } from "gatsby";
import { Animation, Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";
import { isBrowser } from "react-device-detect";

import { AnchoredSection } from "/src/components/common/AnchoredSection";
import { DEFAULT_TABLE_PAGE_SIZE, DEFAULT_TABLE_PAGE_SIZE_IN_DESKTOP_VIEW } from "/src/components/common/Defaults";
import { Markdown } from "/src/components/common/Markdown";
import TeamLevelTipsTable from "/src/components/tips/TeamLevelTipsTable";
import { scrollIntoView } from "../components/common/AnchorScroller";

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
          <Markdown data={data} category="tips" title="Arena Tournaments" anchor="arena-tournaments" />
          <Markdown data={data} category="tips" title="Players" anchor="players" />
          <Markdown data={data} category="tips" title="Team Levels" anchor="team-levels" />
          <Markdown data={data} category="tips" title="Rule the Court" anchor="rule-the-court" />
          <Markdown data={data} category="tips" title="Milestones" anchor="milestones" />
          <Markdown data={data} category="tips" title="Cash" anchor="cash" />
          <Markdown data={data} category="tips" title="Gear" anchor="gear" />
          <Markdown data={data} category="tips" title="Boosts" anchor="boosts" />
          <Markdown data={data} category="tips" title="Energy" anchor="energy" />
          <Markdown data={data} category="tips" title="Referrals" anchor="referrals" />
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
