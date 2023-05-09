describe(
  "Rewards - Drop Zone tab tests",
  () => {
    it("Tests anchor.", () => { cy.testTabAnchor("/rewards/", "dropZone"); });
    it("Tests pagination.", () => { cy.testPagination(0); });
  }
);
