describe(
  "Rewards - Arena Tournament tab tests",
  () => {
    it("Tests anchor.", () => { cy.testTabAnchor("/rewards/", "arenaTournament"); });
    it("Tests Weekly Tournament table pagination.", () => { cy.testPagination(0); });
    it("Tests Daily Tournament first table pagination.", () => { cy.testPagination(1); });
    it("Tests Daily Tournament last table pagination.", () => { cy.testPagination(2); });
  }
);
