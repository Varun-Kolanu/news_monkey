import './App.css'
import React, { Component } from 'react'
import { Navbar } from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
        <Navbar />
        <Routes>
        <Route exact path='/' element={ <News key="b1" pageSize={6} category="business" country="in"/>}/>
        <Route exact path='/business' element={ <News key="b2" pageSize={6} category="business" country="in"/>}/>
        <Route exact path='/entertainment' element={ <News key="e" pageSize={6} category="entertainment" country="in"/>}/>
        <Route exact path='/general' element={ <News key="g" pageSize={6} category="general" country="in"/>}/>
        <Route exact path='/health' element={ <News key="h" pageSize={6} category="health" country="in"/>}/>
        <Route exact path='/science' element={ <News key="s" pageSize={6} category="science" country="in"/>}/>
        <Route exact path='/sports' element={ <News key="sp" pageSize={6} category="sports" country="in"/>}/>
        <Route exact path='/technology' element={ <News key="t" pageSize={6} category="technology" country="in"/>}/>
        </Routes>
        </Router>
      </>
    )
  }
}
