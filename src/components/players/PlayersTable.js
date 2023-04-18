import {
  createTheme,
  CssBaseline,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context"
import bigDecimal from "js-big-decimal";
import { matchSorter } from "match-sorter";
import React from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";

import { SelectColumnFilter, TextColumnFilter } from "src/components/common/Table";
import { statCategories } from "src/components/players/PlayerStats";

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
        accessor: "totalOffense",
        disableFilters: true
      },
      {
        Header: "BHL",
        showHeader: true,
        accessor: "ballHandling",
        disableFilters: true
      },
      {
        Header: "PES",
        showHeader: true,
        accessor: "perimeterShooting",
        disableFilters: true
      },{
        Header: "MRS",
        showHeader: true,
        accessor: "midRangeShooting",
        disableFilters: true
      },
      {
        Header: "DNK",
        showHeader: true,
        accessor: "dunkPower",
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
        accessor: "totalDefense",
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
        accessor: "totalFitness",
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

export function PlayersTable({ columns, data }) {
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
                              ? theme.palette.text.secondary : null
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
