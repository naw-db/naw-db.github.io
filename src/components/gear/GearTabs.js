import { Box, createTheme, CssBaseline, Tab, Tabs, ThemeProvider} from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import PropTypes from "prop-types";
import React from "react";

import { ShirtsTable } from "src/components/gear/ShirtsTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export function GearTabs({ data }) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "")
    }
  });

  const [ tab, setTab ] = React.useState(0);

  const handleTabChange = (event, targetTab) => {
    setTab(targetTab);
  };

  const shirtsTableData = React.useMemo(
    () => data.allShirtsCsv.nodes,
    [ data.allShirtsCsv.nodes ]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            value={tab}
            onChange={handleTabChange}
          >
            <Tab label="Shirts" {...a11yProps(0)} />
            <Tab label="Pants" {...a11yProps(1)} />
            <Tab label="Sneakers" {...a11yProps(2)} />
            <Tab label="Headwear" {...a11yProps(3)} />
            <Tab label="Eyewear" {...a11yProps(4)} />
            <Tab label="Balls" {...a11yProps(5)} />
            <Tab label="Socks" {...a11yProps(6)} />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <ShirtsTable theme={theme} data={shirtsTableData} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            Pants
          </TabPanel>
          <TabPanel value={tab} index={2}>
            Sneakers
          </TabPanel>
          <TabPanel value={tab} index={3}>
            Headwear
          </TabPanel>
          <TabPanel value={tab} index={4}>
            Eyewear
          </TabPanel>
          <TabPanel value={tab} index={5}>
            Balls
          </TabPanel>
          <TabPanel value={tab} index={6}>
            Socks
          </TabPanel>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
