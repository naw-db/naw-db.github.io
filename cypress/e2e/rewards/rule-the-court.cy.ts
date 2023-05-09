describe(
  "Rewards - Rule the Court tab tests",
  () => {
    it("Tests anchor.", () => { cy.testTabAnchor("/rewards/", "ruleTheCourt"); });
    it("Tests pagination.", () => { cy.testPagination(0); });
  }
);
