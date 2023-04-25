import React from "react";

import { BaseTable } from "src/components/rewards/BaseTable";

export function WeeklyArenaTournamentRewardsTable({ defaultPageSize, theme, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "type",
        Header: "Type",
        showHeader: true,
        sticky: true,
        backgroundColor: theme.palette.background.default,
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
    [ theme.palette.background.default ]
  );

  return (
    <BaseTable defaultPageSize={defaultPageSize} columns={columns} data={data} />
  );
}

export function DailyArenaTournamentRewardsTable({ defaultPageSize, theme, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "type",
        Header: "Type",
        showHeader: true,
        sticky: true,
        backgroundColor: theme.palette.background.default,
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
    [ theme.palette.background.default ]
  );

  return (
    <BaseTable defaultPageSize={defaultPageSize} columns={columns} data={data} />
  );
}

export function DailyArenaTournamentRewardsByTeamLevelTable({ defaultPageSize, theme, data }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        Header: "Team Level",
        showHeader: true,
        sticky: true,
        backgroundColor: theme.palette.background.default,
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
        accessor: "regularThirdWinReward",
        Header: "3rd Win Reward (Mon. ~ Sat.)",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "sundaySecondWinReward",
        Header: "2nd Win Reward (Sun.)",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "sundayThirdWinReward",
        Header: "3rd Win Reward (Sun.)",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        Header: "Leader Board Bonus",
        showHeader: true,
        backgroundColor: theme.palette.text.secondary,
        columns: [
          {
            accessor: "mondayLeaderBoardBonus",
            Header: "Monday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "tuesdayLeaderBoardBonus",
            Header: "Tuesday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "wednesdayLeaderBoardBonus",
            Header: "Wednesday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "thursdayLeaderBoardBonus",
            Header: "Thursday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "fridayLeaderBoardBonus",
            Header: "Friday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "saturdayLeaderBoardBonus",
            Header: "Saturday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "sundayLeaderBoardBonus",
            Header: "Sunday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          }
        ]
      }
    ],
    [
      theme.palette.background.default,
      theme.palette.text.secondary
    ]
  );

  return (
    <BaseTable defaultPageSize={defaultPageSize} columns={columns} data={data} />
  );
}
