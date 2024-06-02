import React, { useState, useEffect } from "react"

export const Component = ({ content, originalContent }) => {
  const [isPage, setIsPage] = useState(null)
  const contact = "/contact/"

  useEffect(() => {
    setIsPage(window.location.pathname)
  }, [isPage])

  if (originalContent.match(/(<([^>]+)>)/gi)?.length) {
    return (
      <p
        className={isPage === contact ? null : "component_wrapper"}
        style={isPage === contact ? { margin: "1rem 0" } : null}
        dangerouslySetInnerHTML={{ __html: originalContent }}
      ></p>
    )
  }
}

Component.displayName = "Paragraph"
