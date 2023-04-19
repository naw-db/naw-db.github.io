import { Animation, Stack } from "@devexpress/dx-react-chart";
import { ArgumentAxis, BarSeries, Chart, Legend, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import { createTheme, CssBaseline, Divider, FormControl, FormHelperText, MenuItem, Select, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Section } from "gatsby-theme-portfolio-minimal";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import { camelCase, range } from "lodash";
import React from "react";
import { getQueryParams, setQueryParams } from "react-use-query-param-string";

import { calculateStat } from "src/components/players/PlayerStats";
import gradients from "data/player_stat_gradients.json";

// Chart displays attributes in reversed order.

const overallAttributesToCompare = [
  "Total Fitness",
  "Total Defense",
  "Total Offense"
];

const detailedAttributesToCompare = [
  "Stamina",
  "Speed",
  "Strength",
  "Stealing",
  "Blocking",
  "Defense",
  "Dunk Power",
  "Mid-Range Shooting",
  "Perimeter Shooting",
  "Ball Handling"
];

const PlayerDropdown = styled(Select)`
  margin-left: 5px;
  margin-right: 5px;
`;

const RankDropdown = styled(Select)`
  margin-left: 5px;
  margin-right: 5px;
`;

const ChartRoot = props => (
  <Legend.Root {...props} sx={{ display: "flex", margin: "auto", flexDirection: "row" }} />
);
const ChartLabel = props => (
  <Legend.Label {...props} sx={{ whiteSpace: "nowrap" }} />
);

function PlayerSelection(data, playerRawData, qualifier, queryParams, forceUpdate) {
  return (
    <>
      <FormControl sx={{ width: 180 }} size="small">
        <PlayerDropdown
          name={qualifier}
          value={playerRawData.name}
          onChange={
            (event) => {
              queryParams[event.target.name] = event.target.value;
              queryParams[`${qualifier}Rank`] = data.allPlayersCsv
                .nodes
                .find(e => e.name === event.target.value)
                .maxRank;
              setQueryParams(queryParams);
              forceUpdate();
            }
          }
        >
          {
            data.allPlayersCsv
              .nodes
              .map(e => <MenuItem key={e.name} value={e.name}>{e.name}</MenuItem>)
          }
        </PlayerDropdown>
        <FormHelperText>Player</FormHelperText>
      </FormControl>
      <FormControl size="small">
        <RankDropdown
          name={`${qualifier}Rank`}
          value={queryParams[`${qualifier}Rank`]}
          onChange={
            (event) => {
              queryParams[event.target.name] = event.target.value;
              setQueryParams(queryParams);
              forceUpdate();
            }
          }
        >
          {
            Object.keys(gradients.startingRank[playerRawData.startingRank].gradientAtRank)
              .map(
                rank => <MenuItem key={rank} value={rank}>{rank}</MenuItem>
              )
          }
        </RankDropdown>
        <FormHelperText>Rank</FormHelperText>
      </FormControl>
      <FormControl size="small">
        <Select
          name={`${qualifier}Level`}
          value={queryParams[`${qualifier}Level`]}
          onChange={
            (event) => {
              queryParams[event.target.name] = event.target.value;
              setQueryParams(queryParams);
              forceUpdate();
            }
          }
        >
          {
            range(1, 11).map(
              level => <MenuItem key={level} value={level}>{level}</MenuItem>
            )
          }
        </Select>
        <FormHelperText>Level</FormHelperText>
      </FormControl>
    </>
  )
}

export function PlayersComparisonChart({ defaultPlayers, barColors, data }) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "")
    }
  });

  // eslint-disable-next-line no-unused-vars
  const [ignored, forceUpdate] = React.useReducer(flag => !flag, false);  // A dummy that is to force update.

  const queryParams = getQueryParams();

  const playerOne = queryParams.playerOne == null ? defaultPlayers[0] : decodeURIComponent(queryParams.playerOne);
  const playerTwo = queryParams.playerTwo == null ? defaultPlayers[1] : decodeURIComponent(queryParams.playerTwo);

  const playerOneName = decodeURIComponent(playerOne);
  const playerTwoName = decodeURIComponent(playerTwo);

  const playerOneRawData = data.allPlayersCsv.nodes.find(e => e.name === playerOneName);
  const playerTwoRawData = data.allPlayersCsv.nodes.find(e => e.name === playerTwoName);

  const playerOneRank = queryParams.playerOneRank == null ? playerOneRawData.maxRank : queryParams.playerOneRank;
  const playerTwoRank = queryParams.playerTwoRank == null ? playerTwoRawData.maxRank : queryParams.playerTwoRank;

  const playerOneLevel = queryParams.playerOneLevel == null ? "10" : queryParams.playerOneLevel;
  const playerTwoLevel = queryParams.playerTwoLevel == null ? "10" : queryParams.playerTwoLevel;

  const playerOneDisplayedData = calculateStat(playerOneRawData, playerOneRank, playerOneLevel);
  const playerTwoDisplayedData = calculateStat(playerTwoRawData, playerTwoRank, playerTwoLevel);

  const overallChartData = [];

  overallAttributesToCompare.forEach(
    attribute => {
      const entry = { attribute: attribute };
      entry[playerOneName] = parseFloat(playerOneDisplayedData[camelCase(attribute)]);
      entry[playerTwoName] = parseFloat(playerTwoDisplayedData[camelCase(attribute)]);

      overallChartData.push(entry);
    }
  );

  const detailedChartData = [];

  detailedAttributesToCompare.forEach(
    attribute => {
      const entry = { attribute: attribute };
      entry[playerOneName] = parseFloat(playerOneDisplayedData[camelCase(attribute)]);
      entry[playerTwoName] = parseFloat(playerTwoDisplayedData[camelCase(attribute)]);

      detailedChartData.push(entry);
    }
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Section heading="Select Players">
          <div align="center">
            {
              PlayerSelection(
                data,
                playerOneRawData,
                "playerOne",
                { playerOne, playerOneRank, playerOneLevel, playerTwo, playerTwoRank, playerTwoLevel },
                forceUpdate
              )
            }
            <br/>
            <Divider variant="middle">v.s.</Divider>
            <br/>
            {
              PlayerSelection(
                data,
                playerTwoRawData,
                "playerTwo",
                { playerOne, playerOneRank, playerOneLevel, playerTwo, playerTwoRank, playerTwoLevel },
                forceUpdate
              )
            }
          </div>
        </Section>
        <Section heading="Overall">
          <Chart
            data={overallChartData}
            rotated
          >
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
              name={playerOneRawData.shortName}
              valueField={playerOneName}
              argumentField="attribute"
              color={barColors[0]}
            />
            <BarSeries
              name={playerTwoRawData.shortName}
              valueField={playerTwoName}
              argumentField="attribute"
              color={barColors[1]}
            />
            <Animation />
            <Legend position="top" rootComponent={ChartRoot} labelComponent={ChartLabel} />
            <Stack />
          </Chart>
        </Section>
        <Section heading="Individual Attributes">
          <Chart
            data={detailedChartData}
            rotated
          >
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
              name={playerOneRawData.shortName}
              valueField={playerOneName}
              argumentField="attribute"
              color={barColors[0]}
            />
            <BarSeries
              name={playerTwoRawData.shortName}
              valueField={playerTwoName}
              argumentField="attribute"
              color={barColors[1]}
            />
            <Animation />
            <Legend position="top" rootComponent={ChartRoot} labelComponent={ChartLabel} />
            <Stack />
          </Chart>
        </Section>
      </CssBaseline>
    </ThemeProvider>
  )
}
