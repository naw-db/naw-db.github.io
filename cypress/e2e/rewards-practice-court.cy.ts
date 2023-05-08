describe(
  "Rewards - Practice Court tab tests",
  () => {
    it("Tests anchor.", () => { cy.testTabAnchor("/rewards/", "practiceCourt"); });
    it("Tests pagination.", () => { cy.testPagination(0); });
    it("Tests Team Level dropdown filter.", () => { cy.testSingularSelectDropdown(0, "Team Level", "7", "equal", "Any"); });
    it("Tests Type dropdown filter.", () => { cy.testSingularSelectDropdown(1, "Type", "First to 5", "equal", "Any"); });
  }
);
