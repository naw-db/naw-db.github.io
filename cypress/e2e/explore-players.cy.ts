beforeEach(
  () => {
    cy.visit("/explore-players");
  }
);

describe(
  "Explore Players page tests",
  () => {
    it("Tests pagination", () => {
      cy.testPagination("/explore-players");
    });
    it("Tests Player Name text box filter", () => {
      cy.testTextBoxFilter("/explore-players", 0, "Name", "Green");
    });
    it("Tests Lvl Avail. dropdown filter", () => {
      cy.testSingularSelectDropdown("/explore-players", 1, "Lvl Avail.", "7", "equal", "Any");
    });
    it("Tests Type dropdown filter", () => {
      cy.testSingularSelectDropdown("/explore-players", 2, "Type", "All-World", "equal", "Any");
    });
    it("Tests Team dropdown filter", () => {
      cy.testMultiSelectDropdown("/explore-players", 3, "Team", [ "ATL", "DAL" ], "Any");
    });
    it("Tests Conf. dropdown filter", () => {
      cy.testSingularSelectDropdown("/explore-players", 4, "Conf.", "West", "equal", "Any");
    });
    it("Tests Division dropdown filter", () => {
      cy.testSingularSelectDropdown("/explore-players", 5, "Division", "Southwest", "equal", "Any");
    });
    it("Tests Pos. dropdown filter", () => {
      cy.testSingularSelectDropdown("/explore-players", 6, "Pos.", "C", "include", "Any");
    });
    it("Tests Overall sortable column", () => {
      cy.testSortableColumn("/explore-players", 7, "Overall");
    });
    it("Tests Overall Offense sortable column", () => {
      cy.testSortableColumn("/explore-players", 8, "Overall Offense");
    });
    it("Tests Ball Handling sortable column", () => {
      cy.testSortableColumn("/explore-players", 9, "Ball Handling");
    });
    it("Tests Perimeter Shooting sortable column", () => {
      cy.testSortableColumn("/explore-players", 10, "Perimeter Shooting");
    });
    it("Tests Mid-Range Shooting sortable column", () => {
      cy.testSortableColumn("/explore-players", 11, "Mid-Range Shooting");
    });
    it("Tests Dunk Power sortable column", () => {
      cy.testSortableColumn("/explore-players", 12, "Dunk Power");
    });
    it("Tests Overall Defense sortable column", () => {
      cy.testSortableColumn("/explore-players", 13, "Overall Defense");
    });
    it("Tests Defense sortable column", () => {
      cy.testSortableColumn("/explore-players", 14, "Defense");
    });
    it("Tests Blocking sortable column", () => {
      cy.testSortableColumn("/explore-players", 15, "Blocking");
    });
    it("Tests Stealing sortable column", () => {
      cy.testSortableColumn("/explore-players", 16, "Stealing");
    });
    it("Tests Strength sortable column", () => {
      cy.testSortableColumn("/explore-players", 18, "Strength");
    });
    it("Tests Speed sortable column", () => {
      cy.testSortableColumn("/explore-players", 19, "Speed");
    });
    it("Tests Stamina sortable column", () => {
      cy.testSortableColumn("/explore-players", 20, "Stamina");
    });
    it("Tests Beat to Rank Up dropdown filter", () => {
      cy.testSingularSelectDropdown("/explore-players", 21, "Beat to Rank Up", "Russell Westbrook", "include", "Any");
    });
  }
);
