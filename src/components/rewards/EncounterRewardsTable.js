import React from "react";

import { BaseTable } from "src/components/rewards/BaseTable";
import { SelectColumnFilter } from "src/components/common/Table";

export function EncounterRewardsTable({ theme, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        helperText: "Team Level",
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
    []
  );

  return (
    <BaseTable theme={theme} columns={columns} data={data} />
  );
}
