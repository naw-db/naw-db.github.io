import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { matchSorter } from "match-sorter";
import React from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";

import { SelectColumnFilter, TextColumnFilter } from "src/components/common/Table";

const ScrollableTable = styled(Table)`
  display: block;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  border-bottom: 1px solid black;
`;

export const columnDefinitions = [
  {
    id: "info",
    columns: [
      {
        accessor: "name",
        helperText: "Name",
        Filter: TextColumnFilter,
        disableSortBy: true
      },
      {
        accessor: "levelAvailable",
        helperText: "Lvl Avail.",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "brand",
        helperText: "Brand",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "style",
        helperText: "Style",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "color",
        helperText: "Color",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "rarity",
        helperText: "Rarity",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "cashToBuy",
        helperText: "Price",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Level 1",
    showHeader: true,
    backgroundColor: "secondary",
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level1Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level1Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level1Fitness",
        disableFilters: true
      },
      {
        Header: "QTY",
        showHeader: true,
        accessor: "level1QuantityRequiredToUpgrade",
        disableFilters: true
      },
      {
        Header: "CDT",
        showHeader: true,
        accessor: "level1CredsRequiredToUpgrade",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Level 2",
    showHeader: true,
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level2Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level2Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level2Fitness",
        disableFilters: true
      },
      {
        Header: "QTY",
        showHeader: true,
        accessor: "level2QuantityRequiredToUpgrade",
        disableFilters: true
      },
      {
        Header: "CDT",
        showHeader: true,
        accessor: "level2CredsRequiredToUpgrade",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Level 3",
    showHeader: true,
    backgroundColor: "secondary",
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level3Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level3Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level3Fitness",
        disableFilters: true
      },
      {
        Header: "QTY",
        showHeader: true,
        accessor: "level3QuantityRequiredToUpgrade",
        disableFilters: true
      },
      {
        Header: "CDT",
        showHeader: true,
        accessor: "level3CredsRequiredToUpgrade",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Level 4",
    showHeader: true,
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level4Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level4Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level4Fitness",
        disableFilters: true
      },
      {
        Header: "QTY",
        showHeader: true,
        accessor: "level4QuantityRequiredToUpgrade",
        disableFilters: true
      },
      {
        Header: "CDT",
        showHeader: true,
        accessor: "level4CredsRequiredToUpgrade",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Level 5",
    showHeader: true,
    backgroundColor: "secondary",
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level5Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level5Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level5Fitness",
        disableFilters: true
      }
    ]
  }
];

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

// Remove the filter if the string is empty.
fuzzyTextFilterFn.autoRemove = val => !val;

export function ShirtsTable({ theme, data }) {
  const columns = React.useMemo(
    () => columnDefinitions,
    []
  );

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
      filterTypes
    },
    useFilters,
    useSortBy,
    usePagination
  );

  function updatePage(event, page) {
    gotoPage(page);
  }

  return (
    <>
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
                      style={{
                        whiteSpace: "nowrap",
                        backgroundColor: column.backgroundColor != null
                          ? theme.palette.text[column.backgroundColor]
                          : null
                      }}
                    >
                      <div {...column.getSortByToggleProps()}>
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
                        style={{
                          textAlign: cell.getCellProps().key.endsWith("name") ? "left" : "center",
                          whiteSpace: "nowrap",
                          backgroundColor: cell.column.backgroundColor != null
                            ? theme.palette.text[cell.column.backgroundColor]
                            : null
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
          rowsPerPage={pageSize}
          page={pageIndex}
          showFirstButton
          showLastButton
          onPageChange={updatePage}
          onRowsPerPageChange={e => setPageSize(Number(e.target.value))}
        />
      </Stack>
    </>
  );
}
