import { graphql } from "gatsby";
import { Animation, Page, Section, Seo } from "gatsby-theme-portfolio-minimal";
import bigDecimal from "js-big-decimal";
import React from "react";

import { Styles } from "src/components/common/Table";
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

            enriched.total_offense_base = new bigDecimal(enriched.ball_handling_base)
              .add(new bigDecimal(enriched.perimeter_shooting_base))
              .add(new bigDecimal(enriched.mid_range_shooting_base))
              .add(new bigDecimal(enriched.dunk_power_base))
              .getValue();

            enriched.total_defense_base = new bigDecimal(enriched.defense_base)
              .add(new bigDecimal(enriched.blocking_base))
              .add(new bigDecimal(enriched.stealing_base))
              .getValue();

            enriched.total_fitness_base = new bigDecimal(enriched.strength_base)
              .add(new bigDecimal(enriched.speed_base))
              .add(new bigDecimal(enriched.stamina_base))
              .getValue();

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
            <Styles>
              <PlayersTable columns={tableColumns} data={tableData} />
            </Styles>
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
        ball_handling_gradient
        perimeter_shooting_gradient
        mid_range_shooting_gradient
        dunk_power_gradient
        defense_gradient
        blocking_gradient
        stealing_gradient
        strength_gradient
        speed_gradient
        stamina_gradient
      }
    }
  }
`;
