import React from 'react'
import PropTypes from 'prop-types'
import ImgModel from '../models/ImgModel'

function PhotoThumbnail(props) {
  const { file } = props
  const handleRemove = (id) => {
    props.handleRemove(id)
  }

  return (
    <div className="photo-thumbnail" key={file.id}>
      <img src={file.url} alt={file.name} className="thumbnail" />
      <button className="remove-btn" onClick={() => handleRemove(file.id)}>
        <i className="material-icons" role="presentation">
          clear
        </i>
        <span className="sr-only">Remove {file.name}</span>
      </button>
    </div>
  )
}

PhotoThumbnail.propTypes = {
  props: PropTypes.arrayOf(PropTypes.instanceOf(ImgModel)),
}

export default PhotoThumbnail
