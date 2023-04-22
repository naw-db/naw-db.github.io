import { Box, createTheme, CssBaseline, Tab, Tabs, ThemeProvider } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import PropTypes from "prop-types";
import React from "react";

import { BallsTable } from "src/components/gear/BallsTable";
import { EyewearTable } from "src/components/gear/EyewearTable";
import { HeadwearTable } from "src/components/gear/HeadwearTable";
import { PantsTable } from "src/components/gear/PantsTable";
import { ShirtsTable } from "src/components/gear/ShirtsTable";
import { SneakersTable } from "src/components/gear/SneakersTable";
import { SocksTable } from "src/components/gear/SocksTable";

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
        <Box>
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

  const pantsTableData = React.useMemo(
    () => data.allPantsCsv.nodes,
    [ data.allPantsCsv.nodes ]
  );

  const sneakersTableData = React.useMemo(
    () => data.allSneakersCsv.nodes,
    [ data.allSneakersCsv.nodes ]
  );

  const headwearTableData = React.useMemo(
    () => data.allHeadwearCsv.nodes,
    [ data.allHeadwearCsv.nodes ]
  );

  const eyewearTableData = React.useMemo(
    () => data.allEyewearCsv.nodes,
    [ data.allEyewearCsv.nodes ]
  );

  const ballsTableData = React.useMemo(
    () => data.allBallsCsv.nodes,
    [ data.allBallsCsv.nodes ]
  );

  const socksTableData = React.useMemo(
    () => data.allSocksCsv.nodes,
    [ data.allSocksCsv.nodes ]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
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
          <PantsTable theme={theme} data={pantsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <SneakersTable theme={theme} data={sneakersTableData} />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <HeadwearTable theme={theme} data={headwearTableData} />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <EyewearTable theme={theme} data={eyewearTableData} />
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <BallsTable theme={theme} data={ballsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={6}>
          <SocksTable theme={theme} data={socksTableData} />
        </TabPanel>
      </CssBaseline>
    </ThemeProvider>
  );
}
