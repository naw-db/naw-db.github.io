import React from "react";

import { SelectColumnFilter, TextColumnFilter } from "src/components/common/Table";
import { BaseTable } from "src/components/gear/BaseTable";

export const columnDefinitions = [
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
        accessor: "style",
        helperText: "Style",
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
  },
  {
    Header: "Level 1",
    showHeader: true,
    backgroundColor: "secondary",
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level1Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level1Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level1Fitness",
        disableFilters: true
      },
      {
        Header: "QTY",
        showHeader: true,
        accessor: "level1QuantityRequiredToUpgrade",
        disableFilters: true
      },
      {
        Header: "CDT",
        showHeader: true,
        accessor: "level1CredsRequiredToUpgrade",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Level 2",
    showHeader: true,
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level2Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level2Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level2Fitness",
        disableFilters: true
      },
      {
        Header: "QTY",
        showHeader: true,
        accessor: "level2QuantityRequiredToUpgrade",
        disableFilters: true
      },
      {
        Header: "CDT",
        showHeader: true,
        accessor: "level2CredsRequiredToUpgrade",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Level 3",
    showHeader: true,
    backgroundColor: "secondary",
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level3Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level3Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level3Fitness",
        disableFilters: true
      },
      {
        Header: "QTY",
        showHeader: true,
        accessor: "level3QuantityRequiredToUpgrade",
        disableFilters: true
      },
      {
        Header: "CDT",
        showHeader: true,
        accessor: "level3CredsRequiredToUpgrade",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Level 4",
    showHeader: true,
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level4Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level4Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level4Fitness",
        disableFilters: true
      },
      {
        Header: "QTY",
        showHeader: true,
        accessor: "level4QuantityRequiredToUpgrade",
        disableFilters: true
      },
      {
        Header: "CDT",
        showHeader: true,
        accessor: "level4CredsRequiredToUpgrade",
        disableFilters: true
      }
    ]
  },
  {
    Header: "Level 5",
    showHeader: true,
    backgroundColor: "secondary",
    columns: [
      {
        Header: "OFF",
        showHeader: true,
        accessor: "level5Offense",
        disableFilters: true
      },
      {
        Header: "DEF",
        showHeader: true,
        accessor: "level5Defense",
        disableFilters: true
      },
      {
        Header: "FIT",
        showHeader: true,
        accessor: "level5Fitness",
        disableFilters: true
      }
    ]
  }
];

export function SneakersTable({ theme, data }) {
  const columns = React.useMemo(
    () => columnDefinitions,
    []
  );

  return (
    <BaseTable theme={theme} columns={columns} data={data} />
  );
}
