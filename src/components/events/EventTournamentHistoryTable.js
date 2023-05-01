import { createTheme, CssBaseline, Stack, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";
import { useFilters, usePagination, useTable } from "react-table";

import { ScrollableTable, SelectColumnFilter } from "src/components/common/Table";

export default function EventTournamentHistoryTable({ defaultPageSize, data }) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "")
    }
  });

  const columns = React.useMemo(
    () => [
      {
        accessor: "tournament",
        Header: "Tournament",
        showHeader: true,
        sticky: true,
        backgroundColor: theme.palette.background.default,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "series",
        helperText: "Series",
        textAlign: "left",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "date",
        Header: "Date",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "duration",
        Header: "Duration",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "arena",
        Header: "Arena",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "passRequired",
        Header: "Pass Required?",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "leaderboardSize",
        Header: "Leaderboard Size",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerRequirements",
        Header: "Player Requirements",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "numberOfPlayers",
        Header: "# of Players",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "pointsToWin",
        Header: "Points to Win",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "numberOfGames",
        Header: "# of Games",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "lossesToBeEliminated",
        Header: "Losses to be Eliminated",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "completionRings",
        Header: "Completion Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "leaderboardRings",
        Header: "Leaderboard Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      }
    ],
    [ theme.palette.background.default ]
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
      initialState: {
        pageSize: defaultPageSize
      }
    },
    useFilters,
    usePagination
  );

  function updatePage(event, page) {
    gotoPage(page);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
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
                            fontWeight: "bold",
                            left: column.sticky ? 0 : undefined,
                            position: column.sticky ? "sticky" : undefined,
                            textAlign: column.textAlign ? column.textAlign : "center",
                            whiteSpace: "nowrap",
                            backgroundColor: column.backgroundColor
                              ? column.backgroundColor
                              : undefined,
                            zIndex: column.sticky ? theme.zIndex.appBar + 2 : undefined
                          }}
                        >
                          <div>
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
      </CssBaseline>
    </ThemeProvider>
  );
}
