describe(
  "Gear - Balls tab tests",
  () => {
    it(
      "Tests anchor.",
      () => {
        cy.visit("/gear/?tab=balls");

        cy.get("[aria-selected='true']")
          .should("have.id", "balls");
      }
    );
    it("Tests pagination.", () => { cy.testPagination(); });
    it("Tests Name text box filter.", () => { cy.testTextBoxFilter(0, "Name", "Green"); });
    it("Tests Lvl Avail. dropdown filter.", () => { cy.testSingularSelectDropdown(1, "Lvl Avail.", "3", "equal", "Any"); });
    it("Tests Brand dropdown filter.", () => { cy.testSingularSelectDropdown(2, "Brand", "Wilson", "equal", "Any"); });
    it("Tests Pattern dropdown filter.", () => { cy.testSingularSelectDropdown(3, "Pattern", "Graffiti", "equal", "Any"); });
    it("Tests Color dropdown filter.", () => { cy.testSingularSelectDropdown(4, "Color", "Blue", "include", "Any"); });
    it("Tests Rarity dropdown filter.", () => { cy.testSingularSelectDropdown(5, "Rarity", "All-Star", "equal", "Any"); });
    it("Tests Price sortable column.", () => { cy.testSortableColumn(6, "Price"); });
  }
);
