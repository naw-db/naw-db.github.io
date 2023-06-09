import { Checkbox, createTheme, FormControlLabel, ListItemText, MenuItem, PaletteMode, Switch, TextField } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context"
import bigDecimal from "js-big-decimal";
import { parseFullName } from "parse-full-name";
import React from "react";
import { isBrowser } from "react-device-detect";

import { DEFAULT_TABLE_PAGE_SIZE, DEFAULT_TABLE_PAGE_SIZE_IN_DESKTOP_VIEW } from "/src/components/common/Defaults";
import { BaseTable, SelectColumnFilter, TextColumnFilter } from "/src/components/common/Table";
import { STAT_CATEGORIES } from "/src/components/players/PlayerStats";

export const RANK_UP_REQUIREMENT_SEPARATOR: string = " → ";

function PositionColumnFilter(
  {
    column: {
      label,
      helperText,
      filterValue,
      setFilter
    }
  }: {
    column: {
      label: string;
      helperText: string;
      filterValue: string;
      setFilter: Function
    }
  }
) {
  return (
    <TextField
      select
      SelectProps={{
        multiple: true,
        renderValue: (selected: any) => selected.join(", ")
      }}
      label={label}
      helperText={helperText}
      defaultValue=""
      value={filterValue || []}
      size="small"
      fullWidth
      onChange={
        ({ target: { value: targetValue }}) => {
          setFilter(
            targetValue.length === 0 || targetValue.includes("")
              ? undefined
              : targetValue
          );
        }
      }
    >
      <MenuItem value=""><ListItemText primary="Any" sx={{ textAlign: "center" }} /></MenuItem>
      {
        [ "PG", "SG", "SF", "PF", "C" ].map(
          position => <MenuItem key={position} value={position}>
            <Checkbox checked={filterValue ? filterValue.indexOf(position) > -1 : false} />
            <ListItemText primary={position} />
          </MenuItem>
        )
      }
    </TextField>
  );
}

function generateRankUpRequirementsOptions(data: Array<any>, selectFieldFunction: Function) {
  return new Set(
    data.flatMap(e => selectFieldFunction(e).split(RANK_UP_REQUIREMENT_SEPARATOR))
      .map(e => e.trim())
      .sort(
        (a, b) => {
          return parseFullName(a).last !== parseFullName(b).last
            ? parseFullName(a).last.localeCompare(parseFullName(b).last)
            : parseFullName(a).first.localeCompare(parseFullName(b).first)
        }
      )
  );
}

function calculateDisplayData(data: Array<any>, displayMaxStats: boolean) {
  return data.map(
    entry => {
      const displayedEntry = Object.assign({}, entry);

      STAT_CATEGORIES.forEach(
        (category: string) => {
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

export function PlayersTable({ data }: { data: Array<any> }) {
  const [ baseStatsData ] = React.useState(calculateDisplayData(data, false));
  const [ maxStatsData ] = React.useState(calculateDisplayData(data, true));
  const [ displayData, setDisplayData ] = React.useState(maxStatsData);
  const [ showMaxStats, setShowMaxStats ] = React.useState(true);

  const defaultPageSize = isBrowser ? DEFAULT_TABLE_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_TABLE_PAGE_SIZE;

  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
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
            sticky: true,
            textAlign: "left",
            backgroundColor: theme.palette.background.default,
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
            filter: "in",
            multiple: true,
            disableSortBy: true
          },
          {
            accessor: "team",
            helperText: "Team",
            Filter: SelectColumnFilter,
            filter: "in",
            multiple: true,
            sortOptions: true,
            disableSortBy: true
          },
          {
            accessor: "conference",
            helperText: "Conf.",
            Filter: SelectColumnFilter,
            filter: "equals",
            sortOptions: true,
            disableSortBy: true
          },
          {
            accessor: "division",
            helperText: "Division",
            Filter: SelectColumnFilter,
            filter: "in",
            multiple: true,
            sortOptions: true,
            disableSortBy: true
          },
          {
            accessor: "position",
            helperText: "Pos.",
            Filter: PositionColumnFilter,
            filter: "intersect",
            disableSortBy: true
          }
        ]
      },
      {
        accessor: "overall",
        Header: "OVR",
        hoverText: "Overall",
        showHeader: true,
        showSortLabel: true,
        disableFilters: true
      },
      {
        Header: "Offense",
        showHeader: true,
        backgroundColor: theme.palette.text.secondary,
        columns: [
          {
            accessor: "totalOffense",
            Header: "TOT",
            hoverText: "Overall Offense",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "ballHandling",
            Header: "BHL",
            hoverText: "Ball Handling",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "perimeterShooting",
            Header: "PES",
            hoverText: "Perimeter Shooting",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "midRangeShooting",
            Header: "MRS",
            hoverText: "Mid-Range Shooting",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "dunkPower",
            Header: "DNK",
            hoverText: "Dunk Power",
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
            hoverText: "Overall Defense",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "defense",
            Header: "DEF",
            hoverText: "Defense",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "blocking",
            Header: "BLK",
            hoverText: "Blocking",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "stealing",
            Header: "STL",
            hoverText: "Stealing",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          }
        ]
      },
      {
        Header: "Fitness",
        showHeader: true,
        backgroundColor: theme.palette.text.secondary,
        columns: [
          {
            accessor: "totalFitness",
            Header: "TOT",
            hoverText: "Overall Fitness",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "strength",
            Header: "STR",
            hoverText: "Strength",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "speed",
            Header: "SPD",
            hoverText: "Speed",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "stamina",
            Header: "STA",
            hoverText: "Stamina",
            showHeader: true,
            showSortLabel: true,
            disableFilters: true
          }
        ]
      },
      {
        accessor: "beatToRankUp",
        helperText: "Beat to Rank Up",
        options: generateRankUpRequirementsOptions(data, (e: any) => e.beatToRankUp),
        Filter: SelectColumnFilter,
        filter: "includes",
        disableSortBy: true
      }
    ],
    [
      data,
      theme.palette.background.default,
      theme.palette.text.secondary
    ]
  );

  function updateStats(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayData(event.target.checked ? maxStatsData : baseStatsData);
    setShowMaxStats(event.target.checked);
  }

  return (
    <>
      <FormControlLabel
        control={<Switch checked={showMaxStats} onChange={updateStats} />}
        label="Show Max Stats"
      />
      <BaseTable theme={theme} columns={columns} defaultPageSize={defaultPageSize} data={displayData} />
    </>
  );
}
