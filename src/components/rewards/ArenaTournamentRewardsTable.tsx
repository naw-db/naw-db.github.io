import React from "react";

import { BaseTable } from "/src/components/common/Table";

export function WeeklyArenaTournamentRewardsTable(props: any) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "type",
        width: "15%",
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
        width: "15%",
        Header: "When",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "requireArenaPass",
        width: "10%",
        Header: "Arena Pass Required?",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playersAllowed",
        width: "15%",
        Header: "Players Allowed",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "winsRequired",
        width: "15%",
        Header: "Wins Required",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "lossesToBeEliminated",
        width: "10%",
        Header: "Losses to Be Eliminated",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "pointsToWin",
        width: "10%",
        Header: "Points to Win",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "completionRings",
        width: "15%",
        Header: "Completion Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "leaderboardRings",
        width: "15%",
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

export function DailyArenaTournamentRewardsTable(props: any) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "type",
        width: "15%",
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
        width: "15%",
        Header: "When",
        showHeader: true,
        textAlign: "left",
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "requireArenaPass",
        width: "15%",
        Header: "Arena Pass Required?",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "playersAllowed",
        width: "15%",
        Header: "Players Allowed",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "winsRequired",
        width: "10%",
        Header: "Wins Required",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "lossesToBeEliminated",
        width: "10%",
        Header: "Losses to Be Eliminated",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "pointsToWin",
        width: "10%",
        Header: "Points to Win",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "completionRings",
        width: "10%",
        Header: "Completion Rings",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "leaderboardRings",
        width: "10%",
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

export function DailyArenaTournamentRewardsByTeamLevelTable(props: any) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "teamLevel",
        width: "10%",
        Header: "Team Level",
        showHeader: true,
        textAlign: "left",
        sticky: true,
        backgroundColor: props.theme.palette.background.default,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "requireArenaPass",
        width: "10%",
        Header: "Arena Pass Required?",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "regularThirdWinReward",
        width: "10%",
        Header: "3rd Win Reward (Mon. ~ Sat.)",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "sundaySecondWinReward",
        width: "10%",
        Header: "2nd Win Reward (Sun.)",
        showHeader: true,
        disableFilters: true,
        disableSortBy: true
      },
      {
        accessor: "sundayThirdWinReward",
        width: "10%",
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
            width: "10%",
            Header: "Monday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "tuesdayLeaderboardBonus",
            width: "10%",
            Header: "Tuesday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "wednesdayLeaderboardBonus",
            width: "10%",
            Header: "Wednesday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "thursdayLeaderboardBonus",
            width: "10%",
            Header: "Thursday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "fridayLeaderboardBonus",
            width: "10%",
            Header: "Friday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "saturdayLeaderboardBonus",
            width: "10%",
            Header: "Saturday",
            showHeader: true,
            disableFilters: true,
            disableSortBy: true
          },
          {
            accessor: "sundayLeaderboardBonus",
            width: "10%",
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
