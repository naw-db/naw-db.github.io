/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    isInViewport(element: string): Chainable<any>;
    testUrlAnchor(pageUrl: string, anchor: string): Chainable<any>
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
      players: Array<string>,
      ranks: Array<string>,
      levels: Array<string>
    ): Chainable<string>;
  }
}
