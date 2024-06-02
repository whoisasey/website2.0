import React from "react"

export const Component = ({ url, alt, className, align }) => {
  return <img src={url} alt={alt} />
}

Component.displayName = "Image"
