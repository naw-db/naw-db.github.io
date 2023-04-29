import { graphql } from "gatsby";
import { Animation, Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";
import { isBrowser } from "react-device-detect";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW } from "src/components/common/Defaults";
import PlayerLevelRequirementsTable from "src/components/players/PlayerLevelsRequirementsTable";

export default function MorePage({ data }) {
  const defaultPageSize = isBrowser ? DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_PAGE_SIZE;

  return (
    <>
      <Seo title="More" />
      <Page useSplashScreenAnimation>
        <Animation type="fadeUp">
          <PlayerLevelRequirementsTable defaultPageSize={defaultPageSize} data={data.allPlayerLevelRequirementsCsv.nodes}/>
        </Animation>
      </Page>
    </>
  );
}

export const pageQuery = graphql`
  query pageQuery {
    allPlayerLevelRequirementsCsv {
      nodes {
        rankAndLevel
        drillOpponentTier
        drillWinsRequired
        starTokensRequired
        xpRequiredStarter
        credsRequiredStarter
        ringsRequiredStarter
        xpRequiredAllStar
        credsRequiredAllStar
        ringsRequiredAllStar
        xpRequiredAllWorld
        credsRequiredAllWorld
        ringsRequiredAllWorld
      }
    }
  }
`;
