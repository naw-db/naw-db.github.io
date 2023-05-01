import AnnouncementIcon from "@mui/icons-material/Announcement";
import InfoIcon from "@mui/icons-material/Info";
import { Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Animation, Section } from "gatsby-theme-portfolio-minimal";
import React from "react";

const ICONS = {
  "announcement": <AnnouncementIcon fontSize="small" />,
  "info": <InfoIcon fontSize="small" />
};

export function AnnouncementsSection(props) {
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
    <Animation type="fadeUp">
      <Section anchor={props.sectionId} heading={props.heading}>
          <Animation type="fadeLeft" delay={200}>
            <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
              {announcements}
            </List>
          </Animation>
      </Section>
    </Animation>
  );
}
