import React from "react";

import { BaseTable, SelectColumnFilter } from "src/components/common/Table";

export function EncounterRewardsTable(props: any) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        helperText: "Team Level",
        sticky: true,
        backgroundColor: props.theme.palette.background.default,
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "opponentTier",
        Header: "Opponent Tier",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "credsToPlay",
        Header: "Cred. to Play",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "teamRepUponWin",
        Header: "Team Rep.",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "credsUponWin",
        Header: "Cred.",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerXpUponWin",
        Header: "Player XP",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "replayCost",
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
