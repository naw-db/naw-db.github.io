import { Animation, Stack } from "@devexpress/dx-react-chart";
import { ArgumentAxis, BarSeries, Chart } from "@devexpress/dx-react-chart-material-ui";
import AddIcon from "@mui/icons-material/Add";
import { Button, createTheme, CssBaseline, Divider, FormControl, FormHelperText, MenuItem, PaletteMode, Select, Stack as MuiStack, ThemeProvider, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Section } from "gatsby-theme-portfolio-minimal";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import { camelCase, range } from "lodash";
import { parseFullName } from "parse-full-name";
import React from "react";
import { getQueryParams, setQueryParams } from "react-use-query-param-string";

import { DEFAULT_NUMBER_OF_PLAYERS_TO_COMPARE, MAXIMUM_NUMBER_OF_PLAYERS_TO_COMPARE } from "/src/components/common/Defaults";
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

const OVERALL_ATTRIBUTE: Array<string> = [
  "Overall"
];

const TOTAL_ATTRIBUTES: Array<string> = [
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
    fill: "#FFFFFF",
    fontSize: "10px",
    animation: `${getBarSeriesLabelAnimationName()} 1s`,
  }
}));

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

function getSelectedPlayers(defaultPlayers: Array<string>, queryParams: any): Array<string> {
  const parsedPlayers = Object.keys(PLAYER_INDEX)
    .map(index => queryParams[`player${PLAYER_INDEX[parseInt(index)]}`])
    .filter(name => name != null)
    .map(name => decodeURIComponent(name));

  return parsedPlayers.length === 0 ? defaultPlayers.slice(0, DEFAULT_NUMBER_OF_PLAYERS_TO_COMPARE) : parsedPlayers;
}

function PlayerSelection(data: any, enrichedPlayerData: any, qualifier: string, queryParams: any, forceUpdate: Function) {
  return (
    <>
      <FormControl sx={{ width: 170 }} size="small">
        <PlayerDropdown
          name={qualifier}
          value={enrichedPlayerData.name}
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
            Object.keys(gradients.startingRank[enrichedPlayerData.startingRank].gradientAtRank)
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

  const selectedPlayers = getSelectedPlayers(defaultPlayers, queryParams);

  const playerRawData = selectedPlayers.map(
    player => data.allPlayersCsv
      .nodes
      .find((e: any) => e.name === player)
  );

  const memorizedPlayers: { [ key: string ]: number } = {};

  const enrichedPlayerData = playerRawData.map(
    (e: any, index: number) => {
      const enriched = Object.assign({}, e);

      if (memorizedPlayers[e.name]) {
        memorizedPlayers[e.name] += 1;
      } else {
        memorizedPlayers[e.name] = 1;
      }

      enriched.chartIndex = index;
      enriched.displayName = memorizedPlayers[e.name] === 1 ? e.name : `${e.name} (${memorizedPlayers[e.name]})`;
      enriched.displayShortName = memorizedPlayers[e.name] === 1 ? e.shortName : `${e.shortName} (${memorizedPlayers[e.name]})`;

      return enriched;
    }
  );

  const playerRanks = enrichedPlayerData.map((enrichedData, index) => queryParams[`player${PLAYER_INDEX[index]}Rank`] || enrichedData.maxRank);

  const playerLevels = enrichedPlayerData.map((enrichedData, index) => queryParams[`player${PLAYER_INDEX[index]}Level`] || "10");

  const displayData = enrichedPlayerData.map((enrichedData, index) => calculateStat(enrichedData, playerRanks[index], playerLevels[index]));

  const [ overallChartData, totalChartData, detailedChartData ] = [ OVERALL_ATTRIBUTE, TOTAL_ATTRIBUTES, DETAILED_ATTRIBUTES ].map(
    attributes => attributes.map(
      attribute => {
        const entry: { [key: string]: string | number } = { attribute: attribute };

        selectedPlayers.forEach(
          (player, index) => {
            const label = enrichedPlayerData.find((e: any) => e.chartIndex === index)
              .displayName;
            entry[label] = parseFloat(displayData[index][camelCase(attribute)]);
          }
        );

        return entry;
      }
    )
  );

  const newQueryParams: { [ key: string ]: string } = {};
  selectedPlayers.forEach(
    (player, index) => {
      newQueryParams[`player${PLAYER_INDEX[index]}`] = player;
      newQueryParams[`player${PLAYER_INDEX[index]}Rank`] = playerRanks[index];
      newQueryParams[`player${PLAYER_INDEX[index]}Level`] = playerLevels[index];
    }
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Section>
          <div style={{ textAlign: "center" }}>
            {
              enrichedPlayerData.map(
                (enrichedData, index) => {
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
                        enrichedData,
                        `player${PLAYER_INDEX[index]}`,
                        newQueryParams,
                        forceUpdate
                      )
                    }
                  </>;
                }
              )
            }
            {
              selectedPlayers.length >= MAXIMUM_NUMBER_OF_PLAYERS_TO_COMPARE
                ? undefined
                : <>
                  <br />
                  <br />
                  <Button
                    color="inherit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={
                      event => {
                        newQueryParams[`player${PLAYER_INDEX[selectedPlayers.length]}`] = defaultPlayers[selectedPlayers.length];
                        setQueryParams(newQueryParams);
                        forceUpdate();
                      }
                    }
                  >
                    Add
                  </Button>
                </>
            }
          </div>
        </Section>
        <Section>
          <MuiStack direction="row" spacing={1}>
            {
              enrichedPlayerData.map(
                (enrichedData, index) => <Chip label={enrichedData.displayShortName} sx={{ backgroundColor: barColors[index], fontSize: 10, color: "#FFFFFF" }} />
              )
            }
          </MuiStack>
          <br />
          <br />
          <br />
          <Chart
            data={overallChartData}
            height={selectedPlayers.length * OVERALL_ATTRIBUTE.length * 40}
            rotated
          >
            <ArgumentAxis />

            {
              enrichedPlayerData.map(
                (enrichedData, index) => <BarSeries
                  valueField={enrichedData.displayName}
                  argumentField="attribute"
                  color={barColors[index]}
                  pointComponent={BarWithLabel}
                />
              )
            }
            <Animation />
            <Stack />
          </Chart>
          <br />
          <br />
          <Chart
            data={totalChartData}
            height={selectedPlayers.length * TOTAL_ATTRIBUTES.length * 35}
            rotated
          >
            <ArgumentAxis />

            {
              enrichedPlayerData.map(
                (enrichedData, index) => <BarSeries
                  valueField={enrichedData.displayName}
                  argumentField="attribute"
                  color={barColors[index]}
                  pointComponent={BarWithLabel}
                />
              )
            }
            <Animation />
            <Stack />
          </Chart>
          <br />
          <br />
          <Chart
            data={detailedChartData}
            height={selectedPlayers.length * DETAILED_ATTRIBUTES.length * 30}
            rotated
          >
            <ArgumentAxis />

            {
              enrichedPlayerData.map(
                (enrichedData, index) => <BarSeries
                  valueField={enrichedData.displayName}
                  argumentField="attribute"
                  color={barColors[index]}
                  pointComponent={BarWithLabel}
                />
              )
            }
            <Animation />
            <Stack />
          </Chart>
        </Section>
      </CssBaseline>
    </ThemeProvider>
  )
}
