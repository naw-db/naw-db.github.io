import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import React from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";

import { fuzzyTextFilterFn, ScrollableTable } from "src/components/common/Table";

const BRAND_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00"
};

const STYLE_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00"
};

const COLOR_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00"
};

const RARITY_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00",
  "Starter": "000",
  "All-Star": "0000",
  "All-World": "00000"
};

export function generateBrandOptions(data, selectFieldFunction) {
  return new Set(
    data.map(e => selectFieldFunction(e))
      .sort(
        (a, b) => {
          const normalizedA = BRAND_SORT_ORDER[a] ? BRAND_SORT_ORDER[a] : a;
          const normalizedB = BRAND_SORT_ORDER[b] ? BRAND_SORT_ORDER[b] : b;

          return normalizedA.localeCompare(normalizedB);
        }
      )
  );
}

export function generateStyleOptions(data, selectFieldFunction) {
  return new Set(
    data.map(e => selectFieldFunction(e))
      .sort(
        (a, b) => {
          const normalizedA = STYLE_SORT_ORDER[a] ? STYLE_SORT_ORDER[a] : a;
          const normalizedB = STYLE_SORT_ORDER[b] ? STYLE_SORT_ORDER[b] : b;

          return normalizedA.localeCompare(normalizedB);
        }
      )
  );
}

export function generateColorOptions(data, selectFieldFunction) {
  return new Set(
    data.flatMap(e => selectFieldFunction(e).split("/"))
      .map(e => e.trim())
      .sort(
        (a, b) => {
          const normalizedA = COLOR_SORT_ORDER[a] ? COLOR_SORT_ORDER[a] : a;
          const normalizedB = COLOR_SORT_ORDER[b] ? COLOR_SORT_ORDER[b] : b;

          return normalizedA.localeCompare(normalizedB);
        }
      )
  );
}

export function generateRarityOptions(data, selectFieldFunction) {
  return new Set(
    data.map(e => selectFieldFunction(e))
      .sort(
        (a, b) => {
          return RARITY_SORT_ORDER[a].localeCompare(RARITY_SORT_ORDER[b]);
        }
      )
  );
}

export function BaseTable({ defaultPageSize, columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(
          row => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
              : true;
          }
        );
      }
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: {
        pageSize: defaultPageSize
      }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  function updatePage(event, page) {
    gotoPage(page);
  }

  return (
    <TableContainer>
      <ScrollableTable {...getTableProps()} stickyHeader size="small">
        <TableHead>
          {headerGroups.map(
            headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  column => (
                    <TableCell
                      {...column.getHeaderProps()}
                      align="center"
                      width={column.width}
                      sx={{
                        whiteSpace: "nowrap",
                        backgroundColor: column.backgroundColor
                          ? column.backgroundColor
                          : undefined
                      }}
                    >
                      <div {...column.getSortByToggleProps()}>
                        <span>
                          {
                            column.showSortLabel
                              ? column.isSorted
                                ? (column.isSortedDesc ? <ArrowDownwardIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />)
                                : <SwapVertIcon fontSize="small" />
                              : null
                          }
                        </span>
                        <div>{column.showHeader ? column.render("Header") : null}</div>
                        <div>{column.canFilter ? column.render("Filter") : null}</div>
                      </div>
                    </TableCell>
                  ))}
              </TableRow>
            )
          )}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map(
            (row, i) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(
                    cell => {
                      return <TableCell
                        {...cell.getCellProps()}
                        sx={{
                          left: cell.column.sticky ? 0 : undefined,
                          position: cell.column.sticky ? "sticky" : undefined,
                          textAlign: cell.column.textAlign ? cell.column.textAlign : "center",
                          whiteSpace: "nowrap",
                          backgroundColor: cell.column.backgroundColor
                            ? cell.column.backgroundColor
                            : undefined
                        }}
                      >
                        {cell.render("Cell")}
                      </TableCell>;
                    }
                  )}
                </TableRow>
              );
            }
          )}
        </TableBody>
      </ScrollableTable>
      <Stack spacing={2}>
        <TablePagination
          component="div"
          count={rows.length}
          labelRowsPerPage="Rows"
          rowsPerPage={pageSize}
          page={pageIndex}
          showFirstButton
          showLastButton
          onPageChange={updatePage}
          onRowsPerPageChange={e => setPageSize(Number(e.target.value))}
        />
      </Stack>
    </TableContainer>
  );
}
