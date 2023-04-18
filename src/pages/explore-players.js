import { graphql } from "gatsby";
import { Animation, Page, Section, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import { columnDefinitions, PlayersTable } from "src/components/players/PlayersTable";

export default function ExplorePlayers({ data }) {
  const tableColumns = React.useMemo(
    () => columnDefinitions,
    []
  );

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
          <Section heading="Explore Players">
            <PlayersTable columns={tableColumns} data={tableData} />
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
      }
    }
  }
`;
