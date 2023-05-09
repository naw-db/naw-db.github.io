describe(
  "Gear - Socks tab tests",
  () => {
    it("Tests anchor.", () => { cy.testTabAnchor("/gear/", "socks"); });
    it("Tests pagination.", () => { cy.testPagination(0); });
    it("Tests Name text box filter.", () => { cy.testTextBoxFilter(0, "Name", "Trippy"); });
    it("Tests Lvl Avail. dropdown filter.", () => { cy.testSingularSelectDropdown(1, "Lvl Avail.", "1", "equal", "Any"); });
    it("Tests Brand dropdown filter.", () => { cy.testSingularSelectDropdown(2, "Brand", "Stance", "equal", "Any"); });
    it("Tests Color dropdown filter.", () => { cy.testSingularSelectDropdown(3, "Color", "Blue", "include", "Any"); });
    it("Tests Rarity dropdown filter.", () => { cy.testSingularSelectDropdown(4, "Rarity", "Starter", "equal", "Any"); });
    it("Tests Price sortable column.", () => { cy.testSortableColumn(5, "Price"); });
  }
);
