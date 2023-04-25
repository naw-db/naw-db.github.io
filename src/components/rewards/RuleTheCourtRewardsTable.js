import React from "react";

import { BaseTable } from "src/components/rewards/BaseTable";

export function RuleTheCourtRewardsTable({ theme, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "wins",
        Header: "Wins",
        showHeader: true,
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
    []
  );

  return (
    <BaseTable theme={theme} columns={columns} data={data} />
  );
}
