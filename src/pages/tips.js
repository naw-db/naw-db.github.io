import { graphql } from "gatsby";
import { Animation, Page, Section, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";
import { isBrowser } from "react-device-detect";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW } from "src/components/common/Defaults";
import TeamLevelTipsTable from "src/components/tips/TeamLevelTipsTable";

export default function TipsPage({ data }) {
  const defaultPageSize = isBrowser ? DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_PAGE_SIZE;

  return (
    <>
      <Seo title="Tips" />
      <Page useSplashScreenAnimation>
        <Animation type="fadeUp">
          <Section heading="Level Up Team Level Fast">
            <TeamLevelTipsTable defaultPageSize={defaultPageSize} data={data.allTeamLevelTipsCsv.nodes}/>
          </Section>
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
