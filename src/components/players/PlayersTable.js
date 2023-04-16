import {
  createTheme,
  CssBaseline,
  FormControlLabel,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  useMediaQuery
} from "@mui/material";
import bigDecimal from "js-big-decimal";
import { matchSorter } from "match-sorter";
import React from "react";
import { useFilters, useSortBy, useTable } from "react-table";
import styled from "styled-components";

import { SelectColumnFilter, TextColumnFilter } from "src/components/common/Table";
import { statCategories } from "src/components/players/PlayerStats";

const Styles = styled.div`
  .scrollableTable {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }
`

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
      },
      {
        accessor: "position",
        helperText: "Pos.",
        Filter: PositionColumnFilter,
        filter: "includes",
        disableSortBy: true
      }
    ]
  },
  {
    Header: "OVR",
    showHeader: true,
    accessor: "overall",
    disableFilters: true
  },
  {
    Header: "Offense",
    showHeader: true,
    columns: [
      {
        Header: "TOT",
        showHeader: true,
        accessor: "total_offense",
        disableFilters: true
      },
      {
        Header: "BHL",
        showHeader: true,
        accessor: "ball_handling",
        disableFilters: true
      },
      {
        Header: "PES",
        showHeader: true,
        accessor: "perimeter_shooting",
        disableFilters: true
      },{
        Header: "MRS",
        showHeader: true,
        accessor: "mid_range_shooting",
        disableFilters: true
      },
      {
        Header: "DNK",
        showHeader: true,
        accessor: "dunk_power",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Defense",
    showHeader: true,
    columns: [
      {
        Header: "TOT",
        showHeader: true,
        accessor: "total_defense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "defense",
        disableFilters: true
      },
      {
        Header: "BLK",
        showHeader: true,
        accessor: "blocking",
        disableFilters: true
      },
      {
        Header: "STL",
        showHeader: true,
        accessor: "stealing",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Fitness",
    showHeader: true,
    columns: [
      {
        Header: "TOT",
        showHeader: true,
        accessor: "total_fitness",
        disableFilters: true
      },
      {
        Header: "STR",
        showHeader: true,
        accessor: "strength",
        disableFilters: true
      },
      {
        Header: "SPD",showHeader: true,
        accessor: "speed",
        disableFilters: true
      },
      {
        Header: "STA",
        showHeader: true,
        accessor: "stamina",
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

function PositionColumnFilter({ column: { label, helperText, filterValue, setFilter } }) {
  return (
    <TextField
      select
      label={label}
      helperText={helperText}
      defaultValue=""
      value={filterValue}
      size="small"
      fullWidth
      onChange={
        e => {
          setFilter(e.target.value || undefined);
        }
      }
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="PG">PG</MenuItem>
      <MenuItem value="SG">SG</MenuItem>
      <MenuItem value="SF">SF</MenuItem>
      <MenuItem value="PF">PF</MenuItem>
      <MenuItem value="C">C</MenuItem>
    </TextField>
  );
}

function calculateDisplayData(data, displayMaxStats) {
  return data.map(
    entry => {
      const displayedEntry = Object.assign({}, entry);

      statCategories.forEach(
        category => {
          displayedEntry[category] = displayedEntry[`${category}_${displayMaxStats ? "max" : "base"}`];
        }
      );

      displayedEntry.total_offense = new bigDecimal(displayedEntry.ball_handling)
        .add(new bigDecimal(displayedEntry.perimeter_shooting))
        .add(new bigDecimal(displayedEntry.mid_range_shooting))
        .add(new bigDecimal(displayedEntry.dunk_power))
        .getValue();

      displayedEntry.total_defense = new bigDecimal(displayedEntry.defense)
        .add(new bigDecimal(displayedEntry.blocking))
        .add(new bigDecimal(displayedEntry.stealing))
        .getValue();

      displayedEntry.total_fitness = new bigDecimal(displayedEntry.strength)
        .add(new bigDecimal(displayedEntry.speed))
        .add(new bigDecimal(displayedEntry.stamina))
        .getValue();

      displayedEntry.overall = new bigDecimal(displayedEntry.total_offense)
        .add(new bigDecimal(displayedEntry.total_defense))
        .add(new bigDecimal(displayedEntry.total_fitness))
        .getValue();

      return displayedEntry;
    }
  );
}

export function PlayersTable({ columns, data }) {
  const isDarkModePreferred = useMediaQuery("(prefers-color-scheme: dark)");
  const [ baseStatsData ] = React.useState(calculateDisplayData(data, false));
  const [ maxStatsData ] = React.useState(calculateDisplayData(data, true));
  const [ displayData, setDisplayData ] = React.useState(maxStatsData);
  const [ showMaxStats, setShowMaxStats ] = React.useState(true);

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
  } = useTable(
    {
      columns,
      data: displayData,
      filterTypes
    },
    useFilters,
    useSortBy
  );

  function updateStats(event) {
    setDisplayData(event.target.checked ? maxStatsData : baseStatsData);
    setShowMaxStats(event.target.checked);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <FormControlLabel
          control={<Switch checked={showMaxStats} onChange={updateStats} />}
          label="Show Max Stats"
        />
        <Styles>
          <Table className="scrollableTable" {...getTableProps()} stickyHeader size="small">
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
                              textAlign: cell.getCellProps().key.endsWith("name") ? "left" : "center",
                              whiteSpace: "nowrap",
                              backgroundColor: cell.getCellProps().key.includes("total")
                                ? theme.palette.primary.contrastText : null
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
        </Styles>
      </CssBaseline>
    </ThemeProvider>
  );
}
