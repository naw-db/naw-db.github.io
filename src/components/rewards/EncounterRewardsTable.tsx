import React from "react";

import { BaseTable, SelectColumnFilter } from "/src/components/common/Table";

export function EncounterRewardsTable(props: any) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        width: "15%",
        helperText: "Team Level",
        sticky: true,
        backgroundColor: props.theme.palette.background.default,
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "opponentTier",
        width: "25%",
        Header: "Opponent Tier",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "credsToPlay",
        width: "15%",
        Header: "Cred. to Play",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "teamRepUponWin",
        width: "15%",
        Header: "Team Rep.",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "credsUponWin",
        width: "15%",
        Header: "Cred.",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerXpUponWin",
        width: "20%",
        Header: "Player XP",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "replayCost",
        width: "15%",
        Header: "Replay Cost",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      }
    ],
    [ props.theme.palette.background.default ]
  );

  return (
    <BaseTable theme={props.theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}
