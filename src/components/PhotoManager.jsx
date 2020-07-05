import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import ImgModel from '../models/ImgModel'
import PhotoThumbnail from './PhotoThumbnail'

function PhotoManager(props) {
  // Set state including previous data
  const [files, setFiles] = useState(props.data)

  // Fallback file URL path handling:
  // function extractFilename(path) {
  //   if (path.substr(0, 12) == 'C:\\fakepath\\') return path.substr(12) // modern browser
  //   var x
  //   x = path.lastIndexOf('/')
  //   if (x >= 0)
  //     // Unix-based path
  //     return path.substr(x + 1)
  //   x = path.lastIndexOf('\\')
  //   if (x >= 0)
  //     // Windows-based path
  //     return path.substr(x + 1)
  //   return path // just the file name
  // }

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

  const handleSelect = async (e) => {
    const filesAdded = [...e.target.files]
    const newFiles = []

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

    setFiles((prevFiles) => prevFiles.concat(filesWithUrls))
  }

  const handleRemove = (id) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
  }

  return (
    <div className="container">
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
      <div className="photo-container">
        {files.map((file) => (
          <PhotoThumbnail
            file={file}
            handleRemove={handleRemove}
            key={file.id}
          />
        ))}
      </div>
      <p>Photo(s) you have picked:</p>
      <ul className="photo-list">
        {files.map((file) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  )
}

PhotoManager.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(ImgModel)),
}

export default PhotoManager
