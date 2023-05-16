import { createTheme, PaletteMode } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";

import { BaseTable } from "/src/components/common/Table";

export default function TeamLevelTipsTable(props: any) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
    }
  });

  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        width: "20%",
        Header: "Team Level",
        showHeader: true,
        sticky: true,
        backgroundColor: theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "requirement",
        width: "20%",
        Header: "Requirement",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "action",
        width: "20%",
        Header: "Action",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "totalStarters",
        width: "20%",
        Header: " Total Starters",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "totalAllStars",
        width: "20%",
        Header: "Total All-Stars",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "totalAllWorlds",
        width: "20%",
        Header: "Total All-Worlds",
        showHeader: true,
        textAlign: "left",
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
