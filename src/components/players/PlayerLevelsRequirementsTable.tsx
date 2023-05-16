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
        width: "10%",
        Header: "Rank / Level",
        showHeader: true,
        sticky: true,
        backgroundColor: theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "drillOpponentTier",
        width: "10%",
        Header: "Drill Opponent Tier",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "drillWinsRequired",
        width: "10%",
        Header: "Drill Wins",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "starTokensRequired",
        width: "10%",
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
            width: "10%",
            Header: "XP",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "credsRequiredStarter",
            width: "10%",
            Header: "Cred.",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "ringsRequiredStarter",
            width: "10%",
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
            width: "10%",
            Header: "XP",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "credsRequiredAllStar",
            width: "10%",
            Header: "Cred.",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "ringsRequiredAllStar",
            width: "10%",
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
            width: "10%",
            Header: "XP",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "credsRequiredAllWorld",
            width: "10%",
            Header: "Cred.",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "ringsRequiredAllWorld",
            width: "10%",
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
