import { createTheme } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";

import { BaseTable } from "src/components/common/Table";

export default function TeamLevelTipsTable(props) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "")
    }
  });

  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        Header: "Team Level",
        showHeader: true,
        sticky: true,
        backgroundColor: theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "requirement",
        Header: "Requirement",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "action",
        Header: "Action",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "totalStarters",
        Header: " Total Starters",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "totalAllStars",
        Header: "Total All-Stars",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "totalAllWorlds",
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
