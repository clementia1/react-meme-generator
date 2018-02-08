import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import ImagePanel1 from './ImagePanel1';
import ImagePanel2 from './ImagePanel2';
import { Route, Switch } from 'react-router-dom';

const SidebarMain = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ImagePanel1}/>
      <Route path='/ImagePanel2' component={ImagePanel2}/>
    </Switch>
  </main>
);

export default SidebarMain;