import { createTheme, PaletteMode } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";

import { BaseTable, SelectColumnFilter } from "/src/components/common/Table";

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
        width: "10%",
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
        width: "10%",
        helperText: "Series",
        textAlign: "left",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "date",
        width: "10%",
        Header: "Date",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "duration",
        width: "10%",
        Header: "Duration",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "arena",
        width: "10%",
        Header: "Arena",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "passRequired",
        width: "10%",
        Header: "Pass Required?",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "leaderboardSize",
        width: "10%",
        Header: "Leaderboard Size",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerRequirements",
        width: "10%",
        Header: "Player Requirements",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "numberOfPlayers",
        width: "10%",
        Header: "# of Players",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "pointsToWin",
        width: "10%",
        Header: "Points to Win",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "numberOfGames",
        width: "10%",
        Header: "# of Games",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "lossesToBeEliminated",
        width: "10%",
        Header: "Losses to Be Eliminated",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "completionRings",
        width: "10%",
        Header: "Completion Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "leaderboardRings",
        width: "10%",
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
