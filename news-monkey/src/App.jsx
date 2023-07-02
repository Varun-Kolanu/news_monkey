import './App.css'
import React, { useState } from 'react'
import { Navbar } from './Components/Navbar'
import {News} from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export const App = () => {
  const pageSize = 6;
  const apiKey = import.meta.env.VITE_API_KEY
  const [progress, setProgress] = useState(0)
    return (
      <>
        <Router>
        {/* <LoadingBar
            color='#f11946'
            progress={progress}
          /> */}
          <Navbar />
          
          <Routes>
            <Route exact path='/' element={<News apiKey={apiKey} setProgress={setProgress} key="b1" pageSize={pageSize} category="business" country="in" />} />
            <Route exact path='/business' element={<News apiKey={apiKey} setProgress={setProgress} key="b2" pageSize={pageSize} category="business" country="in" />} />
            <Route exact path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} key="e" pageSize={pageSize} category="entertainment" country="in" />} />
            <Route exact path='/general' element={<News apiKey={apiKey} setProgress={setProgress} key="g" pageSize={pageSize} category="general" country="in" />} />
            <Route exact path='/health' element={<News apiKey={apiKey} setProgress={setProgress} key="h" pageSize={pageSize} category="health" country="in" />} />
            <Route exact path='/science' element={<News apiKey={apiKey} setProgress={setProgress} key="s" pageSize={pageSize} category="science" country="in" />} />
            <Route exact path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} key="sp" pageSize={pageSize} category="sports" country="in" />} />
            <Route exact path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} key="t" pageSize={pageSize} category="technology" country="in" />} />
          </Routes>
        </Router>
      </>
    )
}
