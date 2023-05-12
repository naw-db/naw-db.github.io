import { graphql } from "gatsby";
import { Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import { PlayersComparisonChart } from "/src/components/players/PlayersComparisonChart";

const DEFAULT_PLAYERS: Array<string> = [ "Stephen Curry", "LeBron James", "Kevin Durant", "Giannis Antetokounmpo" ];

const BAR_CHART_COLORS: Array<string> = [ "#39A0CA", "#FF5E6C", "#657A00", "#C89666" ];

export default function ComparePlayersPage({ data }: { data: any; }) {
  return (
    <>
      <Seo title="Compare Players" />
      <Page>
        <PlayersComparisonChart defaultPlayers={DEFAULT_PLAYERS} barColors={BAR_CHART_COLORS} data={data}/>
      </Page>
    </>
  );
}

export const pageQuery = graphql`
  query pageQuery {
    allPlayersCsv {
      nodes {
        name
        shortName
        startingRank
        maxRank
        ballHandlingBase
        perimeterShootingBase
        midRangeShootingBase
        dunkPowerBase
        defenseBase
        blockingBase
        stealingBase
        strengthBase
        speedBase
        staminaBase
        ballHandlingMax
        perimeterShootingMax
        midRangeShootingMax
        dunkPowerMax
        defenseMax
        blockingMax
        stealingMax
        strengthMax
        speedMax
        staminaMax
      }
    }
  }
`;
