import { createTheme, CssBaseline, PaletteMode, Tab, Tabs, ThemeProvider, Typography } from "@mui/material";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";
import { isBrowser } from "react-device-detect";
import { getQueryParams, setQueryParams } from "react-use-query-param-string";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW } from "/src/components/common/Defaults";
import { a11yProps, TabPanel } from "/src/components/common/Tab";
import {
  DailyArenaTournamentRewardsByTeamLevelTable,
  DailyArenaTournamentRewardsTable,
  WeeklyArenaTournamentRewardsTable
} from "/src/components/rewards/ArenaTournamentRewardsTable";
import { DropZoneRewardsTable } from "/src/components/rewards/DropZoneRewardsTable";
import { EncounterRewardsTable } from "/src/components/rewards/EncounterRewardsTable";
import { MilestoneRewardsTable } from "/src/components/rewards/MilestoneRewardsTable";
import { OneOnOneRewardsTable } from "/src/components/rewards/OneOnOneRewardsTable";
import { PracticeCourtRewardsTable } from "/src/components/rewards/PracticeCourtRewardsTable";
import { ReferralRewardsTable } from "/src/components/rewards/ReferralRewardsTable";
import { RuleTheCourtRewardsTable } from "/src/components/rewards/RuleTheCourtRewardsTable";
import { TeamLevelRewardsTable } from "/src/components/rewards/TeamLevelRewardsTable";

export function RewardsTabs({ data }: { data: any; }) {
  const defaultPageSize = isBrowser ? DEFAULT_PAGE_SIZE_IN_DESKTOP_VIEW : DEFAULT_PAGE_SIZE;

  const queryParams: any = getQueryParams();

  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
    }
  });

  const [ tab, setTab ] = React.useState(queryParams.tab || "teamLevel");

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
          onChange={
            (e) => {
              const tabId = (e.target as HTMLButtonElement).id;
              
              queryParams.tab = tabId;
              setQueryParams(queryParams);
              setTab(tabId);
            }
          }
        >
          <Tab label="Team Level" value="teamLevel" {...a11yProps("teamLevel")} />
          <Tab label="Drop Zone" value="dropZone" {...a11yProps("dropZone")} />
          <Tab label="Encounter" value="encounter" {...a11yProps("encounter")} />
          <Tab label="Rule the Court" value="ruleTheCourt" {...a11yProps("ruleTheCourt")} />
          <Tab label="Arena Tournament" value="arenaTournament" {...a11yProps("arenaTournament")} />
          <Tab label="Practice Court" value="practiceCourt" {...a11yProps("practiceCourt")} />
          <Tab label="1v1" value="oneOnOne" {...a11yProps("oneOnOne")} />
          <Tab label="Milestones" value="milestones" {...a11yProps("milestones")} />
          <Tab label="Referral" value="referral" {...a11yProps("referral")} />
        </Tabs>
        <TabPanel value="teamLevel" selected={tab === "teamLevel"}>
          <TeamLevelRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={teamLevelRewardsTableData} />
        </TabPanel>
        <TabPanel value="dropZone" selected={tab === "dropZone"}>
          <DropZoneRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={dropZoneRewardsTableData} />
        </TabPanel>
        <TabPanel value="encounter" selected={tab === "encounter"}>
          <EncounterRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={encounterRewardsTableData} />
        </TabPanel>
        <TabPanel value="ruleTheCourt" selected={tab === "ruleTheCourt"}>
          <RuleTheCourtRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={ruleTheCourtRewardsTableData} />
        </TabPanel>
        <TabPanel value="arenaTournament" selected={tab === "arenaTournament"}>
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
        <TabPanel value="practiceCourt" selected={tab === "practiceCourt"}>
          <PracticeCourtRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={practiceCourtRewardsTableData} />
        </TabPanel>
        <TabPanel value="oneOnOne" selected={tab === "oneOnOne"}>
          <OneOnOneRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={oneOnOneRewardsTableData} />
        </TabPanel>
        <TabPanel value="milestones" selected={tab === "milestones"}>
          <MilestoneRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={milestoneRewardsTableData} />
        </TabPanel>
        <TabPanel value="referral" selected={tab === "referral"}>
          <ReferralRewardsTable defaultPageSize={defaultPageSize} theme={theme} data={referralRewardsTableData} />
        </TabPanel>
      </CssBaseline>
    </ThemeProvider>
  );
}
