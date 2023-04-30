import React from "react";

import { BaseTable } from "src/components/rewards/BaseTable";

export function MilestoneRewardsTable({ theme, defaultPageSize, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "milestone",
        Header: "Milestone",
        sticky: true,
        backgroundColor: theme.palette.background.default,
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "description",
        Header: "Description",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "rings",
        Header: "Rings",
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
        accessor: "cash",
        Header: "Cash",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "xpWildcards",
        Header: "XP Wildcards",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "energyDrinks",
        Header: "Energy Drinks",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "notes",
        Header: "Notes",
        showHeader: true,
        textAlign: "left",
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
