import React from "react";

import { BaseTable } from "src/components/common/Table";

export function WeeklyArenaTournamentRewardsTable(props) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "type",
        Header: "Type",
        showHeader: true,
        textAlign: "left",
        sticky: true,
        backgroundColor: props.theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "when",
        Header: "When",
        showHeader: true,
        textAlign: "left",
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
        accessor: "leaderboardRings",
        Header: "Leaderboard Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      }
    ],
    [ props.theme.palette.background.default ]
  );

  return (
    <BaseTable theme={props.theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}

export function DailyArenaTournamentRewardsTable(props) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "type",
        Header: "Type",
        showHeader: true,
        textAlign: "left",
        sticky: true,
        backgroundColor: props.theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "when",
        Header: "When",
        showHeader: true,
        textAlign: "left",
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
        accessor: "leaderboardRings",
        Header: "Leaderboard Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      }
    ],
    [ props.theme.palette.background.default ]
  );

  return (
    <BaseTable theme={props.theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}

export function DailyArenaTournamentRewardsByTeamLevelTable(props) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        Header: "Team Level",
        showHeader: true,
        sticky: true,
        backgroundColor: props.theme.palette.background.default,
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
        Header: "Leaderboard Bonus",
        showHeader: true,
        backgroundColor: props.theme.palette.text.secondary,
        columns: [
          {
            accessor: "mondayLeaderboardBonus",
            Header: "Monday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "tuesdayLeaderboardBonus",
            Header: "Tuesday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "wednesdayLeaderboardBonus",
            Header: "Wednesday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "thursdayLeaderboardBonus",
            Header: "Thursday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "fridayLeaderboardBonus",
            Header: "Friday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "saturdayLeaderboardBonus",
            Header: "Saturday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "sundayLeaderboardBonus",
            Header: "Sunday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          }
        ]
      }
    ],
    [
      props.theme.palette.background.default,
      props.theme.palette.text.secondary
    ]
  );

  return (
    <BaseTable theme={props.theme} columns={columns} defaultPageSize={props.defaultPageSize} data={props.data} />
  );
}
