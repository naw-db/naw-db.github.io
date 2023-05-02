import React from "react";

import { BaseTable } from "src/components/common/Table";

export function DropZoneRewardsTable(props) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "dropZone",
        Header: "Drop Zone",
        showHeader: true,
        textAlign: "left",
        sticky: true,
        backgroundColor: props.theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "rechargeTime",
        Header: "Recharge Time",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "dailyLimit",
        Header: "Daily Limit",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "primaryDrop",
        Header: "Primary Drop",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        Header: "Secondary Drop",
        showHeader: true,
        columns: [
          {
            accessor: "secondaryDropCreds",
            Header: "Cred.",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropEnergyDrinks",
            Header: "Energy Drinks",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropBoosts",
            Header: "Boosts",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropXpWildcards",
            Header: "XP Wildcards",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropStarTokens",
            Header: "Star Tokens",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropArenaPasses",
            Header: "Arena Passes",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          }
        ]
      }
    ],
    [ props.theme.palette.background.default ]
  );

  return (
    <BaseTable theme={props.theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}
