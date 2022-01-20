import React, { useState, useEffect } from "react"

export const Component = ({ originalContent }) => {
  const [isPage, setIsPage] = useState(null)
  const press = "/press/"

  useEffect(() => {
    setIsPage(window.location.pathname)
  }, [isPage])

  // need to fix paragraph content here
  // if (content === undefined) return <div className="component_wrapper"></div>
  if (originalContent.match(/(<([^>]+)>)/gi)?.length) {
    return (
      <div className="component_wrapper">
        <p dangerouslySetInnerHTML={{ __html: originalContent }} />
      </div>
    )
  }

  return (
    <div className={isPage === press ? null : `component_wrapper`}>
      <p>{originalContent}</p>
    </div>
  )
}

Component.displayName = "Paragraph"
