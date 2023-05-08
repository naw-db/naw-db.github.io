import { calculateStat } from "/src/components/players/PlayerStats";

Cypress.Commands.add(
  "testUrlAnchor",
  (pageUrl: string, anchor: string, startingYGreaterThan: number, endingYLessThan: number) => {
    cy.visit(pageUrl);

    cy.get(`#${anchor}`)
      .then($section => $section[0].getBoundingClientRect().y)
      .should("be.greaterThan", startingYGreaterThan);

    cy.get(`#${anchor}`)
      .find("a")
      .click();

    cy.get(`#${anchor}`)
      .then($section => $section[0].getBoundingClientRect().y)
      .should("be.lessThan", endingYLessThan);
  }
);

Cypress.Commands.add(
  "testTabAnchor",
  (pageUrl: string, anchor: string) => {
    cy.visit(`${pageUrl}?tab=${anchor}`);

    cy.get("[aria-selected='true']")
      .should("have.id", anchor);
  }
);

Cypress.Commands.add(
  "testPagination",
  (tableIndex: number) => {
    cy.get(".MuiTablePagination-select")
      .eq(tableIndex)
      .then(
        ($pageSize) => {
          const defaultPageSize = parseInt($pageSize.text());

          cy.get(".MuiTablePagination-displayedRows")
            .eq(tableIndex)
            .then(
              ($displayedRowSummary) => {
                // "1-XX of YY" - YY is the number of total rows.
                const initialDisplayedRowSummary = $displayedRowSummary.text();
                const totalRows = parseInt($displayedRowSummary.text().split(" ")[2]);

                let remainingRowsCount = totalRows;
                let nextPageClicksCount = 0;

                // Click on Next Page until last page is reached.
                while (remainingRowsCount > defaultPageSize) {
                  // Assert current page is full.
                  cy.get(".MuiTableBody-root")
                    .eq(tableIndex)
                    .children()
                    .should("have.length", defaultPageSize);

                  // Go to next page.
                  cy.get("[aria-label='Go to next page']")
                    .eq(tableIndex)
                    .click();

                  // Assert row summary has changed.
                  cy.get(".MuiTablePagination-displayedRows")
                    .eq(tableIndex)
                    .should(
                      ($updatedDisplayedRowSummary) => {
                        expect($updatedDisplayedRowSummary.text()).not.equal(initialDisplayedRowSummary);
                      }
                    );
                  cy.get(".MuiTablePagination-displayedRows")
                    .eq(tableIndex)
                    .should(
                      ($updatedDisplayedRowSummary) => {
                        expect($updatedDisplayedRowSummary.text()).not.equal(initialDisplayedRowSummary);
                      }
                    );

                  remainingRowsCount -= defaultPageSize;
                  nextPageClicksCount++;
                }

                // Assert size of last page.
                cy.get(".MuiTableBody-root")
                  .eq(tableIndex)
                  .children()
                  .should("have.length", remainingRowsCount);

                // Go back to first page by clicking on Previous Page.
                for (let i = 0; i < nextPageClicksCount; i++) {
                  cy.get("[aria-label='Go to previous page']")
                    .eq(tableIndex)
                    .click();
                }

                // Assert row summary of first page has not changed.
                cy.get(".MuiTablePagination-displayedRows")
                  .eq(tableIndex)
                  .should(
                    ($updatedDisplayedRowSummary) => {
                      expect($updatedDisplayedRowSummary.text()).equal(initialDisplayedRowSummary);
                    }
                  );

                // Change page size.
                cy.get(".MuiTablePagination-select")
                  .eq(tableIndex)
                  .click();

                cy.get(".MuiTablePagination-menuItem")
                  .eq(tableIndex)
                  .last()
                  .click();

                // Assert size of current page has changed.
                cy.get(".MuiTablePagination-select")
                  .eq(tableIndex)
                  .then(
                    ($updatedPageSize) => {
                      const maxPageSize = parseInt($updatedPageSize.text());

                      cy.get(".MuiTableBody-root")
                        .eq(tableIndex)
                        .children()
                        .should("have.length", totalRows < maxPageSize ? totalRows : maxPageSize);
                    }
                  );

                // Reset page size.
                cy.get(".MuiTablePagination-select")
                  .eq(tableIndex)
                  .click();

                cy.get(".MuiTablePagination-menuItem")
                  .contains(defaultPageSize)
                  .click();
              }
            );
        }
      );
  }
);

