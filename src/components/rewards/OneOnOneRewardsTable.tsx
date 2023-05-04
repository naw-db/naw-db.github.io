import React from "react";

import { BaseTable, SelectColumnFilter } from "src/components/common/Table";

export function OneOnOneRewardsTable(props: any) {
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
        accessor: "type",
        helperText: "Type",
        textAlign: "left",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "ladderPosition",
        Header: "Ladder Pos.",
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
        accessor: "credsUponWin",
        Header: "Cred.",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "teamRepUponWinVsStarter",
        Header: "Team Rep. v.s. Starter",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerXpUponWinVsStarter",
        Header: "Player XP v.s. Starter",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "teamRepUponWinVsAllStar",
        Header: "Team Rep. v.s. All-Star",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerXpUponWinVsAllStar",
        Header: "Player XP v.s. All-Star",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "teamRepUponWinVsAllWorld",
        Header: "Team Rep. v.s. All-World",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerXpUponWinVsAllWorld",
        Header: "Player XP v.s. All-World",
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
