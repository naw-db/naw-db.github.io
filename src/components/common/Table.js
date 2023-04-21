import { MenuItem, Table, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { matchSorter } from "match-sorter";
import React from "react";

const BRAND_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00"
};

const STYLE_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00"
};

const COLOR_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00"
};

const RARITY_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00",
  "Starter": "000",
  "All-Star": "0000",
  "All-World": "00000"
};

export function TextColumnFilter({ column: { label, helperText, filterValue, setFilter }}) {
  return (
    <TextField
      label={label}
      helperText={helperText}
      value={filterValue || ""}
      size="small"
      onChange={
        e => {
          setFilter(e.target.value || undefined);  // Set undefined to remove the filter entirely
        }
      }
    />
  );
}

export function SelectColumnFilter({ column: { id, label, helperText, options = null, filterValue, setFilter, preFilteredRows, sortOptions = false } }) {
  // Calculate the organic options for filtering using the preFilteredRows.
  const columnOptions = Array.from(
    React.useMemo(
      () => {
        const optionsSet = options ? options : new Set(
          preFilteredRows.map(
            row => row.values[id]
          )
        );

        return [...optionsSet.values()];
      },
      [ id, options, preFilteredRows ]
    )
  );

  if (sortOptions) {
    columnOptions.sort();
  }

  // Render a multi-select box.
  return (
    <TextField
      select
      label={label}
      helperText={helperText}
      defaultValue=""
      value={filterValue || ""}
      size="small"
      fullWidth
      onChange={
        e => {
          setFilter(e.target.value || undefined);
        }
      }
    >
      <MenuItem value="">All</MenuItem>
      {
        columnOptions.map(
          (option, i) => (
            <MenuItem key={i} value={option}>{option}</MenuItem>
          )
        )
      }
    </TextField>
  );
}

export const ScrollableTable = styled(Table)`
  display: block;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

// Remove the filter if the string is empty.
fuzzyTextFilterFn.autoRemove = val => !val;

export function generateBrandOptions(data, selectFieldFunction) {
  return new Set(
    data.map(e => selectFieldFunction(e))
      .sort(
        (a, b) => {
          const normalizedA = BRAND_SORT_ORDER[a] ? BRAND_SORT_ORDER[a] : a;
          const normalizedB = BRAND_SORT_ORDER[b] ? BRAND_SORT_ORDER[b] : b;

          return normalizedA.localeCompare(normalizedB);
        }
      )
  );
}

export function generateStyleOptions(data, selectFieldFunction) {
  return new Set(
    data.map(e => selectFieldFunction(e))
      .sort(
        (a, b) => {
          const normalizedA = STYLE_SORT_ORDER[a] ? STYLE_SORT_ORDER[a] : a;
          const normalizedB = STYLE_SORT_ORDER[b] ? STYLE_SORT_ORDER[b] : b;

          return normalizedA.localeCompare(normalizedB);
        }
      )
  );
}

export function generateColorOptions(data, selectFieldFunction) {
  return new Set(
    data.flatMap(e => selectFieldFunction(e).split("/"))
      .map(e => e.trim())
      .sort(
        (a, b) => {
          const normalizedA = COLOR_SORT_ORDER[a] ? COLOR_SORT_ORDER[a] : a;
          const normalizedB = COLOR_SORT_ORDER[b] ? COLOR_SORT_ORDER[b] : b;

          return normalizedA.localeCompare(normalizedB);
        }
      )
  );
}

export function generateRarityOptions(data, selectFieldFunction) {
  return new Set(
    data.map(e => selectFieldFunction(e))
      .sort(
        (a, b) => {
          return RARITY_SORT_ORDER[a].localeCompare(RARITY_SORT_ORDER[b]);
        }
      )
  );
}
