import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  createTheme,
  CssBaseline,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider
} from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context"
import bigDecimal from "js-big-decimal";
import { parseFullName } from "parse-full-name";
import React from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";

import { fuzzyTextFilterFn, ScrollableTable, SelectColumnFilter, TextColumnFilter } from "src/components/common/Table";
import { STAT_CATEGORIES } from "src/components/players/PlayerStats";

export const RANK_UP_REQUIREMENT_SEPARATOR = " → ";

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

function generateRankUpRequirementsOptions(data, selectFieldFunction) {
  return new Set(
    data.flatMap(e => selectFieldFunction(e).split(RANK_UP_REQUIREMENT_SEPARATOR))
      .map(e => e.trim())
      .sort(
        (a, b) => {
          return parseFullName(a).last
            .localeCompare(parseFullName(b).last);
        }
      )
  );
}

function calculateDisplayData(data, displayMaxStats) {
  return data.map(
    entry => {
      const displayedEntry = Object.assign({}, entry);

      STAT_CATEGORIES.forEach(
        category => {
          displayedEntry[category] = displayedEntry[`${category}${displayMaxStats ? "Max" : "Base"}`];
        }
      );

      displayedEntry.totalOffense = new bigDecimal(displayedEntry.ballHandling)
        .add(new bigDecimal(displayedEntry.perimeterShooting))
        .add(new bigDecimal(displayedEntry.midRangeShooting))
        .add(new bigDecimal(displayedEntry.dunkPower))
        .getValue();

      displayedEntry.totalDefense = new bigDecimal(displayedEntry.defense)
        .add(new bigDecimal(displayedEntry.blocking))
        .add(new bigDecimal(displayedEntry.stealing))
        .getValue();

      displayedEntry.totalFitness = new bigDecimal(displayedEntry.strength)
        .add(new bigDecimal(displayedEntry.speed))
        .add(new bigDecimal(displayedEntry.stamina))
        .getValue();

      displayedEntry.overall = new bigDecimal(displayedEntry.totalOffense)
        .add(new bigDecimal(displayedEntry.totalDefense))
        .add(new bigDecimal(displayedEntry.totalFitness))
        .getValue();

      return displayedEntry;
    }
  );
}

export function PlayersTable({ data }) {
  const [ baseStatsData ] = React.useState(calculateDisplayData(data, false));
  const [ maxStatsData ] = React.useState(calculateDisplayData(data, true));
  const [ displayData, setDisplayData ] = React.useState(maxStatsData);
  const [ showMaxStats, setShowMaxStats ] = React.useState(true);

  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "")
    }
  });

  const columns = React.useMemo(
    () => [
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
            sortOptions: true,
            filter: "equals",
            disableSortBy: true
          },
          {
            accessor: "conference",
            helperText: "Conf.",
            Filter: SelectColumnFilter,
            sortOptions: true,
            filter: "equals",
            disableSortBy: true
          },
          {
            accessor: "division",
            helperText: "Division",
            Filter: SelectColumnFilter,
            sortOptions: true,
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
        accessor: "overall",
        Header: "OVR",
        showHeader: true,
        showSortLabel: true,
        disableFilters: true
      },
      {
        Header: "Offense",
        showHeader: true,
        backgroundColor: "secondary",
        columns: [
          {
            accessor: "totalOffense",
            Header: "TOT",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "ballHandling",
            Header: "BHL",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "perimeterShooting",
            Header: "PES",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "midRangeShooting",
            Header: "MRS",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "dunkPower",
            Header: "DNK",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          }
        ]
      },
      {
        Header: "Defense",
        showHeader: true,
        columns: [
          {
            accessor: "totalDefense",
            Header: "TOT",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "defense",
            Header: "DEF",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "blocking",
            Header: "BLK",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "stealing",
            Header: "STL",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          }
        ]
      },
      {
        Header: "Fitness",
        showHeader: true,
        backgroundColor: "secondary",
        columns: [
          {
            accessor: "totalFitness",
            Header: "TOT",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "strength",
            Header: "STR",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "speed",
            Header: "SPD",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "stamina",
            Header: "STA",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          }
        ]
      },
      {
        accessor: "beatToRankUp",
        Header: "Beat to Rank Up",
        showHeader: true,
        options: generateRankUpRequirementsOptions(data, e => e.beatToRankUp),
        Filter: SelectColumnFilter,
        filter: "includes",
        disableSortBy: true
      }
    ],
    [ data ]
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
      data: displayData,
      filterTypes
    },
    useFilters,
    useSortBy,
    usePagination
  );

  function updateStats(event) {
    setDisplayData(event.target.checked ? maxStatsData : baseStatsData);
    setShowMaxStats(event.target.checked);
  }

  function updatePage(event, page) {
    gotoPage(page);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <FormControlLabel
          control={<Switch checked={showMaxStats} onChange={updateStats} />}
          label="Show Max Stats"
        />
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
                          style={{
                            textAlign: cell.getCellProps().key.endsWith("name") ? "left" : "center",
                            whiteSpace: "nowrap",
                            backgroundColor: cell.getCellProps().key.includes("total")
                              ? theme.palette.text.secondary
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
      </CssBaseline>
    </ThemeProvider>
  );
}
