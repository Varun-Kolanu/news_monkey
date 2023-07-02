import './App.css'
import React, { Component } from 'react'
import { Navbar } from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 6;
  apiKey = import.meta.env.VITE_API_KEY
  state = {
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          {/* <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          /> */}
          <Routes>
            <Route exact path='/' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="b1" pageSize={this.pageSize} category="business" country="in" />} />
            <Route exact path='/business' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="b2" pageSize={this.pageSize} category="business" country="in" />} />
            <Route exact path='/entertainment' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="e" pageSize={this.pageSize} category="entertainment" country="in" />} />
            <Route exact path='/general' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="g" pageSize={this.pageSize} category="general" country="in" />} />
            <Route exact path='/health' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="h" pageSize={this.pageSize} category="health" country="in" />} />
            <Route exact path='/science' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="s" pageSize={this.pageSize} category="science" country="in" />} />
            <Route exact path='/sports' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sp" pageSize={this.pageSize} category="sports" country="in" />} />
            <Route exact path='/technology' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="t" pageSize={this.pageSize} category="technology" country="in" />} />
          </Routes>
        </Router>
      </>
    )
  }
}
