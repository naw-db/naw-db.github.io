import React from "react";

import { SelectColumnFilter, TextColumnFilter } from "src/components/common/Table";
import { BaseTable } from "src/components/gear/BaseTable";


const columnDefinitions = [
  {
    id: "info",
    columns: [
      {
        accessor: "name",
        helperText: "Name",
        Filter: TextColumnFilter,
        disableSortBy: true
      },
      {
        accessor: "levelAvailable",
        helperText: "Lvl Avail.",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "brand",
        helperText: "Brand",
        Filter: SelectColumnFilter,
        sortOptions: true,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "color",
        helperText: "Color",
        Filter: SelectColumnFilter,
        sortOptions: true,
        filter: "equals",
        disableSortBy: true
      },
      {
        accessor: "rarity",
        helperText: "Rarity",
        Filter: SelectColumnFilter,
        filter: "equals",
        disableSortBy: true
      },
      {
        Header: "Price",
        showHeader: true,
        accessor: "price",
        disableFilters: true
      }
    ]
  }
];

export function SocksTable({ theme, data }) {
  const columns = React.useMemo(
    () => columnDefinitions,
    []
  );

  return (
    <BaseTable theme={theme} columns={columns} data={data} />
  );
}
