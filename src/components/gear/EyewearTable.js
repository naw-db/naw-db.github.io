import React from "react";

import {
  generateBrandOptions,
  generateColorOptions,
  generateRarityOptions,
  generateStyleOptions,
  SelectColumnFilter
} from "src/components/common/Table";
import { BaseTable } from "src/components/gear/BaseTable";

export function EyewearTable({ theme, data }) {
  const columns = React.useMemo(
    () => [
      {
        id: "info",
        columns: [
          {
            accessor: "type",
            helperText: "Type",
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
            options: generateBrandOptions(data, e => e.brand),
            Filter: SelectColumnFilter,
            filter: "equals",
            disableSortBy: true
          },
          {
            accessor: "style",
            helperText: "Style",
            options: generateStyleOptions(data, e => e.style),
            Filter: SelectColumnFilter,
            filter: "equals",
            disableSortBy: true
          },
          {
            accessor: "color",
            helperText: "Color",
            options: generateColorOptions(data, e => e.color),
            Filter: SelectColumnFilter,
            filter: "includes",
            disableSortBy: true
          },
          {
            accessor: "rarity",
            helperText: "Rarity",
            options: generateRarityOptions(data, e => e.rarity),
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
    [ data ]
  );

  return (
    <BaseTable theme={theme} columns={columns} data={data} />
  );
}
