import bigDecimal from "js-big-decimal";

import gradients from "data/player_stat_gradients.json";

export const STAT_CATEGORIES = [
  "ballHandling",
  "perimeterShooting",
  "midRangeShooting",
  "dunkPower",
  "defense",
  "blocking",
  "stealing",
  "strength",
  "speed",
  "stamina"
];

export function calculateStat(playerStats, targetRank, targetLevel) {
  const rankUpCount = new bigDecimal(targetRank)
    .subtract(
      new bigDecimal(playerStats.startingRank)
    );

  const displayedStats = {};

  STAT_CATEGORIES.forEach(
    category => {
      // perStatGradient = (maxStat - baseStat - (maxRank - baseRank) * rankUpBonus) / gradientMultiplierSum
      const gradient = new bigDecimal(playerStats[`${category}Max`])
        .subtract(
          new bigDecimal(playerStats[`${category}Base`])
        )
        .subtract(
          new bigDecimal(playerStats.maxRank)
            .subtract(
              new bigDecimal(playerStats.startingRank)
            )
            .multiply(
              new bigDecimal(gradients.startingRank[playerStats.startingRank].rankUpBonus)
            )
        )
        .divide(
          new bigDecimal(gradients.startingRank[playerStats.startingRank].gradientMultiplierSum)
        );

      if (playerStats.startingRank === targetRank && targetLevel === "1") {
        displayedStats[category] = playerStats[`${category}Base`];
      } else if (playerStats.maxRank === targetRank && targetLevel === "10") {
        displayedStats[category] = playerStats[`${category}Max`];
      } else {
        // stat = baseStat + rankUpCount * rankUpBonus + gradientMultiplierSum * gradient
        //
        // gradientMultiplierSum:
        //   when rankUpCount == 0:
        //     gradientMultiplierSum = targetLevel * firstRankGradient (StartingRank Lvl 1 => StartingRank Lvl 2 rewards 2X, so the delta is targetLevel - 1 + 1)
        //   when rankUpCount == 1:
        //     gradientMultiplierSum = 10 * firstLevelGradient + targetLevel * secondRankGradient (StartingRank Lvl 10 => SecondRank Lvl 1 counts as a level-up)
        //   when rankUpCount == 2:
        //     gradientMultiplierSum = 10 * (firstLevelGradient + secondRankGradient) + targetLevel * thirdRankGradient
        //   when rankUpCount == 3:
        //     gradientMultiplierSum = 10 * (firstLevelGradient + secondRankGradient + thirdRankGradient) + targetLevel * fourthRankGradient

        let rankUpGradientMultiplierSum = new bigDecimal(0);
        let currentRank = new bigDecimal(playerStats.startingRank);

        while (new bigDecimal(targetRank).compareTo(currentRank) === 1) {
          rankUpGradientMultiplierSum = rankUpGradientMultiplierSum.add(
            new bigDecimal(
              gradients.startingRank[playerStats.startingRank].gradientAtRank[currentRank.getValue()]
            )
          );

          currentRank = currentRank.add(new bigDecimal(1));
        }

        const stat = new bigDecimal(playerStats[`${category}Base`])  // baseStat
          .add(
            rankUpCount.multiply(
              new bigDecimal(gradients.startingRank[playerStats.startingRank].rankUpBonus)
            )
          )  // rankUpCount * rankUpBonus
          .add(
            new bigDecimal(10).multiply(rankUpGradientMultiplierSum)
              .add(
                new bigDecimal(targetLevel)
                  .multiply(
                    new bigDecimal(gradients.startingRank[playerStats.startingRank].gradientAtRank[targetRank])
                  )
              )
              .multiply(gradient)
          );  // (10 * rankUpGradientMultiplierSum + targetLevel * targetRankGradient) * gradient

        displayedStats[category] = stat.round(1, bigDecimal.RoundingModes.HALF_DOWN).getValue();
      }
    }
  );

  displayedStats.totalOffense = new bigDecimal(displayedStats.ballHandling)
    .add(new bigDecimal(displayedStats.perimeterShooting))
    .add(new bigDecimal(displayedStats.midRangeShooting))
    .add(new bigDecimal(displayedStats.dunkPower))
    .getValue();
  displayedStats.totalDefense = new bigDecimal(displayedStats.defense)
    .add(new bigDecimal(displayedStats.blocking))
    .add(new bigDecimal(displayedStats.stealing))
    .getValue();
  displayedStats.totalFitness = new bigDecimal(displayedStats.strength)
    .add(new bigDecimal(displayedStats.speed))
    .add(new bigDecimal(displayedStats.stamina))
    .getValue();

  return displayedStats;
}
