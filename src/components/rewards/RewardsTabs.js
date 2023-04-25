import { Box, createTheme, CssBaseline, Tab, Tabs, ThemeProvider, Typography } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import PropTypes from "prop-types";
import React from "react";

import {
  DailyArenaTournamentRewardsByTeamLevelTable,
  DailyArenaTournamentRewardsTable,
  WeeklyArenaTournamentRewardsTable
} from "src/components/rewards/ArenaTournamentRewardsTable";
import { EncounterRewardsTable } from "src/components/rewards/EncounterRewardsTable";
import { OneOnOneRewardsTable } from "src/components/rewards/OneOnOneRewardsTable";
import { PracticeCourtRewardsTable } from "src/components/rewards/PracticeCourtRewardsTable";
import { RuleTheCourtRewardsTable } from "src/components/rewards/RuleTheCourtRewardsTable";
import { TeamLevelRewardsTable } from "src/components/rewards/TeamLevelRewardsTable";

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

export function RewardsTabs({ data }) {
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

  const teamLevelRewardsTableData = React.useMemo(
    () => data.allTeamLevelRewardsCsv.nodes,
    [ data.allTeamLevelRewardsCsv.nodes ]
  );

  const encounterRewardsTableData = React.useMemo(
    () => data.allEncounterRewardsCsv.nodes,
    [ data.allEncounterRewardsCsv.nodes ]
  );

  const ruleTheCourtRewardsTableData = React.useMemo(
    () => data.allRuleTheCourtRewardsCsv.nodes,
    [ data.allRuleTheCourtRewardsCsv.nodes ]
  );

  const weeklyArenaTournamentRewardsTableData = React.useMemo(
    () => data.allWeeklyArenaTournamentRewardsCsv.nodes,
    [ data.allWeeklyArenaTournamentRewardsCsv.nodes ]
  );

  const dailyArenaTournamentRewardsTableData = React.useMemo(
    () => data.allDailyArenaTournamentRewardsCsv.nodes,
    [ data.allDailyArenaTournamentRewardsCsv.nodes ]
  );

  const dailyArenaTournamentRewardsByTeamLevelTableData = React.useMemo(
    () => data.allDailyArenaTournamentRewardsByTeamLevelCsv.nodes,
    [ data.allDailyArenaTournamentRewardsByTeamLevelCsv.nodes ]
  );

  const practiceCourtRewardsTableData = React.useMemo(
    () => data.allPracticeCourtRewardsCsv.nodes,
    [ data.allPracticeCourtRewardsCsv.nodes ]
  );

  const oneOnOneRewardsTableData = React.useMemo(
    () => data.allOneOnOneRewardsCsv.nodes,
    [ data.allOneOnOneRewardsCsv.nodes ]
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
          <Tab label="Team Level" {...a11yProps(0)} />
          <Tab label="Encounter" {...a11yProps(1)} />
          <Tab label="Rule the Court" {...a11yProps(2)} />
          <Tab label="Arena Tournament" {...a11yProps(3)} />
          <Tab label="Practice Court" {...a11yProps(4)} />
          <Tab label="1v1" {...a11yProps(5)} />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <TeamLevelRewardsTable theme={theme} data={teamLevelRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <EncounterRewardsTable theme={theme} data={encounterRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <RuleTheCourtRewardsTable theme={theme} data={ruleTheCourtRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <Typography variant="h6" gutterBottom>
            Weekly
          </Typography>
          <WeeklyArenaTournamentRewardsTable theme={theme} data={weeklyArenaTournamentRewardsTableData} />
          <br/>
          <Typography variant="h6" gutterBottom>
            Daily
          </Typography>
          <DailyArenaTournamentRewardsTable theme={theme} data={dailyArenaTournamentRewardsTableData} />
          <DailyArenaTournamentRewardsByTeamLevelTable theme={theme} data={dailyArenaTournamentRewardsByTeamLevelTableData} />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <PracticeCourtRewardsTable theme={theme} data={practiceCourtRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <OneOnOneRewardsTable theme={theme} data={oneOnOneRewardsTableData} />
        </TabPanel>
      </CssBaseline>
    </ThemeProvider>
  );
}
