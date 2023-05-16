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
            textAlign: "left",
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
            accessor: "price",
            Header: "$",
            showHeader: true,
            hoverText: "Price",
            showSortLabel: true,
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
            accessor: "level1Offense",
            Header: "OFF",
            showHeader: true,
            hoverText: "Level 1 Offense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level1Defense",
            Header: "DEF",
            showHeader: true,
            hoverText: "Level 1 Defense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level1Fitness",
            Header: "FIT",
            showHeader: true,
            hoverText: "Level 1 Fitness",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level1QuantityRequiredToUpgrade",
            Header: "QTY",
            showHeader: true,
            hoverText: "Quantity Required to Upgrade to Level 2",
            disableFilters: true
          },
          {
            accessor: "level1CredsRequiredToUpgrade",
            Header: "CDT",
            showHeader: true,
            hoverText: "Cred. Required to Upgrade to Level 2",
            disableFilters: true
          }
        ]
      },
      {
        Header: "Level 2",
        showHeader: true,
        columns: [
          {
            accessor: "level2Offense",
            Header: "OFF",
            showHeader: true,
            hoverText: "Level 2 Offense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level2Defense",
            Header: "DEF",
            showHeader: true,
            hoverText: "Level 2 Defense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level2Fitness",
            Header: "FIT",
            showHeader: true,
            hoverText: "Level 2 Fitness",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level2QuantityRequiredToUpgrade",
            Header: "QTY",
            showHeader: true,
            hoverText: "Quantity Required to Upgrade to Level 3",
            disableFilters: true
          },
          {
            accessor: "level2CredsRequiredToUpgrade",
            Header: "CDT",
            showHeader: true,
            hoverText: "Cred. Required to Upgrade to Level 3",
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
            accessor: "level3Offense",
            Header: "OFF",
            showHeader: true,
            hoverText: "Level 3 Offense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level3Defense",
            Header: "DEF",
            showHeader: true,
            hoverText: "Level 3 Defense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level3Fitness",
            Header: "FIT",
            showHeader: true,
            hoverText: "Level 3 Fitness",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level3QuantityRequiredToUpgrade",
            Header: "QTY",
            showHeader: true,
            hoverText: "Quantity Required to Upgrade to Level 4",
            disableFilters: true
          },
          {
            accessor: "level3CredsRequiredToUpgrade",
            Header: "CDT",
            showHeader: true,
            hoverText: "Cred. Required to Upgrade to Level 4",
            disableFilters: true
          }
        ]
      },
      {
        Header: "Level 4",
        showHeader: true,
        columns: [
          {
            accessor: "level4Offense",
            Header: "OFF",
            showHeader: true,
            hoverText: "Level 4 Offense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level4Defense",
            Header: "DEF",
            showHeader: true,
            hoverText: "Level 4 Defense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level4Fitness",
            Header: "FIT",
            showHeader: true,
            hoverText: "Level 4 Fitness",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level4QuantityRequiredToUpgrade",
            Header: "QTY",
            showHeader: true,
            hoverText: "Quantity Required to Upgrade to Level 5",
            disableFilters: true
          },
          {
            accessor: "level4CredsRequiredToUpgrade",
            Header: "CDT",
            showHeader: true,
            hoverText: "Cred. Required to Upgrade to Level 5",
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
            accessor: "level5Offense",
            Header: "OFF",
            showHeader: true,
            hoverText: "Level 5 Offense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level5Defense",
            Header: "DEF",
            showHeader: true,
            hoverText: "Level 5 Defense",
            showSortLabel: true,
            disableFilters: true
          },
          {
            accessor: "level5Fitness",
            Header: "FIT",
            showHeader: true,
            hoverText: "Level 5 Fitness",
            showSortLabel: true,
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
