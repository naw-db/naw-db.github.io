import React from "react";

import { BaseTable } from "src/components/common/Table";

export function ReferralRewardsTable(props: any) {
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
        backgroundColor: props.theme.palette.text.secondary,
        columns: [
          {
            accessor: "referralRecipientReward",
            Header: "Reward",
            showHeader: true,
            backgroundColor: props.theme.palette.text.secondary,
            textAlign: "left",
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "referralRecipientRewardQuantity",
            Header: "Quantity",
            showHeader: true,
            backgroundColor: props.theme.palette.text.secondary,
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
    [ props.theme.palette.text.secondary ]
  );

  return (
    <BaseTable theme={props.theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}
