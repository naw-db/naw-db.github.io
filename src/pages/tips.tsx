
import { graphql } from "gatsby";
import { Animation, Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";
import { isBrowser } from "react-device-detect";

import { AnchoredSection } from "/src/components/common/AnchoredSection";
import { DEFAULT_TABLE_PAGE_SIZE, DEFAULT_TABLE_PAGE_SIZE_IN_DESKTOP_VIEW } from "/src/components/common/Defaults";
import TeamLevelTipsTable from "/src/components/tips/TeamLevelTipsTable";

export default function TipsPage({ data }: { data: any; }) {
  const defaultPageSize = isBrowser ? DEFAULT_TABLE_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_TABLE_PAGE_SIZE;

  return (
    <>
      <Seo title="Tips" />
      <Page useSplashScreenAnimation>
        <Animation type="fadeUp">
          <AnchoredSection anchor="level-up-team-level-fast" heading="Level Up Team Level Fast">
            <h5>
              R: Rank, L: Level.
              <br />
              Example: R1L7 → Rank 1 Level 7
            </h5>
            <TeamLevelTipsTable defaultPageSize={defaultPageSize} data={data.allTeamLevelTipsCsv.nodes}/>
          </AnchoredSection>
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
  }
`;
