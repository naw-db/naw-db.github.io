/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    testPagination(): Chainable<any>;
    testTextBoxFilter(columnIndex: number, textBoxName: string, targetText: string): Chainable<any>;
    testSingularSelectDropdown(
      columnIndex: number,
      dropdownText: string,
      targetOptionText: string,
      resultOperator: string,
      resetOptionText: string
    ): Chainable<any>;
    testMultiSelectDropdown(columnIndex: number, dropdownText: string, targetOptionTexts: Array<string>, resetOptionText: string): Chainable<any>;
    testSortableColumn(columnIndex: number, columnHoverText: string): Chainable<any>;
    getPlayerComparisonChartLabels(): Chainable<string>;
    calculateExpectedPlayerComparisonChartLabels(
      playerData: Array<any>,
      playerOne: string,
      playerOneRank: string,
      playerOneLevel: string,
      playerTwo: string,
      playerTwoRank: string,
      playerTwoLevel: string
    ): Chainable<string>;
  }
}
