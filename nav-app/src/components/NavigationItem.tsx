import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = (props) => (
  <NavLink to={props.link} 
    className={({ isActive }) => {
      const linkClasses = [classes.link];

      if(isActive) linkClasses.push(classes.active);
      return linkClasses.join(' ');
    }}>
      {props.children}
  </NavLink>
);


export default NavigationItem;