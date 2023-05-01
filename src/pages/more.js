import { graphql } from "gatsby";
import { Animation, Page, Section, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";
import { isBrowser } from "react-device-detect";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW } from "src/components/common/Defaults";
import EventTournamentHistoryTable from "src/components/events/EventTournamentHistoryTable";
import PlayerLevelRequirementsTable from "src/components/players/PlayerLevelsRequirementsTable";

export default function MorePage({ data }) {
  const defaultPageSize = isBrowser ? DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_PAGE_SIZE;

  return (
    <>
      <Seo title="More" />
      <Page useSplashScreenAnimation>
        <Animation type="fadeUp">
          <Section anchor="player-level-requirements" heading="Player Level Requirements">
            <PlayerLevelRequirementsTable defaultPageSize={defaultPageSize} data={data.allPlayerLevelRequirementsCsv.nodes}/>
          </Section>
          <Section anchor="event-tournament-history" heading="Event Tournament History">
            <EventTournamentHistoryTable defaultPageSize={defaultPageSize} data={data.allEventTournamentHistoryCsv.nodes}/>
          </Section>
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
    allEventTournamentHistoryCsv {
      nodes {
        tournament
        series
        date
        duration
        arena
        passRequired
        leaderboardSize
        playerRequirements
        numberOfPlayers
        pointsToWin
        numberOfGames
        lossesToBeEliminated
        completionRings
        leaderboardRings
      }
    }
  }
`;