Cypress.Commands.add(
  "testTextBoxFilter",
  (columnIndex: number, textBoxName: string, targetText: string) => {
    cy.get(".MuiTablePagination-select")
      .then(
        ($dropdown) => {
          // Memorize initial page size.
          const pageSize = parseInt($dropdown.text());

          cy.get("tbody")
            .children()
            .should("have.length", pageSize);

          // Type in text box to filter.
          cy.contains(textBoxName)
            .parent()
            .find("input")
            .type(targetText);

          // Assert table has been filtered.
          cy.get("tbody")
            .children()
            .should("have.length.at.least", 1)
            .each(
              ($tr) => {
                expect($tr.children()[columnIndex].textContent).includes(targetText);
              }
            );

          // Clear text box.
          cy.contains(textBoxName)
            .parent()
            .find("input")
            .clear();

          // Assert table has been restored.
          cy.get("tbody")
            .children()
            .should("have.length", pageSize);
        }
      );
  }
);

Cypress.Commands.add(
  "testSingularSelectDropdown",
  (columnIndex: number, dropdownText: string, targetOptionText: string, resultOperator: string, resetOptionText: string) => {
    cy.get(".MuiTablePagination-select")
      .then(
        ($dropdown) => {
          // Memorize intial page size.
          const pageSize = parseInt($dropdown.text());

          cy.get("tbody")
            .children()
            .should("have.length", pageSize);

          // Click on dropdown and select the specified option.
          cy.get(".MuiFormHelperText-root")
            .contains(dropdownText)
            .parent()
            .find(".MuiSelect-select")
            .click();

          cy.get(".MuiFormHelperText-root")
            .contains(dropdownText)
            .parent()
            .get(".MuiListItemText-root")
            .contains(targetOptionText)
            .click();

          // Assert table has been filtered.
          cy.get("tbody")
            .children()
            .should("have.length.at.least", 1)
            .each(
              ($tr) => {
                switch (resultOperator) {
                  case "equal":
                    expect($tr.children()[columnIndex].textContent).equal(targetOptionText);
                    break;
                  case "include":
                    expect($tr.children()[columnIndex].textContent).include(targetOptionText);
                    break;
                }
              }
            );

          // Clear dropdown.
          cy.get(".MuiFormHelperText-root")
            .contains(dropdownText)
            .parent()
            .find(".MuiSelect-select")
            .click();

          cy.contains(targetOptionText)
            .parent()
            .get(".MuiListItemText-root")
            .contains(resetOptionText)
            .click();

          // Assert table has been restored.
          cy.get("tbody")
            .children()
            .should("have.length", pageSize);
        }
      );
  }
);

Cypress.Commands.add(
  "testMultiSelectDropdown",
  (columnIndex: number, dropdownText: string, targetOptionTexts: Array<string>, resetOptionText: string) => {
    cy.get(".MuiTablePagination-select")
      .then(
        ($dropdown) => {
          // Memorize initial page size.
          const pageSize = parseInt($dropdown.text());

          cy.get("tbody")
            .children()
            .should("have.length", pageSize);

          // Click on dropdown and select the specified options.
          cy.contains(dropdownText)
            .parent()
            .find(".MuiSelect-select")
            .click();

          cy.wrap(targetOptionTexts)
            .each(
              (targetOptionText: string) => {
                cy.contains(dropdownText)
                  .parent()
                  .get(".MuiListItemText-root")
                  .contains(targetOptionText)
                  .click();
              }
            );

          // Assert table has been filtered.
          cy.get("tbody")
            .children()
            .should("have.length.at.least", 1)
            .each(
              ($tr) => {
                expect($tr.children()[columnIndex].textContent).to.be.oneOf(targetOptionTexts);
              }
            );

          // Clear dropdown.
          cy.contains(dropdownText)
            .parent()
            .get(".MuiListItemText-root")
            .contains(resetOptionText)
            .click()
            .type("{esc}");

          // Assert table has been restored.
          cy.get("tbody")
            .children()
            .should("have.length", pageSize);
        }
      );
  }
);

