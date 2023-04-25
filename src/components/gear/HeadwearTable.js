import React from "react";

import { SelectColumnFilter, TextColumnFilter } from "src/components/common/Table";
import { BaseTable, generateBrandOptions, generateColorOptions, generateStyleOptions } from "src/components/gear/BaseTable";

export function HeadwearTable({ defaultPageSize, data }) {
  const columns = React.useMemo(
    () => {
      return [
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
      ];
    },
    [ data ]
  );

  return (
    <BaseTable defaultPageSize={defaultPageSize} columns={columns} data={data} />
  );
}
