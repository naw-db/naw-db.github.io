import { createTheme, CssBaseline, PaletteMode, Tab, Tabs, ThemeProvider } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";
import { isBrowser } from "react-device-detect";
import { getQueryParams, setQueryParams } from "react-use-query-param-string";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW } from "/src/components/common/Defaults";
import { a11yProps, TabPanel } from "/src/components/common/Tab";
import { BallsTable } from "/src/components/gear/BallsTable";
import { EyewearTable } from "/src/components/gear/EyewearTable";
import { HeadwearTable } from "/src/components/gear/HeadwearTable";
import { PantsTable } from "/src/components/gear/PantsTable";
import { ShirtsTable } from "/src/components/gear/ShirtsTable";
import { SneakersTable } from "/src/components/gear/SneakersTable";
import { SocksTable } from "/src/components/gear/SocksTable";

export function GearTabs({ data }: { data: any; }) {
  const defaultPageSize = isBrowser ? DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_PAGE_SIZE;

  const queryParams: any = getQueryParams();

  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
    }
  });

  const [ tab, setTab ] = React.useState(queryParams.tab || "shirts");

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
          onChange={
            (e) => {
              const tabId = (e.target as HTMLButtonElement).id;
              
              queryParams.tab = tabId;
              setQueryParams(queryParams);
              setTab(tabId);
            }
          }
        >
          <Tab label="Shirts" value="shirts" {...a11yProps("shirts")} />
          <Tab label="Pants" value="pants" {...a11yProps("pants")} />
          <Tab label="Sneakers" value="sneakers" {...a11yProps("sneakers")} />
          <Tab label="Headwear" value="headwear" {...a11yProps("headwear")} />
          <Tab label="Eyewear" value="eyewear" {...a11yProps("eyewear")} />
          <Tab label="Balls" value="balls" {...a11yProps("balls")} />
          <Tab label="Socks" value="socks" {...a11yProps("socks")} />
        </Tabs>
        <TabPanel value="shirts" selected={tab === "shirts"}>
          <ShirtsTable theme={theme} defaultPageSize={defaultPageSize} data={shirtsTableData} />
        </TabPanel>
        <TabPanel value="pants" selected={tab === "pants"}>
          <PantsTable theme={theme} defaultPageSize={defaultPageSize} data={pantsTableData} />
        </TabPanel>
        <TabPanel value="sneakers" selected={tab === "sneakers"}>
          <SneakersTable theme={theme} defaultPageSize={defaultPageSize} data={sneakersTableData} />
        </TabPanel>
        <TabPanel value="headwear" selected={tab === "headwear"}>
          <HeadwearTable theme={theme} defaultPageSize={defaultPageSize} data={headwearTableData} />
        </TabPanel>
        <TabPanel value="eyewear" selected={tab === "eyewear"}>
          <EyewearTable theme={theme} defaultPageSize={defaultPageSize} data={eyewearTableData} />
        </TabPanel>
        <TabPanel value="balls" selected={tab === "balls"}>
          <BallsTable theme={theme} defaultPageSize={defaultPageSize} data={ballsTableData} />
        </TabPanel>
        <TabPanel value="socks" selected={tab === "socks"}>
          <SocksTable theme={theme} defaultPageSize={defaultPageSize} data={socksTableData} />
        </TabPanel>
      </CssBaseline>
    </ThemeProvider>
  );
}
