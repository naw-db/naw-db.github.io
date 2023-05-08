describe(
  "Gear - Headwear tab tests",
  () => {
    it(
      "Tests anchor.",
      () => {
        cy.visit("/gear/?tab=headwear");

        cy.get("[aria-selected='true']")
          .should("have.id", "headwear");
      }
    );
    it("Tests pagination.", () => { cy.testPagination(); });
    it("Tests Name text box filter.", () => { cy.testTextBoxFilter(0, "Name", "Camo"); });
    it("Tests Lvl Avail. dropdown filter.", () => { cy.testSingularSelectDropdown(1, "Lvl Avail.", "3", "equal", "Any"); });
    it("Tests Brand dropdown filter.", () => { cy.testSingularSelectDropdown(2, "Brand", "Mitchell&Ness", "equal", "Any"); });
    it("Tests Style dropdown filter.", () => { cy.testSingularSelectDropdown(3, "Style", "Snapback", "equal", "Any"); });
    it("Tests Color dropdown filter.", () => { cy.testSingularSelectDropdown(4, "Color", "Blue", "include", "Any"); });
    it("Tests Rarity dropdown filter.", () => { cy.testSingularSelectDropdown(5, "Rarity", "All-Star", "equal", "Any"); });
    it("Tests Price sortable column.", () => { cy.testSortableColumn(6, "Price"); });
  }
);
