import { Page, Section, Seo } from "gatsby-theme-portfolio-minimal";
import React from "react";

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function TipsPage() {
  return (
    <>
      <Seo title="Tips" />
      <Page useSplashScreenAnimation>
        <Section heading="Fastest Way to Level Up Team Level">
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Team Level</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1 → 2</TableCell>
                  <TableCell>Level up 1 Starter to Level 2</TableCell>
                  <TableCell>Level 2 Starter x1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2 → 3</TableCell>
                  <TableCell>Level up 3 Starters to Level 2</TableCell>
                  <TableCell>Level 2 Starter x3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3 → 4</TableCell>
                  <TableCell>Level up 3 Starters to Level 7</TableCell>
                  <TableCell>Level 7 Starter x3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4 → 5</TableCell>
                  <TableCell>Level up 2 Starters to Level 10</TableCell>
                  <TableCell>Level 7 Starter x1, Level 10 Starter x2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>5 → 6</TableCell>
                  <TableCell>Rank up 2 Starters to Level 2</TableCell>
                  <TableCell>Level 7 Starter x1, Rank 2 Starter x2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>6 → 7</TableCell>
                  <TableCell>Rank up 4 Starters to Level 2</TableCell>
                  <TableCell>Rank 2 Starter x4</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>7 → 8</TableCell>
                  <TableCell>Rank up 2 Starters to Level 2</TableCell>
                  <TableCell>Level 7 Starter x6, Rank 2 Starter x4</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>8 → 9</TableCell>
                  <TableCell>Rank up 2 Starters to Level 2</TableCell>
                  <TableCell>Level 7 Starter x8, Rank 2 Starter x4</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>9 → 10</TableCell>
                  <TableCell>Rank up 2 Starters to Level 2</TableCell>
                  <TableCell>Level 7 Starter x3, Level 10 Starter x5, Rank 2 Starter x4</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Section>
      </Page>
    </>
  );
}
