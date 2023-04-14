import {
  createTheme,
  CssBaseline,
  Table, TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  useMediaQuery
} from "@mui/material";
import { matchSorter } from "match-sorter";
import React from "react";
import { useFilters, useSortBy, useTable } from "react-table";

import { SelectColumnFilter, TextColumnFilter } from "src/components/common/Table";

export const columnDefinitions = [
  {
    id: "info",
    columns: [
      {
        accessor: "name",
        label: "Name",
        Filter: TextColumnFilter,
        disableSortBy: true
      },
      {
        accessor: "level_available",
        helperText: "Lvl Avail.",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "type",
        helperText: "Type",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "team",
        helperText: "Team",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "conference",
        helperText: "Conf.",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "division",
        helperText: "Division",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      }
    ]
  },
  {
    Header: "Position",
    showHeader: true,
    columns: [
      {
        Header: "1",
        showHeader: true,
        accessor: "position_1",
        disableFilters: true
      },
      {
        Header: "2",
        showHeader: true,
        accessor: "position_2",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Offense",
    showHeader: true,
    columns: [
      {
        Header: "OVR",
        showHeader: true,
        accessor: "total_offense_base",
        disableFilters: true
      },
      {
        Header: "BLH",
        showHeader: true,
        accessor: "ball_handling_base",
        disableFilters: true
      },
      {
        Header: "PES",showHeader: true,
        accessor: "perimeter_shooting_base",
        disableFilters: true
      },{
        Header: "MRS",showHeader: true,
        accessor: "mid_range_shooting_base",
        disableFilters: true
      },
      {
        Header: "DNK",showHeader: true,
        accessor: "dunk_power_base",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Defense",
    showHeader: true,
    columns: [
      {
        Header: "OVR",
        showHeader: true,
        accessor: "total_defense_base",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "defense_base",
        disableFilters: true
      },
      {
        Header: "BLK",
        showHeader: true,
        accessor: "blocking_base",
        disableFilters: true
      },
      {
        Header: "STL",
        showHeader: true,
        accessor: "stealing_base",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Fitness",
    showHeader: true,
    columns: [
      {
        Header: "OVR",
        showHeader: true,
        accessor: "total_fitness_base",
        disableFilters: true
      },
      {
        Header: "STR",
        showHeader: true,
        accessor: "strength_base",
        disableFilters: true
      },
      {
        Header: "SPD",showHeader: true,
        accessor: "speed_base",
        disableFilters: true
      },
      {
        Header: "STA",
        showHeader: true,
        accessor: "stamina_base",
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

export function PlayersTable({ columns, data }) {
  const isDarkModePreferred = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      mode: isDarkModePreferred ? "dark" : "light"
    }
  });

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
    rows,
    prepareRow,
    state,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      filterTypes
    },
    useFilters,
    useSortBy
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Table {...getTableProps()} stickyHeader>
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
                          whiteSpace: "nowrap"
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
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length}
                style={{ textAlign: "left", whiteSpace: "nowrap" }}
              >
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(
              (row, i) => {
                prepareRow(row)
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(
                      cell => {
                        return <TableCell
                          {...cell.getCellProps()}
                          style={{
                            whiteSpace: "nowrap"
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
        </Table>
        <br />
        <div>
          <pre>
            <code>{JSON.stringify(state.filters, null, 2)}</code>
          </pre>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}
