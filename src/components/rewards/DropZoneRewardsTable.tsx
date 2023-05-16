import React from "react";

import { BaseTable } from "/src/components/common/Table";

export function DropZoneRewardsTable(props: any) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "dropZone",
        width: "10%",
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
        width: "10%",
        Header: "Recharge Time",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "dailyLimit",
        width: "10%",
        Header: "Daily Limit",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "primaryDrop",
        width: "10%",
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
            width: "10%",
            Header: "Cred.",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropEnergyDrinks",
            width: "10%",
            Header: "Energy Drinks",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropBoosts",
            width: "10%",
            Header: "Boosts",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropXpWildcards",
            width: "10%",
            Header: "XP Wildcards",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropStarTokens",
            width: "10%",
            Header: "Star Tokens",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "secondaryDropArenaPasses",
            width: "10%",
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
