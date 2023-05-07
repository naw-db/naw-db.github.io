import { createTheme, PaletteMode } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";

import { BaseTable } from "/src/components/common/Table";

export default function PlayerLevelRequirementsTable(props: any) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
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

  return (
    <BaseTable theme={theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}
