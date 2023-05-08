describe(
  "Rewards - Team Level tab tests",
  () => {
    it("Tests anchor.", () => { cy.testTabAnchor("/rewards/", "teamLevel"); });
    it("Tests pagination.", () => { cy.testPagination(0); });
  }
);
