import React from "react";

import { BaseTable, SelectColumnFilter, TextColumnFilter } from "src/components/common/Table";
import { generateBrandOptions, generateColorOptions, generateRarityOptions } from "src/components/gear/TableOptions";

export function SocksTable(props) {
  const columns = React.useMemo(
    () => [
      {
        id: "info",
        columns: [
          {
            accessor: "name",
            helperText: "Name",
            sticky: true,
            backgroundColor: props.theme.palette.background.default,
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
            options: generateBrandOptions(props.data, e => e.brand),
            Filter: SelectColumnFilter,
            filter: "equals",
            disableSortBy: true
          },
          {
            accessor: "color",
            helperText: "Color",
            options: generateColorOptions(props.data, e => e.color),
            Filter: SelectColumnFilter,
            filter: "includes",
            disableSortBy: true
          },
          {
            accessor: "rarity",
            helperText: "Rarity",
            options: generateRarityOptions(props.data, e => e.rarity),
            Filter: SelectColumnFilter,
            filter: "equals",
            disableSortBy: true
          },
          {
            Header: "Price",
            showHeader: true,
            showSortLabel: true,
            accessor: "price",
            disableFilters: true
          }
        ]
      }
    ],
    [
      props.theme.palette.background.default,
      props.data
    ]
  );

  return (
    <BaseTable theme={props.theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}
