import { graphql } from "gatsby";
import { Animation, Page, Section, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import { GearTabs } from "src/components/gear/GearTabs";

export default function Gear({ data }) {
  return (
    <>
      <Seo title="Gear" />
      <Page useSplashScreenAnimation>
        <Animation type="fadeUp">
          <Section>
            <GearTabs data={data}/>
          </Section>
        </Animation>
      </Page>
    </>
  );
}

export const pageQuery = graphql`
  query pageQuery {
    allShirtsCsv {
      nodes {
        id
        name
        levelAvailable
        brand
        style
        color
        rarity
        price
        level1Offense
        level1Defense
        level1Fitness
        level1QuantityRequiredToUpgrade
        level1CredsRequiredToUpgrade
        level2Offense
        level2Defense
        level2Fitness
        level2QuantityRequiredToUpgrade
        level2CredsRequiredToUpgrade
        level3Offense
        level3Defense
        level3Fitness
        level3QuantityRequiredToUpgrade
        level3CredsRequiredToUpgrade
        level4Offense
        level4Defense
        level4Fitness
        level4QuantityRequiredToUpgrade
        level4CredsRequiredToUpgrade
        level5Offense
        level5Defense
        level5Fitness
      }
    }
    allPantsCsv {
      nodes {
        id
        name
        levelAvailable
        brand
        style
        color
        rarity
        price
        level1Offense
        level1Defense
        level1Fitness
        level1QuantityRequiredToUpgrade
        level1CredsRequiredToUpgrade
        level2Offense
        level2Defense
        level2Fitness
        level2QuantityRequiredToUpgrade
        level2CredsRequiredToUpgrade
        level3Offense
        level3Defense
        level3Fitness
        level3QuantityRequiredToUpgrade
        level3CredsRequiredToUpgrade
        level4Offense
        level4Defense
        level4Fitness
        level4QuantityRequiredToUpgrade
        level4CredsRequiredToUpgrade
        level5Offense
        level5Defense
        level5Fitness
      }
    }
    allSneakersCsv {
      nodes {
        id
        name
        levelAvailable
        brand
        style
        color
        rarity
        price
        level1Offense
        level1Defense
        level1Fitness
        level1QuantityRequiredToUpgrade
        level1CredsRequiredToUpgrade
        level2Offense
        level2Defense
        level2Fitness
        level2QuantityRequiredToUpgrade
        level2CredsRequiredToUpgrade
        level3Offense
        level3Defense
        level3Fitness
        level3QuantityRequiredToUpgrade
        level3CredsRequiredToUpgrade
        level4Offense
        level4Defense
        level4Fitness
        level4QuantityRequiredToUpgrade
        level4CredsRequiredToUpgrade
        level5Offense
        level5Defense
        level5Fitness
      }
    }
    allHeadwearCsv {
      nodes {
        id
        name
        levelAvailable
        brand
        style
        color
        rarity
        price
      }
    }
    allEyewearCsv {
      nodes {
        id
        type
        levelAvailable
        brand
        style
        color
        rarity
        price
      }
    }
    allBallsCsv {
      nodes {
        id
        name
        levelAvailable
        brand
        pattern
        color
        rarity
        price
      }
    }
    allSocksCsv {
      nodes {
        id
        name
        levelAvailable
        brand
        color
        rarity
        price
      }
    }
  }
`;
