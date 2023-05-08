import { Box } from "@mui/material";
import PropTypes, { InferProps } from "prop-types";
import React from "react";

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
};

export function TabPanel(props: InferProps<typeof TabPanel.propTypes>) {
  const { children, value, selected, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={!selected}
      id={`scrollable-force-tabpanel-${value}`}
      aria-labelledby={`scrollable-force-tab-${value}`}
      {...other}
    >
      {selected && (<Box>{children}</Box>)}
    </div>
  );
}

export function a11yProps(id: string) {
  return {
    id,
    "aria-controls": `scrollable-force-tabpanel-${id}`,
  };
}
