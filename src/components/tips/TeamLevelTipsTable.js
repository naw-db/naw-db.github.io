import { createTheme, CssBaseline, Stack, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from "@mui/material";
import { Section } from "gatsby-theme-portfolio-minimal";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";
import { usePagination, useTable } from "react-table";

import { ScrollableTable } from "src/components/common/Table";

export default function TeamLevelTipsTable({ defaultPageSize, data }) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "")
    }
  });

  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        Header: "Team Level",
        showHeader: true
      },
      {
        accessor: "requirement",
        Header: "Requirement",
        showHeader: true,
        textAlign: "left"
      },
      {
        accessor: "action",
        Header: "Action",
        showHeader: true,
        textAlign: "left"
      },
      {
        accessor: "total",
        Header: "Total",
        showHeader: true,
        textAlign: "left"
      }
    ],
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
        <Section heading="Level Up Team Level Fast">
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