import { graphql } from "gatsby";
import { Animation, Page, Section, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import { columnDefinitions, PlayersTable } from "src/components/players/PlayersTable";

export default function Players({ data }) {
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

            enriched.position = enriched.position_2 === ""
              ? enriched.position_1
              : `${enriched.position_1}, ${enriched.position_2}`;

            return enriched;
          }
        );
    },
    []
  );

  return (
    <>
      <Seo title="Players" />
      <Page useSplashScreenAnimation>
        <Animation type="fadeUp">
          <Section heading="Players">
            <PlayersTable columns={tableColumns} data={tableData} />
          </Section>
        </Animation>
      </Page>
    </>
  );
};

export const pageQuery = graphql`
  query pageQuery {
    allPlayersCsv {
      nodes {
        id
        name
        level_available
        starting_rank
        max_rank
        type
        team
        conference
        division
        position_1
        position_2
        ball_handling_base
        perimeter_shooting_base
        mid_range_shooting_base
        dunk_power_base
        defense_base
        blocking_base
        stealing_base
        strength_base
        speed_base
        stamina_base
        ball_handling_max
        perimeter_shooting_max
        mid_range_shooting_max
        dunk_power_max
        defense_max
        blocking_max
        stealing_max
        strength_max
        speed_max
        stamina_max
      }
    }
  }
`;
