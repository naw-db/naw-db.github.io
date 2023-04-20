import { Stack, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";

import { fuzzyTextFilterFn, ScrollableTable } from "src/components/common/Table";

export function BaseTable({ theme, columns, data }) {
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
    </TableContainer>
  );
}
