import React from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import ImgModel from '../models/ImgModel'

function PhotoInput(props) {
  const handleSelectFiles = async (e) => {
    const filesAdded = [...e.target.files]
    const newFiles = []

    // Get DataUrl from uploaded file(s)
    const fileToDataUrl = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.addEventListener('load', (evt) => {
          resolve(evt.currentTarget.result)
        })

        fileReader.addEventListener('error', (evt) => {
          reject(new Error(evt.currentTarget.error))
        })

        fileReader.readAsDataURL(file)
      })
    }

    // array with dataUrl to be used as a value for src of img tags
    const filesWithUrls = await Promise.all(
      filesAdded.map((o) =>
        fileToDataUrl(o).then((result) =>
          newFiles.push(new ImgModel(nanoid(), result, o.name))
        )
      )
    ).then(() => {
      return newFiles
    })
    console.log(newFiles)
  }
  const handleSelect = () => {
    props.handleSelect
  }

  return (
    <div className="photo-input-container">
      <label htmlFor="photo-input" className="photo-input-label">
        <h2>Click to select a photo</h2>
      </label>
      <input
        type="file"
        name="photo"
        accept="image/*"
        // onChange={extractFilename(this.value)}
        onChange={handleSelect}
        id="photo-input"
        className="photo-input"
        multiple
      />
    </div>
  )
}

PhotoInput.propTypes = {
  handleSelect: PropTypes.objectOf(PropTypes.any),
}

export default PhotoInput
