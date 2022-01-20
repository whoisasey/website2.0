import React, { Fragment } from "react"

export const Component = ({ columns, images }) => {
  const column = columns ? columns : 2
  return (
    <Fragment>
      <div className={`block_gallery columns_${column}`}>
        <ul className="blocks_gallery_grid">
          {images.map(image => {
            return (
              <li className="blocks_gallery_item">
                <figure>
                  <img loading="lazy" src={image.url} alt="" key={image.id} />
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </Fragment>
  )
}

Component.displayName = "Gallery"
