import React from "react";

import { BaseTable } from "src/components/rewards/BaseTable";
import { SelectColumnFilter } from "src/components/common/Table";

export function PracticeCourtRewardsTable({ theme, defaultPageSize, data }) {
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
        accessor: "playerXpVsStarter",
        Header: "Player XP v.s. Starter",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerXpVsAllStar",
        Header: "Player XP v.s. All-Star",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerXpVsAllWorld",
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
