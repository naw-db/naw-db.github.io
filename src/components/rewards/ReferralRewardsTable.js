import React from "react";

import { BaseTable } from "src/components/rewards/BaseTable";

export function ReferralRewardsTable({ theme, defaultPageSize, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "task",
        Header: "Task",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        Header: "Referral Recipient",
        showHeader: true,
        backgroundColor: theme.palette.text.secondary,
        columns: [
          {
            accessor: "referralRecipientReward",
            Header: "Reward",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            textAlign: "left",
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "referralRecipientRewardQuantity",
            Header: "Quantity",
            showHeader: true,
            backgroundColor: theme.palette.text.secondary,
            disableFilters: true,
            disableSortBy: true
          }
        ]
      },
      {
        Header: "Referrer",
        showHeader: true,
        columns: [
          {
            accessor: "referrerReward",
            Header: "Reward",
            showHeader: true,
            textAlign: "left",
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "referrerRewardQuantity",
            Header: "Quantity",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          }
        ]
      }
    ],
    [ theme.palette.text.secondary ]
  );

  return (
    <BaseTable theme={theme} columns={columns} defaultPageSize={defaultPageSize} data={data} />
  );
}
