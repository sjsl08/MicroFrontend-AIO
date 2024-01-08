import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NavigationItem from "./components/NavigationItem"

import classes from './root.component.module.css';

export default function Root() {
 
  return (
    <Router>
      <nav className={classes.nav}>
        <NavigationItem link="/">React</NavigationItem>
        <NavigationItem link="angular">Angular</NavigationItem>
        <NavigationItem link="vue">Vue</NavigationItem>
      </nav>
    </Router>
  )
  
}
