describe(
  "Gear - Pants tab tests",
  () => {
    it(
      "Tests anchor.",
      () => {
        cy.visit("/gear/?tab=pants");

        cy.get("[aria-selected='true']")
          .should("have.id", "pants");
      }
    );
    it("Tests pagination.", () => { cy.testPagination(); });
    it("Tests Name text box filter.", () => { cy.testTextBoxFilter(0, "Name", "Pro"); });
    it("Tests Lvl Avail. dropdown filter.", () => { cy.testSingularSelectDropdown(1, "Lvl Avail.", "7", "equal", "Any"); });
    it("Tests Brand dropdown filter.", () => { cy.testSingularSelectDropdown(2, "Brand", "OVERTIME", "equal", "Any"); });
    it("Tests Style dropdown filter.", () => { cy.testSingularSelectDropdown(3, "Style", "Shorts", "equal", "Any"); });
    it("Tests Color dropdown filter.", () => { cy.testSingularSelectDropdown(4, "Color", "Blue", "include", "Any"); });
    it("Tests Rarity dropdown filter.", () => { cy.testSingularSelectDropdown(5, "Rarity", "All-Star", "equal", "Any"); });
    it("Tests Price sortable column.", () => { cy.testSortableColumn(6, "Price"); });
    it("Tests Level 1 Offense sortable column.", () => { cy.testSortableColumn(7, "Level 1 Offense"); });
    it("Tests Level 1 Defense sortable column.", () => { cy.testSortableColumn(8, "Level 1 Defense"); });
    it("Tests Level 1 Fitness sortable column.", () => { cy.testSortableColumn(9, "Level 1 Fitness"); });
    it("Tests Level 2 Offense sortable column.", () => { cy.testSortableColumn(12, "Level 2 Offense"); });
    it("Tests Level 2 Defense sortable column.", () => { cy.testSortableColumn(13, "Level 2 Defense"); });
    it("Tests Level 2 Fitness sortable column.", () => { cy.testSortableColumn(14, "Level 2 Fitness"); });
    it("Tests Level 3 Offense sortable column.", () => { cy.testSortableColumn(17, "Level 3 Offense"); });
    it("Tests Level 3 Defense sortable column.", () => { cy.testSortableColumn(18, "Level 3 Defense"); });
    it("Tests Level 3 Fitness sortable column.", () => { cy.testSortableColumn(19, "Level 3 Fitness"); });
    it("Tests Level 4 Offense sortable column.", () => { cy.testSortableColumn(22, "Level 4 Offense"); });
    it("Tests Level 4 Defense sortable column.", () => { cy.testSortableColumn(23, "Level 4 Defense"); });
    it("Tests Level 4 Fitness sortable column.", () => { cy.testSortableColumn(24, "Level 4 Fitness"); });
    it("Tests Level 5 Offense sortable column.", () => { cy.testSortableColumn(27, "Level 5 Offense"); });
    it("Tests Level 5 Defense sortable column.", () => { cy.testSortableColumn(28, "Level 5 Defense"); });
    it("Tests Level 5 Fitness sortable column.", () => { cy.testSortableColumn(29, "Level 5 Fitness"); });
  }
);
