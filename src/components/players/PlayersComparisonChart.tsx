import { Animation, Stack } from "@devexpress/dx-react-chart";
import { ArgumentAxis, BarSeries, Chart, Legend, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import { createTheme, CssBaseline, Divider, FormControl, FormHelperText, MenuItem, PaletteMode, Select, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Section } from "gatsby-theme-portfolio-minimal";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import { camelCase, range } from "lodash";
import { parseFullName } from "parse-full-name";
import React from "react";
import { getQueryParams, setQueryParams } from "react-use-query-param-string";

import { calculateStat } from "/src/components/players/PlayerStats";
import gradients from "/content/data/player_stat_gradients.json";

const PLAYER_INDEX: { [ key: number ]: string } = {
  0: "One",
  1: "Two",
  2: "Three",
  3: "Four",
  4: "Five"
};

// Chart displays attributes in reversed order.

const OVERALL_ATTRIBUTES: Array<string> = [
  "Total Fitness",
  "Total Defense",
  "Total Offense"
];

const DETAILED_ATTRIBUTES: Array<string> = [
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

const BAR_SERIES_LABEL_ANIMATIONS = "animation";

const PlayerDropdown = styled(Select)`
  margin-left: 5px;
  margin-right: 5px;
`;

const RankDropdown = styled(Select)`
  width: 65px;
  margin-left: 5px;
  margin-right: 5px;
`;

const addKeyframe = (name: string, def: string) => {
  if (typeof document === "undefined") {
    return;
  }
  const head = document.getElementsByTagName("head")[0];
  let style = Array.from(head.getElementsByTagName("style"))
    .find(node => node.dataset[BAR_SERIES_LABEL_ANIMATIONS]);
  if (!style) {
    style = document.createElement("style");
    style.dataset[BAR_SERIES_LABEL_ANIMATIONS] = "true";
    head.appendChild(style);
  }
  const content = style.textContent;
  if (!content?.includes(name)) {
    style.textContent += `\n@keyframes ${name} ${def}\n`;
  }
};

const getBarSeriesLabelAnimationName = () => {
  const name = "animation_label_opacity";
  addKeyframe(name, "{ 0% { opacity: 0; } 99% { opacity: 0; } 100% { opacity: 1; } }");
  return name;
};

const StyledBarSeriesLabel = styled(Chart.Label)(() => ({
  [ `&.BarSeriesLabel` ]: {
    fill: "#ffffff",
    fontSize: "10px",
    animation: `${getBarSeriesLabelAnimationName()} 1s`,
  }
}));

const LegendRoot = (props: any) => (
  <Legend.Root {...props} sx={{ display: "flex", margin: "auto", flexDirection: "row" }}  children={props.children} />
);
const LegendLabel = (props: any) => (
  <Legend.Label {...props} sx={{ whiteSpace: "nowrap" }} />
);

const BarWithLabel = ({ value, ...restProps }: any) => (
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

function PlayerSelection(data: any, playerRawData: any, qualifier: string, queryParams: any, forceUpdate: Function) {
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
                .find((e: any) => e.name === event.target.value)
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
                (a: any, b: any) => {
                  return parseFullName(a.name).last !== parseFullName(b.name).last
                    ? parseFullName(a.name).last.localeCompare(parseFullName(b.name).last)
                    : parseFullName(a.name).first.localeCompare(parseFullName(b.name).first)
                }
              )
              .map((e: any) => <MenuItem key={e.name} value={e.name}>{e.name}</MenuItem>)
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

export function PlayersComparisonChart({ defaultPlayers, barColors, data }: { defaultPlayers: Array<string>, barColors: Array<string>, data: any }) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
    }
  });

  const queryParams: any = getQueryParams();

  // eslint-disable-next-line no-unused-vars
  const [ ignored, forceUpdate ] = React.useReducer(flag => !flag, false);  // A dummy that is to force update.

  const selectedPlayers = defaultPlayers.map(
    (defaultPlayer, index) => queryParams[`player${PLAYER_INDEX[index]}`] == null
      ? defaultPlayer
      : decodeURIComponent(queryParams[`player${PLAYER_INDEX[index]}`])
  );

  const playerRawData = selectedPlayers.map(
    player => data.allPlayersCsv
      .nodes
      .find((e: any) => e.name === player)
  );

  const playerRanks = playerRawData.map((rawData, index) => queryParams[`player${PLAYER_INDEX[index]}Rank`] || rawData.maxRank);

  const playerLevels = playerRawData.map((rawData, index) => queryParams[`player${PLAYER_INDEX[index]}Level`] || "10");

  const displayData = playerRawData.map((rawData, index) => calculateStat(rawData, playerRanks[index], playerLevels[index]));

  const overallChartData = OVERALL_ATTRIBUTES.map(
    attribute => {
      const entry: { [key: string]: string | number } = { attribute: attribute };

      selectedPlayers.forEach(
        (player, index) => {
          entry[player] = parseFloat(displayData[index][camelCase(attribute)])
        }
      );

      return entry;
    }
  );

  const detailedChartData = DETAILED_ATTRIBUTES.map(
    attribute => {
      const entry: { [key: string]: string | number } = { attribute: attribute };

      selectedPlayers.forEach(
        (player, index) => {
          entry[player] = parseFloat(displayData[index][camelCase(attribute)])
        }
      );

      return entry;
    }
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Section heading="Select Players">
          <div style={{ textAlign: "center" }}>
            {
              playerRawData.map(
                (rawData, index) => {
                  return <>
                    {
                      index === 0
                        ? undefined
                        : <>
                          <br/>
                          <Divider variant="middle">v.s.</Divider>
                          <br/>
                        </>
                    }
                    {
                      PlayerSelection(
                        data,
                        rawData,
                        `player${PLAYER_INDEX[index]}`,
                        {
                          playerOne: selectedPlayers[0],
                          playerOneRank: playerRanks[0],
                          playerOneLevel: playerLevels[0],
                          playerTwo: selectedPlayers[1],
                          playerTwoRank: playerRanks[1],
                          playerTwoLevel: playerLevels[1]
                        },
                        forceUpdate
                      )
                    }
                  </>;
                }
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

            {
              playerRawData.map(
                (rawData, index) => <BarSeries
                  name={rawData.shortName}
                  valueField={rawData.name}
                  argumentField="attribute"
                  color={barColors[index]}
                  pointComponent={BarWithLabel}
                />
              )
            }
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

            {
              playerRawData.map(
                (rawData, index) => <BarSeries
                  name={rawData.shortName}
                  valueField={rawData.name}
                  argumentField="attribute"
                  color={barColors[index]}
                  pointComponent={BarWithLabel}
                />
              )
            }
            <Animation />
            <Legend position="top" rootComponent={LegendRoot} labelComponent={LegendLabel} />
            <Stack />
          </Chart>
        </Section>
      </CssBaseline>
    </ThemeProvider>
  )
}
