import { graphql } from "gatsby";
import { Animation, Page, Section, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import { PlayersTable, RANK_UP_REQUIREMENT_SEPARATOR } from "src/components/players/PlayersTable";

export default function ExplorePlayersPage({ data }) {
  const tableData = React.useMemo(
    () => {
      return data.allPlayersCsv
        .nodes
        .map(
          entry => {
            const enriched = Object.assign({}, entry);

            enriched.position = enriched.position2 === ""
              ? enriched.position1
              : `${enriched.position1}, ${enriched.position2}`;

            enriched.beatToRankUp = [
              enriched.beatToReachRank2,
              enriched.beatToReachRank3,
              enriched.beatToReachRank4,
              enriched.beatToReachRank5,
              enriched.beatToReachRank6
            ]
              .filter(player => player !== "")
              .join(RANK_UP_REQUIREMENT_SEPARATOR);

            return enriched;
          }
        );
    },
    [ data.allPlayersCsv.nodes ]
  );

  return (
    <>
      <Seo title="Explore Players" />
      <Page useSplashScreenAnimation>
        <Animation type="fadeUp">
          <Section>
            <PlayersTable data={tableData} />
          </Section>
        </Animation>
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
        levelAvailable
        startingRank
        maxRank
        type
        team
        conference
        division
        position1
        position2
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
        beatToReachRank2
        beatToReachRank3
        beatToReachRank4
        beatToReachRank5
        beatToReachRank6
      }
    }
  }
`;
