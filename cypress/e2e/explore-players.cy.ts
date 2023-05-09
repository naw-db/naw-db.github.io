import { calculateStat } from "/src/components/players/PlayerStats";

before(() => { cy.visit("/explore-players/"); });

describe(
  "Explore Players page tests",
  () => {
    it(
      "Tests Show Max Stats toggle",
      () => {
        // Memorize initial display data.
        const initialDisplayData: Array<string> = [];

        cy.get(".MuiTableBody-root > tr")
          .then(
            ($trs) => {
              for (let i = 0; i < $trs.length; i++) {
                let rowValue = $trs[i].children[0].textContent;
                
                for (let j = 1; j < $trs[i].children.length; j++) {
                  rowValue += ` ${$trs[i].children[j].textContent || "NULL"}`;
                }

                initialDisplayData.push(rowValue || "NULL");
              }
            }
          );

        // Toggle to show base stats.
        cy.contains("Show Max Stats")
          .click();

        // Assert each row has changed.
        cy.get(".MuiTableBody-root > tr")
          .then(
            ($trs) => {
              for (let i = 0; i < $trs.length; i++) {
                let rowValue = $trs[i].children[0].textContent;
                
                for (let j = 1; j < $trs[i].children.length; j++) {
                  rowValue += ` ${$trs[i].children[j].textContent || "NULL"}`;
                }

                const playerName = $trs[i].children[0].textContent;

                cy.getPlayerData()
                  .then(
                    (playerData) => {
                      const player = playerData.find(e => e.name === playerName);
                      const baseStats = calculateStat(player, player.startingRank, "1");
                      const position = [ player.position1, player.position2 ]
                        .filter(e => e !== "")
                        .join(", ");
                      const beatToRankUp = [
                        player.beatToReachRank2,
                        player.beatToReachRank3,
                        player.beatToReachRank4,
                        player.beatToReachRank5,
                        player.beatToReachRank6
                      ]
                        .filter(e => e !== "")
                        .join(" → ");

                      const expectedRowValue = `${playerName} ${player.levelAvailable} ${player.type} ${player.team} ${player.conference} ${player.division} `
                        + `${position} ${parseInt(baseStats.totalOffense) + parseInt(baseStats.totalDefense) + parseInt(baseStats.totalFitness)} `
                        + `${baseStats.totalOffense} ${baseStats.ballHandling} ${baseStats.perimeterShooting} ${baseStats.midRangeShooting} `
                        + `${baseStats.dunkPower} ${baseStats.totalDefense} ${baseStats.defense} ${baseStats.blocking} ${baseStats.stealing} `
                        + `${baseStats.totalFitness} ${baseStats.strength} ${baseStats.speed} ${baseStats.stamina} ${beatToRankUp}`;

                      expect(expectedRowValue).equal(rowValue);
                    }
                  );
                
              }
            }
          );

        // Toggle again to show max stats.
        cy.contains("Show Max Stats")
          .click();

        // Assert each row has changed back to intial display data.
        cy.get(".MuiTableBody-root > tr")
          .then(
            ($trs) => {
              for (let i = 0; i < $trs.length; i++) {
                let rowValue = $trs[i].children[0].textContent;
                
                for (let j = 1; j < $trs[i].children.length; j++) {
                  rowValue += ` ${$trs[i].children[j].textContent || "NULL"}`;
                }

                expect(rowValue).equal(initialDisplayData[i]);
              }
            }
          );
      }
    );
    it("Tests pagination", () => { cy.testPagination(0); });
    it("Tests Player Name text box filter", () => { cy.testTextBoxFilter(0, "Name", "Green"); });
    it("Tests Lvl Avail. dropdown filter", () => { cy.testSingularSelectDropdown(1, "Lvl Avail.", "7", "equal", "Any"); });
    it("Tests Type dropdown filter", () => { cy.testSingularSelectDropdown(2, "Type", "All-World", "equal", "Any"); });
    it("Tests Team dropdown filter", () => { cy.testMultiSelectDropdown(3, "Team", [ "ATL", "DAL" ], "Any"); });
    it("Tests Conf. dropdown filter", () => { cy.testSingularSelectDropdown(4, "Conf.", "West", "equal", "Any"); });
    it("Tests Division dropdown filter", () => { cy.testMultiSelectDropdown(5, "Division", [ "Central", "Southwest" ], "Any"); });
    it("Tests Pos. dropdown filter", () => { cy.testSingularSelectDropdown(6, "Pos.", "C", "include", "Any"); });
    it("Tests Overall sortable column", () => { cy.testSortableColumn(7, "Overall"); });
    it("Tests Overall Offense sortable column", () => { cy.testSortableColumn(8, "Overall Offense"); });
    it("Tests Ball Handling sortable column", () => { cy.testSortableColumn(9, "Ball Handling"); });
    it("Tests Perimeter Shooting sortable column", () => { cy.testSortableColumn(10, "Perimeter Shooting"); });
    it("Tests Mid-Range Shooting sortable column", () => { cy.testSortableColumn(11, "Mid-Range Shooting"); });
    it("Tests Dunk Power sortable column", () => { cy.testSortableColumn(12, "Dunk Power"); });
    it("Tests Overall Defense sortable column", () => { cy.testSortableColumn(13, "Overall Defense"); });
    it("Tests Defense sortable column", () => { cy.testSortableColumn(14, "Defense"); });
    it("Tests Blocking sortable column", () => { cy.testSortableColumn(15, "Blocking"); });
    it("Tests Stealing sortable column", () => { cy.testSortableColumn(16, "Stealing"); });
    it("Tests Strength sortable column", () => { cy.testSortableColumn(18, "Strength"); });
    it("Tests Speed sortable column", () => { cy.testSortableColumn(19, "Speed"); });
    it("Tests Stamina sortable column", () => { cy.testSortableColumn(20, "Stamina"); });
    it("Tests Beat to Rank Up dropdown filter", () => { cy.testSingularSelectDropdown(21, "Beat to Rank Up", "Russell Westbrook", "include", "Any"); });
  }
);
