describe(
  "Gear - Eyewear tab tests",
  () => {
    it(
      "Tests anchor.",
      () => {
        cy.visit("/gear/?tab=eyewear");

        cy.get("[aria-selected='true']")
          .should("have.id", "eyewear");
      }
    );
    it("Tests pagination.", () => { cy.testPagination(); });
    it("Tests Type dropdown filter.", () => { cy.testSingularSelectDropdown(0, "Type", "Sunglasses", "equal", "Any"); });
    it("Tests Lvl Avail. dropdown filter.", () => { cy.testSingularSelectDropdown(1, "Lvl Avail.", "3", "equal", "Any"); });
    it("Tests Brand dropdown filter.", () => { cy.testSingularSelectDropdown(2, "Brand", "All-World", "equal", "Any"); });
    it("Tests Style dropdown filter.", () => { cy.testSingularSelectDropdown(3, "Style", "Darkshade", "equal", "Any"); });
    it("Tests Color dropdown filter.", () => { cy.testSingularSelectDropdown(4, "Color", "Blue", "include", "Any"); });
    it("Tests Rarity dropdown filter.", () => { cy.testSingularSelectDropdown(5, "Rarity", "Starter", "equal", "Any"); });
    it("Tests Price sortable column.", () => { cy.testSortableColumn(6, "Price"); });
  }
);
