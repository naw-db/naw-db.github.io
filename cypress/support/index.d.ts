/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    testUrlAnchor(pageUrl: string, anchor: string, startingYGreaterThan: number, endingYLessThan: number): Chainable<any>
    testTabAnchor(pagePathUrlPrefix: string, anchor: string): Chainable<any>
    testPagination(tableIndex: number): Chainable<any>;
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
    getPlayerData(): Chainable<Array<any>>;
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
