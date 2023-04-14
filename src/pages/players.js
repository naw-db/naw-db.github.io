import { graphql } from "gatsby";
import {
  Animation,
  Page,
  Section,
  Seo
} from "gatsby-theme-portfolio-minimal";
import bigDecimal from "js-big-decimal";
import { matchSorter } from "match-sorter";
import React from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// Define a default UI for filtering.
function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter }}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={
        e => {
          setFilter(e.target.value || undefined);  // Set undefined to remove the filter entirely
        }
      }
      placeholder={`Search ${count} record(s)...`}
    />
  );
}

// A custom filter UI for selecting a unique option from a list.
function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  // Calculate the options for filtering using the preFilteredRows.
  const options = React.useMemo(
    () => {
      const options = new Set();
      preFilteredRows.forEach(
        row => { options.add(row.values[id]); }
      );

      return [...options.values()];
    },
    [id, preFilteredRows]
  );

  // Render a multi-select box.
  return (
    <select
      value={filterValue}
      onChange={
        e => {
          setFilter(e.target.value || undefined);
        }
      }
    >
      <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

// Remove the filter if the string is empty.
fuzzyTextFilterFn.autoRemove = val => !val;

function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(
          row => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
              : true;
          }
        );
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({ Filter: DefaultColumnFilter }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters,
    useSortBy,
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? "🔽"
                      : "🔼"
                    : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{ textAlign: "left" }}
          >
          </th>
        </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
      <br />
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}

export default function Players({ data }) {
  const tableColumns = React.useMemo(
    () => [
      {
        Header: " ",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Level Available",
            accessor: "level_available",
            Filter: SelectColumnFilter,
            filter: "equals"
          },
          {
            Header: "Type",
            accessor: "type",
            Filter: SelectColumnFilter,
            filter: "equals"
          },
          {
            Header: "Team",
            accessor: "team",
            Filter: SelectColumnFilter,
            filter: "equals"
          },
          {
            Header: "Conference",
            accessor: "conference",
            Filter: SelectColumnFilter,
            filter: "equals"
          },
          {
            Header: "Division",
            accessor: "division",
            Filter: SelectColumnFilter,
            filter: "equals"
          }
        ]
      },
      {
        Header: "Position",
        columns: [
          {
            Header: "1",
            accessor: "position_1",
            disableFilters: true
          },
          {
            Header: "2",
            accessor: "position_2",
            disableFilters: true
          }
        ]
      },
      {
        Header: "Offense",
        columns: [
          {
            Header: "Total",
            accessor: "total_offense_base",
            disableFilters: true
          },
          {
            Header: "Ball Handling",
            accessor: "ball_handling_base",
            disableFilters: true
          },
          {
            Header: "Perimeter Shooting",
            accessor: "perimeter_shooting_base",
            disableFilters: true
          },{
            Header: "Mid-Range Shooting",
            accessor: "mid_range_shooting_base",
            disableFilters: true
          },
          {
            Header: "Dunk Power",
            accessor: "dunk_power_base",
            disableFilters: true
          }
        ]
      },
      {
        Header: "Defense",
        columns: [
          {
            Header: "Total",
            accessor: "total_defense_base",
            disableFilters: true
          },
          {
            Header: "Defense",
            accessor: "defense_base",
            disableFilters: true
          },
          {
            Header: "Blocking",
            accessor: "blocking_base",
            disableFilters: true
          },
          {
            Header: "Stealing",
            accessor: "stealing_base",
            disableFilters: true
          }
        ]
      },
      {
        Header: "Fitness",
        columns: [
          {
            Header: "Total",
            accessor: "total_fitness_base",
            disableFilters: true
          },
          {
            Header: "Strength",
            accessor: "strength_base",
            disableFilters: true
          },
          {
            Header: "Speed",
            accessor: "speed_base",
            disableFilters: true
          },
          {
            Header: "Stamina",
            accessor: "stamina_base",
            disableFilters: true
          }
        ]
      }
    ],
    []
  );

  const tableData = React.useMemo(
    () => {
      return data.allPlayersCsv
        .nodes
        .map(
          entry => {
            const enriched = Object.assign({}, entry);

            enriched.total_offense_base = new bigDecimal(enriched.ball_handling_base)
              .add(new bigDecimal(enriched.perimeter_shooting_base))
              .add(new bigDecimal(enriched.mid_range_shooting_base))
              .add(new bigDecimal(enriched.dunk_power_base))
              .getValue();

            enriched.total_defense_base = new bigDecimal(enriched.defense_base)
              .add(new bigDecimal(enriched.blocking_base))
              .add(new bigDecimal(enriched.stealing_base))
              .getValue();

            enriched.total_fitness_base = new bigDecimal(enriched.strength_base)
              .add(new bigDecimal(enriched.speed_base))
              .add(new bigDecimal(enriched.stamina_base))
              .getValue();

            return enriched;
          }
        );
    },
    []
  );

  console.log(tableData)

  return (
    <>
      <Seo title="Players" />
      <Page useSplashScreenAnimation>
        <Animation type="fadeUp">
          <Section heading="Players">
            <Styles>
              <Table columns={tableColumns} data={tableData} />
            </Styles>
          </Section>
        </Animation>
      </Page>
    </>
  );
};

export const pageQuery = graphql`
  query pageQuery {
    allPlayersCsv {
      nodes {
        id
        name
        level_available
        type
        team
        conference
        division
        position_1
        position_2
        ball_handling_base
        perimeter_shooting_base
        mid_range_shooting_base
        dunk_power_base
        defense_base
        blocking_base
        stealing_base
        strength_base
        speed_base
        stamina_base
      }
    }
  }
`;
