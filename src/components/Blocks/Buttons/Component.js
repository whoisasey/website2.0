import React from "react"

export const Component = ({ innerBlocks }) => {
  if (innerBlocks) {
    const { text, textColor, backgroundColor, url } = innerBlocks[0].attributes
    return (
      <a
        href={url}
        style={{
          background: `${backgroundColor}`,
          color: `${textColor}`,
        }}
        className="button"
        target="_blank"
        rel="noreferrer"
      >
        {text}
      </a>
    )
  } else {
    return null
  }
}

Component.displayName = "Buttons"
