import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import ImagePanel1 from './ImagePanel1';
import ImagePanel2 from './ImagePanel2';
import { Route, Switch } from 'react-router-dom';

const SidebarMain = (props) => (
  <main>
    <Switch>
      <Route exact path='/' render={()=><ImagePanel1 addImage={props.addImage}/>} />
      <Route path='/panel2' render={()=><ImagePanel2 addImage={props.addImage}/>}/>
    </Switch>
  </main>
);

export default SidebarMain;