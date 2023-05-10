describe(
  "Rewards - Referral tab tests",
  () => {
    it("Tests anchor.", () => { cy.testTabAnchor("/rewards/", "referral"); });
    it("Tests pagination.", () => { cy.testPagination(0); });
  }
);
