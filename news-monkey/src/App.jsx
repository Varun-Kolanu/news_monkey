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
  pageSize= 6;
  render() {
    return (
      <>
        <Router>
        <Navbar />
        <Routes>
        <Route exact path='/' element={ <News key="b1" pageSize={this.pageSize} category="business" country="in"/>}/>
        <Route exact path='/business' element={ <News key="b2" pageSize={this.pageSize} category="business" country="in"/>}/>
        <Route exact path='/entertainment' element={ <News key="e" pageSize={this.pageSize} category="entertainment" country="in"/>}/>
        <Route exact path='/general' element={ <News key="g" pageSize={this.pageSize} category="general" country="in"/>}/>
        <Route exact path='/health' element={ <News key="h" pageSize={this.pageSize} category="health" country="in"/>}/>
        <Route exact path='/science' element={ <News key="s" pageSize={this.pageSize} category="science" country="in"/>}/>
        <Route exact path='/sports' element={ <News key="sp" pageSize={this.pageSize} category="sports" country="in"/>}/>
        <Route exact path='/technology' element={ <News key="t" pageSize={this.pageSize} category="technology" country="in"/>}/>
        </Routes>
        </Router>
      </>
    )
  }
}
