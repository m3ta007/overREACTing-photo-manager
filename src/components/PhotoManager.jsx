import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import ImgModel from '../models/ImgModel'

function PhotoManager(props) {
  // Load existent data
  const { data } = props

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

  const handleRemove = () => {
    console.log('Handle me!')
  }

  return (
    <div className="container">
      <div className="photo-input-container">
        <label htmlFor="photo-input" className="photo-input-label">
          <h2>Click to select a photo</h2>
        </label>
        {/* Add multiple? https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file) */}
        <input
          type="file"
          name="photo"
          accept="image/*"
          // onChange={extractFilename(this.value)}
          onChange={handleSelect}
          id="photo-input"
          className="photo-input"
        />
      </div>
      <p>
        The photo you picked is: <span id="photo-name">file-name-here.img</span>
      </p>
      {/* static images: */}
      <div className="photo-container">
        <div className="photo-thumbnail">
          <img src={data[0].url} alt={data[0].name} className="thumbnail" />
          <button className="remove-btn" onClick={() => handleRemove()}>
            <i className="material-icons" role="presentation">
              clear
            </i>
            <span className="sr-only">Remove {data[0].name}</span>
          </button>
        </div>
        <div className="photo-thumbnail">
          <img src={data[1].url} alt={data[1].name} className="thumbnail" />
          <button className="remove-btn" onClick={() => handleRemove()}>
            <i className="material-icons" role="presentation">
              clear
            </i>
            <span className="sr-only">Remove {data[1].name}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

PhotoManager.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(ImgModel)),
}

export default PhotoManager
