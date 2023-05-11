import AnnouncementIcon from "@mui/icons-material/Announcement";
import { createTheme, CssBaseline, Divider, List, ListItem, ListItemAvatar, ListItemText, PaletteMode, ThemeProvider } from "@mui/material";
import { Animation, Section } from "gatsby-theme-portfolio-minimal";
import React from "react";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";

export function AnnouncementsSection(props: any) {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
    }
  });

  const announcements: Array<any> = [];

  props.data
    .forEach(
      (e: any) => {
        if (announcements.length !== 0) {
          announcements.push(<Divider variant="inset" component="li" key={`divider-${e.id}`} />);
        }

        announcements.push(
          <ListItem key={e.id}>
            <ListItemAvatar>
              <AnnouncementIcon fontSize="small" />
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
