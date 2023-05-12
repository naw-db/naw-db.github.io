describe(
  "Tips page tests",
  () => {
    it("Tests Level Up Team Level Fast section anchor.", () => { cy.testUrlAnchor("/tips/", "level-up-team-level-fast"); });
    it("Tests Level Up Team Level Fast table pagination.", () => { cy.testPagination(0); });
    it("Tests Arena Tournaments section anchor.", () => { cy.testUrlAnchor("/tips/", "arena-tournaments"); });
    it("Tests Players section anchor.", () => { cy.testUrlAnchor("/tips/", "players"); });
    it("Tests Team Levels section anchor.", () => { cy.testUrlAnchor("/tips/", "team-levels"); });
    it("Tests Rule the Court section anchor.", () => { cy.testUrlAnchor("/tips/", "rule-the-court"); });
    it("Tests Milestones section anchor.", () => { cy.testUrlAnchor("/tips/", "milestones"); });
    it("Tests Cash section anchor.", () => { cy.testUrlAnchor("/tips/", "cash"); });
    it("Tests Gear section anchor.", () => { cy.testUrlAnchor("/tips/", "gear"); });
    it("Tests Boosts section anchor.", () => { cy.testUrlAnchor("/tips/", "boosts"); });
    it("Tests Energy section anchor.", () => { cy.testUrlAnchor("/tips/", "energy"); });
    it("Tests Referrals section anchor.", () => { cy.testUrlAnchor("/tips/", "referrals"); });
  }
);
