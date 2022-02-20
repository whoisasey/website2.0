import React, { createElement } from "react"

export const Component = ({ ...customButton }) => {
  const {
    backgroundColour,
    buttonBackgroundColour,
    buttonTextColour,
    contactText,
    content,
    contentHeader,
    textColour,
  } = customButton
  return (
    <section
      className="homepage_cover"
      style={{ backgroundColor: `${backgroundColour}`, color: `${textColour}` }}
    >
      {createElement(
        "h2",
        { style: { color: `${textColour}` } },
        contentHeader
      )}
      {createElement("p", {}, content)}
      <a
        href="mailto:info@bigbuilds.ca"
        target="_blank"
        rel="noreferrer"
        style={{
          backgroundColor: `${buttonBackgroundColour}`,
          color: `${buttonTextColour}`,
        }}
      >
        {contactText}
      </a>
    </section>
  )
}

Component.displayName = "Cover"
