import React from "react";

import { BaseTable, SelectColumnFilter } from "src/components/common/Table";

export function PracticeCourtRewardsTable(props: any) {
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
    [ props.theme.palette.background.default ]
  );

  return (
    <BaseTable theme={props.theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}
