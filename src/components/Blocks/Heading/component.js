import React, { createElement } from "react"

export const Component = ({ content, textAlign, level }) => {
  if (content !== undefined && content.includes("href")) {
    return (
      <div className="services_links">
        <h2 dangerouslySetInnerHTML={{ __html: content }}></h2>
      </div>
    )
  } else {
    return createElement(
      `h${level}`,
      {
        className: "component_wrapper",
      },
      content
    )
  }
}

Component.displayName = "Heading"
