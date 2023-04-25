import React from "react";

import { BaseTable } from "src/components/rewards/BaseTable";

export function WeeklyArenaTournamentRewardsTable({ theme, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "type",
        Header: "Type",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "when",
        Header: "When",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "requireArenaPass",
        Header: "Arena Pass Required?",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playersAllowed",
        Header: "Players Allowed",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "winsRequired",
        Header: "Wins Required",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "lossesToBeEliminated",
        Header: "Losses to Be Eliminated",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "pointsToWin",
        Header: "Points to Win",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "completionRings",
        Header: "Completion Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "leaderBoardRings",
        Header: "Leader Board Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      }
    ],
    []
  );

  return (
    <BaseTable theme={theme} columns={columns} data={data} />
  );
}

export function DailyArenaTournamentRewardsTable({ theme, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "type",
        Header: "Type",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "when",
        Header: "When",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "requireArenaPass",
        Header: "Arena Pass Required?",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playersAllowed",
        Header: "Players Allowed",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "winsRequired",
        Header: "Wins Required",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "lossesToBeEliminated",
        Header: "Losses to Be Eliminated",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "pointsToWin",
        Header: "Points to Win",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "completionRings",
        Header: "Completion Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "leaderBoardRings",
        Header: "Leader Board Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      }
    ],
    []
  );

  return (
    <BaseTable theme={theme} columns={columns} data={data} />
  );
}

export function DailyArenaTournamentRewardsByTeamLevelTable({ theme, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        Header: "Team Level",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "requireArenaPass",
        Header: "Arena Pass Required?",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "thirdWinReward",
        Header: "3rd Win Reward",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "mondayBonus",
        Header: "Monday Bonus",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "tuesdayBonus",
        Header: "Tuesday Bonus",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "wednesdayBonus",
        Header: "Wednesday Bonus",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "thursdayBonus",
        Header: "Thursday Bonus",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "fridayBonus",
        Header: "Friday Bonus",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "saturdayBonus",
        Header: "Saturday Bonus",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "sundayBonus",
        Header: "Sunday Bonus",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      }
    ],
    []
  );

  return (
    <BaseTable theme={theme} columns={columns} data={data} />
  );
}
