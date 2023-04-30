import { Animation, Stack } from "@devexpress/dx-react-chart";
import { ArgumentAxis, BarSeries, Chart, Legend, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import { createTheme, CssBaseline, Divider, FormControl, FormHelperText, MenuItem, Select, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Section } from "gatsby-theme-portfolio-minimal";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import { camelCase, range } from "lodash";
import { parseFullName } from "parse-full-name";
import React from "react";
import { getQueryParams, setQueryParams } from "react-use-query-param-string";

import { calculateStat } from "src/components/players/PlayerStats";
import gradients from "data/player_stat_gradients.json";

// Chart displays attributes in reversed order.

const OVERALL_ATTRIBUTES = [
  "Total Fitness",
  "Total Defense",
  "Total Offense"
];

const DETAILED_ATTRIBUTES = [
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

const BAR_SERIES_LABEL_ANIMATIONS = Symbol("animation");

const PlayerDropdown = styled(Select)`
  margin-left: 5px;
  margin-right: 5px;
`;

const RankDropdown = styled(Select)`
  margin-left: 5px;
  margin-right: 5px;
`;

const addKeyframe = (name, def) => {
  if (typeof document === "undefined") {
    return;
  }
  const head = document.getElementsByTagName("head")[0];
  let style = Array.from(head.getElementsByTagName("style"))
    .find(node => node.dataset[BAR_SERIES_LABEL_ANIMATIONS]);
  if (!style) {
    style = document.createElement("style");
    style.dataset[BAR_SERIES_LABEL_ANIMATIONS] = true;
    head.appendChild(style);
  }
  const content = style.textContent;
  if (!content.includes(name)) {
    style.textContent += `\n@keyframes ${name} ${def}\n`;
  }
};

const getBarSeriesLabelAnimationName = () => {
  const name = "animation_label_opacity";
  addKeyframe(name, "{ 0% { opacity: 0; } 99% { opacity: 0; } 100% { opacity: 1; } }");
  return name;
};

const StyledBarSeriesLabel = styled(Chart.Label)(() => ({
  [`&.BarSeriesLabel`]: {
    fill: "#ffffff",
    fontSize: "10px",
    animation: `${getBarSeriesLabelAnimationName()} 1s`,
  }
}));

const LegendRoot = props => (
  <Legend.Root {...props} sx={{ display: "flex", margin: "auto", flexDirection: "row" }} />
);
const LegendLabel = props => (
  <Legend.Label {...props} sx={{ whiteSpace: "nowrap" }} />
);

const BarWithLabel = ({ value, ...restProps }) => (
  <React.Fragment>
    <BarSeries.Point {...restProps} />
    <StyledBarSeriesLabel
      x={restProps.val + restProps.startVal - 20}
      y={restProps.arg}
      dominantBaseline="middle"
      textAnchor="middle"
      className="BarSeriesLabel"
    >
      {value}
    </StyledBarSeriesLabel>
  </React.Fragment>
);

function PlayerSelection(data, playerRawData, qualifier, queryParams, forceUpdate) {
  return (
    <>
      <FormControl sx={{ width: 170 }} size="small">
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
              .sort(
                (a, b) => {
                  return parseFullName(a.name).last
                    .localeCompare(parseFullName(b.name).last);
                }
              )
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

  OVERALL_ATTRIBUTES.forEach(
    attribute => {
      const entry = { attribute: attribute };
      entry[playerOneName] = parseFloat(playerOneDisplayedData[camelCase(attribute)]);
      entry[playerTwoName] = parseFloat(playerTwoDisplayedData[camelCase(attribute)]);

      overallChartData.push(entry);
    }
  );

  const detailedChartData = [];

  DETAILED_ATTRIBUTES.forEach(
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
              pointComponent={BarWithLabel}
            />
            <BarSeries
              name={playerTwoRawData.shortName}
              valueField={playerTwoName}
              argumentField="attribute"
              color={barColors[1]}
              pointComponent={BarWithLabel}
            />
            <Animation />
            <Legend position="top" rootComponent={LegendRoot} labelComponent={LegendLabel} />
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
              pointComponent={BarWithLabel}
            />
            <BarSeries
              name={playerTwoRawData.shortName}
              valueField={playerTwoName}
              argumentField="attribute"
              color={barColors[1]}
              pointComponent={BarWithLabel}
            />
            <Animation />
            <Legend position="top" rootComponent={LegendRoot} labelComponent={LegendLabel} />
            <Stack />
          </Chart>
        </Section>
      </CssBaseline>
    </ThemeProvider>
  )
}
