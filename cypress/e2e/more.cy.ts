describe(
  "More page tests",
  () => {
    it("Tests Player Level Requirements section anchor.", () => { cy.testUrlAnchor("/more/", "player-level-requirements"); });
    it("Tests Player Level Requirements table pagination.", () => { cy.testPagination(0); });
    it("Tests Event Tournament History section anchor.", () => { cy.testUrlAnchor("/more/", "event-tournament-history"); });
    it("Tests Event Tournament History table pagination.", () => { cy.testPagination(1); });
  }
);
