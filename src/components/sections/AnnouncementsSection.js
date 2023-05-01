import AnnouncementIcon from "@mui/icons-material/Announcement";
import InfoIcon from "@mui/icons-material/Info";
import { createTheme, CssBaseline, Divider, List, ListItem, ListItemAvatar, ListItemText, ThemeProvider } from "@mui/material";
import { Animation, Section } from "gatsby-theme-portfolio-minimal";
import React from "react";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";

const ICONS = {
  "announcement": <AnnouncementIcon fontSize="small" />,
  "info": <InfoIcon fontSize="small" />
};

export function AnnouncementsSection(props) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "")
    }
  });

  const announcements = [];

  props.data
    .forEach(
      e => {
        if (announcements.length !== 0) {
          announcements.push(<Divider variant="inset" component="li" key={`divider-${e.id}`} />);
        }

        announcements.push(
          <ListItem key={e.id}>
            <ListItemAvatar>
              {ICONS[e.type]}
            </ListItemAvatar>
            <ListItemText primary={e.text} secondary={e.date} />
          </ListItem>
        );
      }
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Animation type="fadeUp">
          <Section anchor={props.sectionId} heading={props.heading}>
            <Animation type="fadeLeft" delay={200}>
              <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
                {announcements}
              </List>
            </Animation>
          </Section>
        </Animation>
      </CssBaseline>
    </ThemeProvider>
  );
}