Cypress.Commands.add(
  "testSortableColumn",
  (columnIndex: number, columnHoverText: string) => {
    cy.get(`[title='${columnHoverText}']`)
      .each(
        ($th) => {
          // Assert column is sorted in ascending order after first click.
          let ascendingOrderAssertionStarted = false;
          let lastAscendingValue = 0;

          cy.wrap($th)
            .click();

          cy.get("tbody")
            .children()
            .each(
              ($tr) => {
                const currentValue = parseFloat($tr.children()[columnIndex].textContent || "NaN");

                if (!ascendingOrderAssertionStarted) {
                  if (!Number.isNaN(currentValue)) {
                    ascendingOrderAssertionStarted = true;
                  } else {
                    return;
                  }
                }

                expect(currentValue).least(lastAscendingValue);
                lastAscendingValue = currentValue;
              }
            );

          // Assert column is sorted in descending order after second click.
          let descendingOrderAssertionEnded = false;
          let lastDescendingValue = Number.MAX_VALUE;

          cy.wrap($th)
            .click();

          cy.get("tbody")
            .children()
            .each(
              ($tr) => {
                const currentValue = parseFloat($tr.children()[columnIndex].textContent || "NaN");

                if (descendingOrderAssertionEnded) {
                  if (!Number.isNaN(currentValue)) {
                    // Fail the assertion.
                    expect(currentValue).equal(NaN);
                  } else {
                    return;
                  }
                }

                if (Number.isNaN(currentValue)) {
                  descendingOrderAssertionEnded = true;
                  return;
                }

                expect(currentValue).most(lastDescendingValue);
                lastDescendingValue = currentValue;
              }
            );
        }
      );
  }
);

Cypress.Commands.add(
  "getPlayerData",
  () => {
    cy.readFile("./content/data/players.csv")
      .then(
        (content) => {
          return cy.task("csvToJson", { csv: content });
        }
      );
  }
);

Cypress.Commands.add(
  "getPlayerComparisonChartLabels",
  () => {
    let labels;

    cy.get(".BarSeriesLabel")
    .then(
      ($labels) => {
        labels = $labels[0].textContent;

        for (let i = 1; i < $labels.length; i++) {
          labels += ` ${$labels[i].textContent}`;
        }

        return labels;
      }
    );
  }
);

Cypress.Commands.add(
  "calculateExpectedPlayerComparisonChartLabels",
  (playerData: Array<any>, playerOne: string, playerOneRank: string, playerOneLevel: string, playerTwo: string, playerTwoRank: string, playerTwoLevel: string) => {
    const playerOneData = playerData.find(e => e.name === playerOne);
    const playerTwoData = playerData.find(e => e.name === playerTwo);

    const playerOneStats = calculateStat(playerOneData, playerOneRank, playerOneLevel);
    const playerTwoStats = calculateStat(playerTwoData, playerTwoRank, playerTwoLevel);

    const aggregatedStats = `${playerOneStats.totalFitness} ${playerOneStats.totalDefense} ${playerOneStats.totalOffense} ` +
      `${playerTwoStats.totalFitness} ${playerTwoStats.totalDefense} ${playerTwoStats.totalOffense} ` +
      `${playerOneStats.stamina} ${playerOneStats.speed} ${playerOneStats.strength} ` +
      `${playerOneStats.stealing} ${playerOneStats.blocking} ${playerOneStats.defense} ` +
      `${playerOneStats.dunkPower} ${playerOneStats.midRangeShooting} ${playerOneStats.perimeterShooting} ${playerOneStats.ballHandling} ` +
      `${playerTwoStats.stamina} ${playerTwoStats.speed} ${playerTwoStats.strength} ` +
      `${playerTwoStats.stealing} ${playerTwoStats.blocking} ${playerTwoStats.defense} ` +
      `${playerTwoStats.dunkPower} ${playerTwoStats.midRangeShooting} ${playerTwoStats.perimeterShooting} ${playerTwoStats.ballHandling}`;

    const expectedLabel = aggregatedStats.replaceAll(".0", "");

    return cy.wrap(expectedLabel);
  }
);
