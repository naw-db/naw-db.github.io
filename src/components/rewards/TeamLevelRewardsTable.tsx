import React from "react";

import { BaseTable } from "/src/components/common/Table";

export function TeamLevelRewardsTable(props: any) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        width: "10%",
        Header: "Team Level",
        showHeader: true,
        sticky: true,
        backgroundColor: props.theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "teamRep",
        width: "10%",
        Header: "Team Rep.",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playersRecruited",
        width: "10%",
        Header: "Players Recruited",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playerLevelRequirements",
        width: "10%",
        Header: "Player Level Requirements",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "metersTraveled",
        width: "10%",
        Header: "Meters Traveled",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "creds",
        width: "10%",
        Header: "Cred.",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "starTokens",
        width: "10%",
        Header: "Star Tokens",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "cash",
        width: "10%",
        Header: "Cash",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "xpWildcards",
        width: "10%",
        Header: "XP Wildcards",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "energyDrinks",
        width: "10%",
        Header: "Energy Drinks",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "rosterSlots",
        width: "10%",
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
