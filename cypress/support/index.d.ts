/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    testPagination(pageUrl: string): Chainable<any>;
    testTextBoxFilter(pageUrl: string, columnIndex: number, textBoxName: string, targetText: string): Chainable<any>;
    testSingularSelectDropdown(pageUrl: string, columnIndex: number, dropdownText: string, targetOptionText: string, resultOperator: string, resetOptionText: string): Chainable<any>;
    testMultiSelectDropdown(pageUrl: string, columnIndex: number, dropdownText: string, targetOptionTexts: Array<string>, resetOptionText: string): Chainable<any>;
    testSortableColumn(pageUrl: string, columnIndex: number, columnHoverText: string): Chainable<any>;
  }
}
