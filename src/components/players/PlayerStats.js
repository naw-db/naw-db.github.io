import bigDecimal from "js-big-decimal";

import gradientMultipliers from "data/player_stat_gradients.json";

export const statCategories = [
  "ball_handling",
  "perimeter_shooting",
  "mid_range_shooting",
  "dunk_power",
  "defense",
  "blocking",
  "stealing",
  "strength",
  "speed",
  "stamina"
];

function calculateStat(baseStats, gradientMultiplierSum, totalBonus) {
  const stats = Object.assign({}, baseStats);

  statCategories.forEach(
    category => {
      // stat = baseStat + multiplierSum * gradient
      stats[category] = new bigDecimal(baseStats[`${category}_base`])
        .add(
          gradientMultiplierSum.multiply(
            new bigDecimal(baseStats[`${category}_gradient`])
          )
        )
        .add(totalBonus)
        .round(0, bigDecimal.RoundingModes.UP)
        .getValue();
    }
  );

  return stats;
}

export function calculate(playerStats, targetRank, targetLevel) {
  const startingRank = playerStats.starting_rank;

  if (!(startingRank in gradientMultipliers)) {
    throw new Error(`Invalid startingRank: '${startingRank}'`);
  }

  if (targetRank === startingRank) {
    // multiplierSum = targetLevel * gradientMultiplier(startingRank)  Note: Base Rank Lvl 1 => Base Rank Lvl 2 rewards 2X increase.
    const gradientMultiplierSum = new bigDecimal(targetLevel === "1" ? 0 : targetLevel)
      .multiply(
        new bigDecimal(gradientMultipliers[startingRank][startingRank])
      );

    // stat = baseStat + multiplierSum * gradient
    return calculateStat(
      playerStats,
      gradientMultiplierSum,
      new bigDecimal(0)
    );
  } else if (new bigDecimal(targetRank).subtract(new bigDecimal(startingRank)).compareTo(new bigDecimal(1)) === 0) {
    // targetRank == startingRank + 1

    // multiplierSum = 10 * gradientMultiplier(startingRank) + targetLevel * gradientMultiplier(startingRank + 1)
    const gradientMultiplierSum = new bigDecimal(10)
      .multiply(
        new bigDecimal(gradientMultipliers[startingRank][startingRank])
      )
      .add(
        new bigDecimal(targetLevel)
          .multiply(
            new bigDecimal(
              gradientMultipliers[startingRank][new bigDecimal(startingRank).add(new bigDecimal(1)).getValue()]
            )
          )
      );

    // stat = baseStat + multiplierSum * gradient + bonus
    return calculateStat(
      playerStats,
      gradientMultiplierSum,
      new bigDecimal(gradientMultipliers[startingRank]["bonus"])
    );
  } else if (new bigDecimal(targetRank).subtract(new bigDecimal(startingRank)).compareTo(new bigDecimal(2)) === 0) {
    // targetRank == startingRank + 2

    // multiplierSum = 10 * gradientMultiplier(startingRank)
    //               + 10 * gradientMultiplier(startingRank + 1)
    //               + targetLevel * gradientMultiplier(startingRank + 2)
    const gradientMultiplierSum = new bigDecimal(10)
      .multiply(
        new bigDecimal(gradientMultipliers[startingRank][startingRank])
      )
      .add(
        new bigDecimal(10)
          .multiply(
            new bigDecimal(gradientMultipliers[startingRank][new bigDecimal(startingRank).add(new bigDecimal(1)).getValue()])
          )
      )
      .add(
        new bigDecimal(targetLevel)
          .multiply(
            new bigDecimal(
              gradientMultipliers[startingRank][new bigDecimal(startingRank).add(new bigDecimal(2)).getValue()]
            )
          )
      );

    // stat = baseStat + multiplierSum * gradient + bonus * 2
    return calculateStat(
      playerStats,
      gradientMultiplierSum,
      new bigDecimal(gradientMultipliers[startingRank]["bonus"]).multiply(new bigDecimal(2))
    );
  } else if (new bigDecimal(targetRank).subtract(new bigDecimal(startingRank)).compareTo(new bigDecimal(3)) === 0) {
    // targetRank == startingRank + 3

    // multiplierSum = 10 * gradientMultiplier(startingRank)
    //               + 10 * gradientMultiplier(startingRank + 1)
    //               + 10 * gradientMultiplier(startingRank + 2)
    //               + targetLevel * gradientMultiplier(startingRank + 3)
    const gradientMultiplierSum = new bigDecimal(10)
      .multiply(
        new bigDecimal(gradientMultipliers[startingRank][startingRank])
      )
      .add(
        new bigDecimal(10)
          .multiply(
            new bigDecimal(gradientMultipliers[startingRank][new bigDecimal(startingRank).add(new bigDecimal(1)).getValue()])
          )
      )
      .add(
        new bigDecimal(10)
          .multiply(
            new bigDecimal(
              gradientMultipliers[startingRank][new bigDecimal(startingRank).add(new bigDecimal(2)).getValue()]
            )
          )
      )
      .add(
        new bigDecimal(targetLevel)
          .multiply(
            new bigDecimal(
              gradientMultipliers[startingRank][new bigDecimal(startingRank).add(new bigDecimal(3)).getValue()]
            )
          )
      );

    // stat = baseStat + multiplierSum * gradient + bonus * 3
    return calculateStat(
      playerStats,
      gradientMultiplierSum,
      new bigDecimal(gradientMultipliers[startingRank]["bonus"]).multiply(new bigDecimal(3))
    );
  } else {
    throw new Error(`startingRank '${startingRank}' and targetRank '${targetRank}' must satisfy: startingRank <= targetRank - 3`);
  }
}
