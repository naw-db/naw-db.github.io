import { createTheme, PaletteMode } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";

import { BaseTable, SelectColumnFilter } from "src/components/common/Table";

export default function EventTournamentHistoryTable(props: any) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
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
        Header: "Losses to Be Eliminated",
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

  return (
    <BaseTable theme={theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}
