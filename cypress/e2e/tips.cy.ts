describe(
  "Tips page tests",
  () => {
    it("Tests Level Up Team Level Fast section anchor.", () => { cy.testUrlAnchor("/tips/", "level-up-team-level-fast", 100, 10); });
    it("Tests Level Up Team Level Fast table pagination.", () => { cy.testPagination(0); });
  }
);
