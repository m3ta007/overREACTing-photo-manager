import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import ImgModel from '../models/ImgModel'

function PhotoManager(props) {
  // Load existent data
  const { data } = props
  console.log(data)

  // Set state including previous data
  const [files, setFiles] = useState(props.data)

  // Fallback path handling:
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
    console.log('Files is ', files)
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
          <div className="photo-thumbnail" key={file.id}>
            <img src={file.url} alt={file.name} className="thumbnail" />
            <button
              className="remove-btn"
              onClick={() => handleRemove(file.id)}>
              <i className="material-icons" role="presentation">
                clear
              </i>
              <span className="sr-only">Remove {file.name}</span>
            </button>
          </div>
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
