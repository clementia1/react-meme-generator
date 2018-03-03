import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import { Link } from 'react-router-dom';

const SidebarHeader = () => (
    <nav>
      <ul className="sidebar-header-ul mdl-tabs__tab-bar">
        <li><Link to='/'>Rageface</Link></li>
        <li><Link to='/panel2'>Pepe</Link></li>
      </ul>
    </nav>
);

export default SidebarHeader;