import React from "react";

import { BaseTable, SelectColumnFilter } from "src/components/common/Table";
import { generateBrandOptions, generateColorOptions, generateRarityOptions, generateStyleOptions } from "src/components/gear/TableOptions";

export function EyewearTable(props: any) {
  const columns = React.useMemo(
    () => [
      {
        id: "info",
        columns: [
          {
            accessor: "type",
            helperText: "Type",
            sticky: true,
            backgroundColor: props.theme.palette.background.default,
            Filter: SelectColumnFilter,
            filter: "equals",
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
            options: generateBrandOptions(props.data, (e: any) => e.brand),
            Filter: SelectColumnFilter,
            filter: "equals",
            disableSortBy: true
          },
          {
            accessor: "style",
            helperText: "Style",
            options: generateStyleOptions(props.data, (e: any) => e.style),
            Filter: SelectColumnFilter,
            filter: "equals",
            disableSortBy: true
          },
          {
            accessor: "color",
            helperText: "Color",
            options: generateColorOptions(props.data, (e: any) => e.color),
            Filter: SelectColumnFilter,
            filter: "includes",
            disableSortBy: true
          },
          {
            accessor: "rarity",
            helperText: "Rarity",
            options: generateRarityOptions(props.data, (e: any) => e.rarity),
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
