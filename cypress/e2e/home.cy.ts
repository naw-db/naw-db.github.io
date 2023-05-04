describe("Home page tests", () => {
  beforeEach(() => {
    cy.visit("/")
      .waitForRouteChange().get("main");
    cy.injectAxe();
  });
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y();
  });
});
