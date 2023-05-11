import PropTypes, { InferProps } from "prop-types";
import React from "react";
import { AnchoredSection } from "./AnchoredSection";

Markdown.propTypes = {
  data: PropTypes.any.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired
};

export function Markdown(props: InferProps<typeof Markdown.propTypes>): React.ReactElement {
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
