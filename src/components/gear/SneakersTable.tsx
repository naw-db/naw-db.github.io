import React from "react";

import { BaseTable, SelectColumnFilter, TextColumnFilter } from "/src/components/common/Table";
import { generateBrandOptions, generateColorOptions, generateRarityOptions, generateStyleOptions } from "/src/components/gear/TableOptions";

export function SneakersTable(props: any) {
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
      },
      {
        Header: "Level 1",
        showHeader: true,
        backgroundColor: props.theme.palette.text.secondary,
        columns: [
          {
            Header: "OFF",
            showHeader: true,
            showSortLabel: true,
            accessor: "level1Offense",
            disableFilters: true
          },
          {
            Header: "DEF",
            showHeader: true,
            showSortLabel: true,
            accessor: "level1Defense",
            disableFilters: true
          },
          {
            Header: "FIT",
            showHeader: true,
            showSortLabel: true,
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
            showSortLabel: true,
            accessor: "level2Offense",
            disableFilters: true
          },
          {
            Header: "DEF",
            showHeader: true,
            showSortLabel: true,
            accessor: "level2Defense",
            disableFilters: true
          },
          {
            Header: "FIT",
            showHeader: true,
            showSortLabel: true,
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
        backgroundColor: props.theme.palette.text.secondary,
        columns: [
          {
            Header: "OFF",
            showHeader: true,
            showSortLabel: true,
            accessor: "level3Offense",
            disableFilters: true
          },
          {
            Header: "DEF",
            showHeader: true,
            showSortLabel: true,
            accessor: "level3Defense",
            disableFilters: true
          },
          {
            Header: "FIT",
            showHeader: true,
            showSortLabel: true,
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
            showSortLabel: true,
            accessor: "level4Offense",
            disableFilters: true
          },
          {
            Header: "DEF",
            showHeader: true,
            showSortLabel: true,
            accessor: "level4Defense",
            disableFilters: true
          },
          {
            Header: "FIT",
            showHeader: true,
            showSortLabel: true,
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
        backgroundColor: props.theme.palette.text.secondary,
        columns: [
          {
            Header: "OFF",
            showHeader: true,
            showSortLabel: true,
            accessor: "level5Offense",
            disableFilters: true
          },
          {
            Header: "DEF",
            showHeader: true,
            showSortLabel: true,
            accessor: "level5Defense",
            disableFilters: true
          },
          {
            Header: "FIT",
            showHeader: true,
            showSortLabel: true,
            accessor: "level5Fitness",
            disableFilters: true
          }
        ]
      }
    ],
    [
      props.theme.palette.background.default,
      props.theme.palette.text.secondary,
      props.data
    ]
  );

  return (
    <BaseTable theme={props.theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}
