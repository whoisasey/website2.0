import React, { useState, useEffect } from "react"

export const Component = ({ content }) => {
  const [isPage, setIsPage] = useState(null)
  const press = "/press/"

  useEffect(() => {
    setIsPage(window.location.pathname)
  }, [isPage])

  if (content.match(/(<([^>]+)>)/gi)?.length) {
    return (
      <div className="component_wrapper">
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }

  return (
    <div className={isPage === press ? null : `component_wrapper`}>
      <p>{content}</p>
    </div>
  )
}

Component.displayName = "Paragraph"
