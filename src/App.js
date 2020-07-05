import React from 'react'
import './App.css'
import PhotoManager from './components/PhotoManager'
import { nanoid } from 'nanoid'
import ImgModel from './models/ImgModel'
import dataImage from './img/carl-nenzen-loven-igKjieyjcko-unsplash.jpg'

function App() {
  // placeholder data:
  const prevData = [
    new ImgModel(
      nanoid(),
      dataImage,
      // 'White road bicycle against a teal wall in the sunset. Photo by Carl Nenzen Loven on Unsplash'
      'carl-nenzen-loven-white-road-bike-unsplash.jpg'
    ),
    new ImgModel(
      nanoid(),
      'https://images.unsplash.com/photo-1523740856324-f2ce89135981?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1098&q=80',
      'chris-barbalis-rusty-cruiser-bike-unsplash.jpg'
    ),
  ]

  return (
    <div className="App">
      <PhotoManager data={prevData} />
    </div>
  )
}

export default App
