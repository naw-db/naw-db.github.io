describe(
  "Rewards - Milestones tab tests",
  () => {
    it("Tests anchor.", () => { cy.testTabAnchor("/rewards/", "milestones"); });
    it("Tests pagination.", () => { cy.testPagination(0); });
  }
);
