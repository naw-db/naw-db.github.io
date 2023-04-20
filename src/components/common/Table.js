import { MenuItem, Table, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { matchSorter } from "match-sorter";
import React from "react";

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

export function SelectColumnFilter({ column: { id, label, helperText, filterValue, setFilter, preFilteredRows, sortOptions } }) {
  // Calculate the options for filtering using the preFilteredRows.
  const options = Array.from(
    React.useMemo(
      () => {
        const options = new Set();
        preFilteredRows.forEach(
          row => { options.add(row.values[id]); }
        );

        return [...options.values()];
      },
      [id, preFilteredRows]
    )
  );

  if (sortOptions) {
    options.sort();
  }

  // Render a multi-select box.
  return (
    <TextField
      select
      label={label}
      helperText={helperText}
      defaultValue=""
      value={filterValue}
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
        options.map(
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
