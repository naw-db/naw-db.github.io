import AnchorIcon from "@mui/icons-material/Anchor";
import { PaletteMode, createTheme } from "@mui/material";
import { Link } from "gatsby";
import { Section } from "gatsby-theme-portfolio-minimal";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import PropTypes, { InferProps } from "prop-types";
import React from "react";

AnchoredSection.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired
};

export function AnchoredSection(props: InferProps<typeof AnchoredSection.propTypes>): React.ReactElement {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "") as PaletteMode
    }
  });

  return (
    <Section anchor={props.anchor}>
      <h3>
        {props.heading}
        <Link to={`#${props.anchor}`} color={theme.palette.text.secondary} style={{ float: "right" }} >
          <AnchorIcon fontSize="small"/>
        </Link>
      </h3>
      {props.children}
    </Section>
  );
}
