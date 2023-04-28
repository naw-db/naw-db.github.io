import React from "react";

import { BaseTable } from "src/components/rewards/BaseTable";
import { SelectColumnFilter } from "src/components/common/Table";

export function OneOnOneRewardsTable({ theme, defaultPageSize, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        helperText: "Team Level",
        sticky: true,
        backgroundColor: theme.palette.background.default,
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "type",
        helperText: "Type",
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
    [ theme.palette.background.default ]
  );

  return (
    <BaseTable theme={theme} columns={columns} defaultPageSize={defaultPageSize} data={data} />
  );
}
