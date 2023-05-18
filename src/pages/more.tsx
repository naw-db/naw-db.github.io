import { graphql } from "gatsby";
import { Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";
import { isBrowser } from "react-device-detect";

import { AnchoredSection } from "/src/components/common/AnchoredSection";
import { scrollIntoView } from "/src/components/common/AnchorScroller";
import { DEFAULT_TABLE_PAGE_SIZE, DEFAULT_TABLE_PAGE_SIZE_IN_DESKTOP_VIEW } from "/src/components/common/Defaults";
import EventTournamentHistoryTable from "/src/components/events/EventTournamentHistoryTable";
import PlayerLevelRequirementsTable from "/src/components/players/PlayerLevelsRequirementsTable";

export default function MorePage({ data, location }: { data: any; location: any }) {
  const defaultPageSize = isBrowser ? DEFAULT_TABLE_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_TABLE_PAGE_SIZE;

  scrollIntoView(location);

  return (
    <>
      <Seo title="More" />
      <Page>
        <AnchoredSection anchor="player-level-requirements" heading="Player Level Requirements">
          <PlayerLevelRequirementsTable defaultPageSize={defaultPageSize} data={data.allPlayerLevelRequirementsCsv.nodes}/>
        </AnchoredSection>
        <AnchoredSection anchor="event-tournament-history" heading="Event Tournament History">
          <EventTournamentHistoryTable defaultPageSize={defaultPageSize} data={data.allEventTournamentHistoryCsv.nodes}/>
        </AnchoredSection>
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
