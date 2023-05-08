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
              cy.calculateExpectedPlayerComparisonChartLabels(playerData as Array<any>, "Stephen Curry", "6", "10", "LeBron James", "6", "10")
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

              cy.calculateExpectedPlayerComparisonChartLabels(playerData as Array<any>, "Jimmy Butler", "3", "1", "Luka Doncic", "3", "1")
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
      "Tests query parameters",
      () => {
        cy.visit("/compare-players/?playerOne=Russell%20Westbrook&playerOneRank=2&playerOneLevel=5&playerTwo=Draymond%20Green&playerTwoRank=2&playerTwoLevel=5");

        cy.getPlayerData()
          .then(
            (playerData) => {
              cy.calculateExpectedPlayerComparisonChartLabels(playerData as Array<any>, "Russell Westbrook", "2", "5", "Draymond Green", "2", "5")
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
