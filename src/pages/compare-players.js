import { graphql } from "gatsby";
import { Page, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import { PlayersComparisonChart } from "src/components/players/PlayersComparisonChart";

const defaultPlayers = [ "Stephen Curry", "LeBron James" ];

export default function ComparePlayers({ data }) {
  return (
    <>
      <Seo title="Compare Players" />
      <Page useSplashScreenAnimation>
        <PlayersComparisonChart defaultPlayers={defaultPlayers} barColors={["#F96167", "#FCE77D"]} data={data}/>
      </Page>
    </>
  );
}

export const pageQuery = graphql`
  query pageQuery {
    allPlayersCsv {
      nodes {
        id
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
