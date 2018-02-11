import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import ImagePanel1 from './sidebar-components/ImagePanel1';
import ImagePanel2 from './sidebar-components/ImagePanel2';
import SidebarHeader from './sidebar-components/SidebarHeader';
import SidebarMain from './sidebar-components/SidebarMain';

const Sidebar = (props) => (
  <div>
    <SidebarHeader/>
    <SidebarMain addImage={props.addImage}/>
  </div>
)

export default Sidebar;