import React from "react";

import { BaseTable } from "src/components/common/Table";

export function TeamLevelRewardsTable(props) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        Header: "Team Level",
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
        accessor: "playersRecruited",
        Header: "Players Recruited",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerLevelRequirements",
        Header: "Player Level Requirements",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "metersTraveled",
        Header: "Meters Traveled",
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
        accessor: "rosterSlots",
        Header: "Roster Slots",
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
