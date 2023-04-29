import { createTheme, CssBaseline, Stack, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from "@mui/material";
import { Section } from "gatsby-theme-portfolio-minimal";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";
import { usePagination, useTable } from "react-table";

import { ScrollableTable } from "src/components/common/Table";

export default function PlayerLevelRequirementsTable({ defaultPageSize, data }) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "")
    }
  });

  const columns = React.useMemo(
    () => [
      {
        accessor: "rankAndLevel",
        Header: "Rank / Level",
        showHeader: true,
        sticky: true,
        backgroundColor: theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "drillOpponentTier",
        Header: "Drill Opponent Tier",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "drillWinsRequired",
        Header: "Drill Wins",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "starTokensRequired",
        Header: "Star Tokens",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        Header: "Starter",
        showHeader: true,
        backgroundColor: theme.palette.text.secondary,
        columns: [
          {
            accessor: "xpRequiredStarter",
            Header: "XP",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "credsRequiredStarter",
            Header: "Cred.",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "ringsRequiredStarter",
            Header: "Rings",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          }
        ]
      },
      {
        Header: "All-Star",
        showHeader: true,
        columns: [
          {
            accessor: "xpRequiredAllStar",
            Header: "XP",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "credsRequiredAllStar",
            Header: "Cred.",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "ringsRequiredAllStar",
            Header: "Rings",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          }
        ]
      },
      {
        Header: "All-World",
        showHeader: true,
        backgroundColor: theme.palette.text.secondary,
        columns: [
          {
            accessor: "xpRequiredAllWorld",
            Header: "XP",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "credsRequiredAllWorld",
            Header: "Cred.",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "ringsRequiredAllWorld",
            Header: "Rings",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          }
        ]
      }
    ],
    [
      theme.palette.background.default,
      theme.palette.text.secondary
    ]
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
    usePagination
  );

  function updatePage(event, page) {
    gotoPage(page);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Section heading="Player Level Requirements">
          <TableContainer>
            <ScrollableTable {...getTableProps()} stickHeader size="small">
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
                            <div>{column.showHeader ? column.render("Header") : null}</div>
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
        </Section>
      </CssBaseline>
    </ThemeProvider>
  );
}
