import PropTypes, { InferProps } from "prop-types";
import React from "react";

import { AnchoredSection } from "/src/components/common/AnchoredSection";

AnchoredMarkdownSection.propTypes = {
  data: PropTypes.any.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired
};

export function AnchoredMarkdownSection(props: InferProps<typeof AnchoredMarkdownSection.propTypes>): React.ReactElement {
  return (
    <AnchoredSection anchor={props.anchor} heading={props.title}>
      <div
        dangerouslySetInnerHTML={{
          __html: props.data
            .allMarkdownRemark
            .nodes
            .find((e: any) => e.frontmatter.category === props.category && e.frontmatter.title === props.title)
            .html
        }}
      >
      </div>
    </AnchoredSection>
  );
}
