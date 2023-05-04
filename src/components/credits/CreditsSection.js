import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, CssBaseline, Link, ThemeProvider } from "@mui/material";
import { Section } from "gatsby-theme-portfolio-minimal";
import { useGlobalState } from "gatsby-theme-portfolio-minimal/src/context";
import React from "react";
import { Code } from "react-code-blocks";

export default function TeamLevelTipsTable() {
  const { globalState } = useGlobalState();

  const theme = createTheme({
    palette: {
      mode: globalState.theme.replace("Theme", "")
    }
  });

  return (
    <Section>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <h3>Web Dev</h3>
          <b>Dreezy</b>
          <p>
            Friend Code: <Code language="text" theme={theme} text="985037543322" showLineNumbers={false} />
            <br />
            Referral Code: <Code language="text" theme={theme} text="J4TV9V63T" showLineNumbers={false} />
          </p>
          <Link href="https://drewwei.com/" color="inherit">
            <LanguageIcon />
          </Link>
          <Link href="https://www.instagram.com/unkdrew/" color="inherit">
            <InstagramIcon />
          </Link>
          <Link href="https://twitter.com/DreezyWei/" color="inherit">
            <TwitterIcon />
          </Link>
          <br />
          <br />
          <h3>Data</h3>
          <b>MitchPlease</b>
          <p>
            Friend Code: <Code language="text" theme={theme} text="702372627459" showLineNumbers={false} />
            <br />
            Referral Code: <Code language="text" theme={theme} text="F3VGB72QV" showLineNumbers={false} />
          </p>
          <Link href="https://www.instagram.com/mitchplease_aw/" color="inherit">
            <InstagramIcon />
          </Link>
          <Link href="https://twitter.com/mitchmcfly6/" color="inherit">
            <TwitterIcon />
          </Link>
          <br />
          <br />
          <h3>Other Contributors</h3>
          <p>Also, major thanks to <b>SoleilNoir69</b>, <b>Nickos19</b>, <b>GVExMIKE</b>, <b>1down5up</b>, <b>KalLightYear</b> & <b>WetzCoast</b> for the contribution to our catalog of data!</p>
          <br />
          <br />
          <b>
            Wanna see your name here? Sumit a PR to our <a href="https://github.com/naw-db/naw-db.github.io/">GitHub repository</a>, or simply just upload
            screenshots of data that is missing from our database on <a href="https://disboard.org/server/1032854323752869964">our Discord server</a>!
          </b>
        </CssBaseline>
      </ThemeProvider>
    </Section>
  );
}
