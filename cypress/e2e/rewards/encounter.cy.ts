describe(
  "Rewards - Encounter tab tests",
  () => {
    it("Tests anchor.", () => { cy.testTabAnchor("/rewards/", "encounter"); });
    it("Tests pagination.", () => { cy.testPagination(0); });
    it("Tests Team Level dropdown filter.", () => { cy.testSingularSelectDropdown(0, "Team Level", "7", "equal", "Any"); });
  }
);
