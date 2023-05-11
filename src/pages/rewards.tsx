import { graphql } from "gatsby";
import { Animation, Page, Section, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import { RewardsTabs } from "/src/components/rewards/RewardsTabs";

export default function RewardsPage({ data }: { data: any; }) {
  return (
    <>
      <Seo title="Rewards" />
      <Page>
        <Animation type="fadeUp">
          <Section>
            <RewardsTabs data={data}/>
          </Section>
        </Animation>
      </Page>
    </>
  );
}

export const pageQuery = graphql`
  query pageQuery {
    allTeamLevelRewardsCsv {
      nodes {
        teamLevel
        teamRep
        playersRecruited
        playerLevelRequirements
        metersTraveled
        creds
        starTokens
        cash
        xpWildcards
        energyDrinks
        rosterSlots
      }
    }
    allDropZoneRewardsCsv {
      nodes {
        dropZone
        rechargeTime
        dailyLimit
        primaryDrop
        secondaryDropCreds
        secondaryDropEnergyDrinks
        secondaryDropBoosts
        secondaryDropXpWildcards
        secondaryDropStarTokens
        secondaryDropArenaPasses
      }
    }
    allEncounterRewardsCsv {
      nodes {
        teamLevel
        opponentTier
        credsToPlay
        teamRepUponWin
        credsUponWin
        playerXpUponWin
        replayCost
      }
    }
    allRuleTheCourtRewardsCsv {
      nodes {
        wins
        teamRep
        starTokens
        cash
        creds
        timeRequired
      }
    }
    allWeeklyArenaTournamentRewardsCsv {
      nodes {
        type
        when
        requireArenaPass
        playersAllowed
        winsRequired
        lossesToBeEliminated
        pointsToWin
        completionRings
        leaderboardRings
      }
    }
    allDailyArenaTournamentRewardsCsv {
      nodes {
        type
        when
        requireArenaPass
        playersAllowed
        winsRequired
        lossesToBeEliminated
        pointsToWin
        completionRings
        leaderboardRings
      }
    }
    allDailyArenaTournamentRewardsByTeamLevelCsv {
      nodes {
        teamLevel
        requireArenaPass
        regularThirdWinReward
        sundaySecondWinReward
        sundayThirdWinReward
        mondayLeaderboardBonus
        tuesdayLeaderboardBonus
        wednesdayLeaderboardBonus
        thursdayLeaderboardBonus
        fridayLeaderboardBonus
        saturdayLeaderboardBonus
        sundayLeaderboardBonus
      }
    }
    allPracticeCourtRewardsCsv {
      nodes {
        teamLevel
        type
        playerXpVsStarter
        playerXpVsAllStar
        playerXpVsAllWorld
      }
    }
    allOneOnOneRewardsCsv {
      nodes {
        teamLevel
        type
        ladderPosition
        credsToPlay
        credsUponWin
        teamRepUponWinVsStarter
        playerXpUponWinVsStarter
        teamRepUponWinVsAllStar
        playerXpUponWinVsAllStar
        teamRepUponWinVsAllWorld
        playerXpUponWinVsAllWorld
      }
    }
    allMilestoneRewardsCsv {
      nodes {
        milestone
        description
        rings
        creds
        cash
        xpWildcards
        energyDrinks
        notes
      }
    }
    allReferralRewardsCsv {
      nodes {
        task
        referralRecipientReward
        referralRecipientRewardQuantity
        referrerReward
        referrerRewardQuantity
      }
    }
  }
`;
