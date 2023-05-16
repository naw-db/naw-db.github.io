describe(
  "Compare Players page tests",
  () => {
    it(
      "Tests Select Players dropdown and rendered chart.",
      () => {
        cy.getPlayerData()
          .then(
            (playerData) => {
              cy.visit("/compare-players/");

              // Assert initial display data.
              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Stephen Curry", "LeBron James" ],
                [ "6", "6" ],
                [ "10", "10"]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );

              // Change player one.
              cy.get("#mui-component-select-playerOne")
                .click();
              cy.contains("Jimmy Butler")
                .click();

              // Change player one rank.
              cy.get("#mui-component-select-playerOneRank")
                .click();
              cy.focused()
                .parent()
                .children()
                .first()
                .click();

              // Change player one level.
              cy.get("#mui-component-select-playerOneLevel")
                .click();
              cy.focused()
                .parent()
                .children()
                .first()
                .click();

              // Change player two.
              cy.get("#mui-component-select-playerTwo")
                .click();
              cy.contains("Luka Doncic")
                .click();

              // Change player two rank.
              cy.get("#mui-component-select-playerTwoRank")
                .click();
              cy.focused()
                .parent()
                .children()
                .first()
                .click();

              // Change player two level.
              cy.get("#mui-component-select-playerTwoLevel")
                .click();
              cy.focused()
                .parent()
                .children()
                .first()
                .click();

              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Jimmy Butler", "Luka Doncic" ],
                [ "3", "3" ],
                [ "1", "1" ]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );
            }
          );
      }
    );
    it(
      "Tests adding a third player.",
      () => {
        cy.getPlayerData()
          .then(
            (playerData) => {
              // Add a third player.
              cy.contains("Add")
                .click();

              // Change player one.
              cy.get("#mui-component-select-playerThree")
                .click();
              cy.contains("Devin Booker")
                .click();

              // Change player one rank.
              cy.get("#mui-component-select-playerThreeRank")
                .click();
              cy.focused()
                .parent()
                .children()
                .first()
                .click();

              // Change player one level.
              cy.get("#mui-component-select-playerThreeLevel")
                .click();
              cy.focused()
                .parent()
                .children()
                .first()
                .click();

              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Jimmy Butler", "Luka Doncic", "Devin Booker" ],
                [ "3", "3", "3" ],
                [ "1", "1", "1" ]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );
            }
          );
      }
    );
    it(
      "Tests adding a fourth player.",
      () => {
        cy.getPlayerData()
          .then(
            (playerData) => {
              // Add a third player.
              cy.contains("Add")
                .click();

              // Change player one.
              cy.get("#mui-component-select-playerFour")
                .click();
              cy.contains("Anthony Edwards")
                .click();

              // Change player one rank.
              cy.get("#mui-component-select-playerFourRank")
                .click();
              cy.focused()
                .parent()
                .children()
                .first()
                .click();

              // Change player one level.
              cy.get("#mui-component-select-playerFourLevel")
                .click();
              cy.focused()
                .parent()
                .children()
                .first()
                .click();

              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Jimmy Butler", "Luka Doncic", "Devin Booker", "Anthony Edwards" ],
                [ "3", "3", "3", "2" ],
                [ "1", "1", "1", "1" ]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );

              // Assert Add button is removed.
              cy.contains("Add")
                .should("not.exist");
            }
          );
      }
    );
    it(
      "Tests query parameters with two players",
      () => {
        cy.visit(
          "/compare-players/?playerOne=Russell%20Westbrook&playerOneRank=2&playerOneLevel=5&" +
          "playerTwo=Draymond%20Green&playerTwoRank=2&playerTwoLevel=5"
        );

        cy.getPlayerData()
          .then(
            (playerData) => {
              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Russell Westbrook", "Draymond Green" ],
                [ "2", "2" ],
                [ "5", "5" ]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );
            }
          );
      }
    );
    it(
      "Tests query parameters with three players",
      () => {
        cy.visit(
          "/compare-players/?playerOne=Jimmy%20Butler&playerOneRank=5&playerOneLevel=7&" +
          "playerTwo=James%20Harden&playerTwoRank=5&playerTwoLevel=7&" +
          "playerThree=Anthony%20Davis&playerThreeRank=4&playerThreeLevel=7"
        );

        cy.getPlayerData()
          .then(
            (playerData) => {
              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Jimmy Butler", "James Harden", "Anthony Davis" ],
                [ "5", "5", "4" ],
                [ "7", "7", "7" ]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );
            }
          );
      }
    );
    it(
      "Tests query parameters with four players",
      () => {
        cy.visit(
          "/compare-players/?playerOne=Jimmy%20Butler&playerOneRank=5&playerOneLevel=7&" +
          "playerTwo=James%20Harden&playerTwoRank=5&playerTwoLevel=7&" +
          "playerThree=Anthony%20Davis&playerThreeRank=4&playerThreeLevel=7&" +
          "playerFour=Anthony%20Edwards&playerFourRank=4&playerFourLevel=7"
        );

        cy.getPlayerData()
          .then(
            (playerData) => {
              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Jimmy Butler", "James Harden", "Anthony Davis", "Anthony Edwards" ],
                [ "5", "5", "4", "4" ],
                [ "7", "7", "7", "7" ]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );
            }
          );
      }
    );
    it(
      "Tests query parameters with two of the same player",
      () => {
        cy.visit(
          "/compare-players/?playerOne=Damian%20Lillard&playerOneRank=3&playerOneLevel=3&" +
          "playerTwo=Damian%20Lillard&playerTwoRank=4&playerTwoLevel=4"
        );

        cy.get(".MuiChip-root")
          .should("have.length", 2)
          .should("contain.text", "D. Lillard")
          .should("contain.text", "D. Lillard (2)");

        cy.getPlayerData()
          .then(
            (playerData) => {
              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Damian Lillard", "Damian Lillard" ],
                [ "3", "4" ],
                [ "3", "4" ]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );
            }
          );
      }
    );
    it(
      "Tests query parameters with three of the same player",
      () => {
        cy.visit(
          "/compare-players/?playerOne=Damian%20Lillard&playerOneRank=3&playerOneLevel=3&" +
          "playerTwo=Damian%20Lillard&playerTwoRank=4&playerTwoLevel=4&" +
          "playerThree=Damian%20Lillard&playerThreeRank=5&playerThreeLevel=5"
        );

        cy.get(".MuiChip-root")
          .should("have.length", 3)
          .should("contain.text", "D. Lillard")
          .should("contain.text", "D. Lillard (2)")
          .should("contain.text", "D. Lillard (3)");

        cy.getPlayerData()
          .then(
            (playerData) => {
              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Damian Lillard", "Damian Lillard", "Damian Lillard" ],
                [ "3", "4", "5" ],
                [ "3", "4", "5" ]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );
            }
          );
      }
    );
    it(
      "Tests query parameters with four of the same player",
      () => {
        cy.visit(
          "/compare-players/?playerOne=Damian%20Lillard&playerOneRank=3&playerOneLevel=3&" +
          "playerTwo=Damian%20Lillard&playerTwoRank=4&playerTwoLevel=4&" +
          "playerThree=Damian%20Lillard&playerThreeRank=5&playerThreeLevel=5&" +
          "playerFour=Damian%20Lillard&playerFourRank=6&playerFourLevel=6"
        );

        cy.get(".MuiChip-root")
          .should("have.length", 4)
          .should("contain.text", "D. Lillard")
          .should("contain.text", "D. Lillard (2)")
          .should("contain.text", "D. Lillard (3)")
          .should("contain.text", "D. Lillard (4)");

        cy.getPlayerData()
          .then(
            (playerData) => {
              cy.calculateExpectedPlayerComparisonChartLabels(
                playerData as Array<any>,
                [ "Damian Lillard", "Damian Lillard", "Damian Lillard", "Damian Lillard" ],
                [ "3", "4", "5", "6" ],
                [ "3", "4", "5", "6" ]
              )
                .then(
                  (expectedLabels) => {
                    cy.getPlayerComparisonChartLabels()
                      .should("eq", expectedLabels);
                  }
                );
            }
          );
      }
    );
  }
);
