import { MenuItem, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const Styles = styled.div`
  padding: 0.5rem;

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

export function TextColumnFilter({ column: { label, filterValue, setFilter }}) {
  return (
    <TextField
      label={label}
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

export function SelectColumnFilter({ column: { id, label, helperText, filterValue, setFilter, preFilteredRows } }) {
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
      {options.map(
        (option, i) => (
          <MenuItem key={i} value={option}>{option}</MenuItem>
        )
      )}
    </TextField>
  );
}
