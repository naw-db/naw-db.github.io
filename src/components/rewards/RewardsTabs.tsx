import { Box, createTheme, CssBaseline, PaletteMode, Tab, Tabs, ThemeProvider, Typography } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import PropTypes from "prop-types";
import React from "react";
import { isBrowser } from "react-device-detect";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW } from "src/components/common/Defaults";
import {
  DailyArenaTournamentRewardsByTeamLevelTable,
  DailyArenaTournamentRewardsTable,
  WeeklyArenaTournamentRewardsTable
} from "src/components/rewards/ArenaTournamentRewardsTable";
import { DropZoneRewardsTable } from "src/components/rewards/DropZoneRewardsTable";
import { EncounterRewardsTable } from "src/components/rewards/EncounterRewardsTable";
import { MilestoneRewardsTable } from "src/components/rewards/MilestoneRewardsTable";
import { OneOnOneRewardsTable } from "src/components/rewards/OneOnOneRewardsTable";
import { PracticeCourtRewardsTable } from "src/components/rewards/PracticeCourtRewardsTable";
import { ReferralRewardsTable } from "src/components/rewards/ReferralRewardsTable";
import { RuleTheCourtRewardsTable } from "src/components/rewards/RuleTheCourtRewardsTable";
import { TeamLevelRewardsTable } from "src/components/rewards/TeamLevelRewardsTable";

function TabPanel(props: any) {
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

function a11yProps(index: number) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export function RewardsTabs({ data }: { data: any; }) {
  const defaultPageSize = isBrowser ? DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_PAGE_SIZE;

  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
    }
  });

  const [ tab, setTab ] = React.useState(0);

  const teamLevelRewardsTableData = React.useMemo(
    () => data.allTeamLevelRewardsCsv.nodes,
    [ data.allTeamLevelRewardsCsv.nodes ]
  );

  const dropZoneRewardsTableData = React.useMemo(
    () => data.allDropZoneRewardsCsv.nodes,
    [ data.allDropZoneRewardsCsv.nodes ]
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

  const milestoneRewardsTableData = React.useMemo(
    () => data.allMilestoneRewardsCsv.nodes,
    [ data.allMilestoneRewardsCsv.nodes ]
  );

  const referralRewardsTableData = React.useMemo(
    () => data.allReferralRewardsCsv.nodes,
    [ data.allReferralRewardsCsv.nodes ]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Tabs
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          value={tab}
          onChange={(event: React.SyntheticEvent, targetTab: any) => setTab(targetTab)}
        >
          <Tab label="Team Level" {...a11yProps(0)} />
          <Tab label="Drop Zone" {...a11yProps(1)} />
          <Tab label="Encounter" {...a11yProps(2)} />
          <Tab label="Rule the Court" {...a11yProps(3)} />
          <Tab label="Arena Tournament" {...a11yProps(4)} />
          <Tab label="Practice Court" {...a11yProps(5)} />
          <Tab label="1v1" {...a11yProps(6)} />
          <Tab label="Milestones" {...a11yProps(7)} />
          <Tab label="Referral" {...a11yProps(8)} />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <TeamLevelRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={teamLevelRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <DropZoneRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={dropZoneRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <EncounterRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={encounterRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <RuleTheCourtRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={ruleTheCourtRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <Typography variant="h6" gutterBottom>
            Weekly
          </Typography>
          <WeeklyArenaTournamentRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={weeklyArenaTournamentRewardsTableData} />
          <br/>
          <Typography variant="h6" gutterBottom>
            Daily
          </Typography>
          <DailyArenaTournamentRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={dailyArenaTournamentRewardsTableData} />
          <DailyArenaTournamentRewardsByTeamLevelTable defaultPageSize={defaultPageSize} theme={theme} data={dailyArenaTournamentRewardsByTeamLevelTableData} />
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <PracticeCourtRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={practiceCourtRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={6}>
          <OneOnOneRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={oneOnOneRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={7}>
          <MilestoneRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={milestoneRewardsTableData} />
        </TabPanel>
        <TabPanel value={tab} index={8}>
          <ReferralRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={referralRewardsTableData} />
        </TabPanel>
      </CssBaseline>
    </ThemeProvider>
  );
}