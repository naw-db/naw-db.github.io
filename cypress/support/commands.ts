Cypress.Commands.add(
  "testPagination",
  (pageUrl: string) => {
    cy.visit(pageUrl);

    cy.get(".MuiTablePagination-toolbar")
      .get(".MuiTablePagination-select")
      .then(
        ($pageSize) => {
          const defaultPageSize = parseInt($pageSize.text());

          cy.get(".MuiTablePagination-displayedRows")
            .then(
              ($displayedRowSummary) => {
                // "1-XX of YY" - YY is the number of total rows.
                const initialDisplayedRowSummary = $displayedRowSummary.text();
                const totalRows = parseInt($displayedRowSummary.text().slice(8));

                let remainingRowsCount = totalRows;
                let nextPageClicksCount = 0;

                while (remainingRowsCount > defaultPageSize) {
                  cy.get(".MuiTableBody-root")
                    .children()
                    .should("have.length", defaultPageSize);

                  cy.get(".MuiIconButton-root")
                    .get("[aria-label='Go to next page']")
                    .click();

                  cy.get(".MuiTablePagination-displayedRows")
                    .should(
                      ($updatedDisplayedRowSummary) => {
                        expect($updatedDisplayedRowSummary.text()).not.equal(initialDisplayedRowSummary);
                      }
                    );

                  remainingRowsCount -= defaultPageSize;
                  nextPageClicksCount++;
                }

                cy.get(".MuiTableBody-root")
                  .children()
                  .should("have.length", remainingRowsCount);

                for (let i = 0; i < nextPageClicksCount; i++) {
                  cy.get(".MuiIconButton-root")
                    .get("[aria-label='Go to previous page']")
                    .click();
                }

                cy.get(".MuiTablePagination-displayedRows")
                  .should(
                    ($updatedDisplayedRowSummary) => {
                      expect($updatedDisplayedRowSummary.text()).equal(initialDisplayedRowSummary);
                    }
                  );

                cy.get(".MuiTablePagination-select")
                  .click();

                cy.get(".MuiTablePagination-menuItem")
                  .last()
                  .click();

                cy.get(".MuiTablePagination-toolbar")
                  .get(".MuiTablePagination-select")
                  .then(
                    ($updatedPageSize) => {
                      const maxPageSize = parseInt($updatedPageSize.text());

                      cy.get(".MuiTableBody-root")
                        .children()
                        .should("have.length", totalRows < maxPageSize ? totalRows : maxPageSize);
                    }
                  );
              }
            );
        }
      );
  }
);

Cypress.Commands.add(
  "testTextBoxFilter",
  (pageUrl: string, columnIndex: number, textBoxName: string, targetText: string) => {
    cy.visit(pageUrl);

    cy.get(".MuiTablePagination-select")
      .then(
        ($dropdown) => {
          const pageSize = parseInt($dropdown.text());

          cy.get("tbody")
            .children()
            .should("have.length", pageSize);

          cy.contains(textBoxName)
            .parent()
            .find("input")
            .type(targetText);

          cy.get("tbody")
            .children()
            .should("have.length.greaterThan", 1)
            .each(
              ($tr) => {
                expect($tr.children()[columnIndex].textContent).includes(targetText);
              }
            );

          cy.contains(textBoxName)
            .parent()
            .find("input")
            .clear();

          cy.get("tbody")
            .children()
            .should("have.length", pageSize);
        }
      );
  }
);

Cypress.Commands.add(
  "testSingularSelectDropdown",
  (pageUrl: string, columnIndex: number, dropdownText: string, targetOptionText: string, resultOperator: string, resetOptionText: string) => {
    cy.visit(pageUrl);

      cy.get(".MuiTablePagination-select")
        .then(
          ($dropdown) => {
          const pageSize = parseInt($dropdown.text());

          cy.get("tbody")
            .children()
            .should("have.length", pageSize);

          cy.contains(dropdownText)
            .parent()
            .find(".MuiSelect-select")
            .click();

          cy.contains(dropdownText)
            .parent()
            .get(".MuiListItemText-root")
            .contains(targetOptionText)
            .click();

          cy.get("tbody")
            .children()
            .should("have.length.greaterThan", 1)
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

          cy.contains(dropdownText)
            .parent()
            .find(".MuiSelect-select")
            .click();

          cy.contains(targetOptionText)
            .parent()
            .get(".MuiListItemText-root")
            .contains(resetOptionText)
            .click();

          cy.get("tbody")
            .children()
            .should("have.length", pageSize);
        }
      );
  }
);

Cypress.Commands.add(
  "testMultiSelectDropdown",
  (pageUrl: string, columnIndex: number, dropdownText: string, targetOptionTexts: Array<string>, resetOptionText: string) => {
    cy.visit(pageUrl);

    cy.get(".MuiTablePagination-select")
      .then(
        ($dropdown) => {
          const pageSize = parseInt($dropdown.text());

          cy.get("tbody")
            .children()
            .should("have.length", pageSize);

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

          cy.get("tbody")
            .children()
            .should("have.length.greaterThan", 1)
            .each(
              ($tr) => {
                expect($tr.children()[columnIndex].textContent).to.be.oneOf(targetOptionTexts);
              }
            );

          cy.contains(dropdownText)
            .parent()
            .get(".MuiListItemText-root")
            .contains(resetOptionText)
            .click();

          cy.get("tbody")
            .children()
            .should("have.length", pageSize);
        }
      );
  }
);

Cypress.Commands.add(
  "testSortableColumn",
  (pageUrl: string, columnIndex: number, columnHoverText: string) => {
    cy.visit(pageUrl);

    cy.get(`[title='${columnHoverText}']`)
      .each(
        ($th) => {
          let lastAscendingValue = 0;

          cy.wrap($th)
            .click();

          cy.get("tbody")
            .children()
            .each(
              ($tr) => {
                const currentValue = parseFloat($tr.children()[columnIndex].textContent || "0");

                expect(currentValue).least(lastAscendingValue);
                lastAscendingValue = currentValue;
              }
            );

          let lastDescendingValue = Number.MAX_VALUE;

          cy.wrap($th)
            .click();

          cy.get("tbody")
            .children()
            .each(
              ($tr) => {
                const currentValue = parseFloat($tr.children()[columnIndex].textContent || `${Number.MAX_VALUE}`);

                expect(currentValue).most(lastDescendingValue);
                lastDescendingValue = currentValue;
              }
            );
        }
      )
  }
);
