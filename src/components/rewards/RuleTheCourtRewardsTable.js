import React from "react";

import { BaseTable } from "src/components/common/Table";

export function RuleTheCourtRewardsTable(props) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "wins",
        Header: "Wins",
        showHeader: true,
        sticky: true,
        backgroundColor: props.theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "teamRep",
        Header: "Team Rep.",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "starTokens",
        Header: "Star Tokens",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "cash",
        Header: "Cash",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "creds",
        Header: "Cred.",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "timeRequired",
        Header: "Time Required",
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
