import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import { Link } from 'react-router-dom';

const SidebarHeader = () => (
    <nav>
      <ul className="sidebar-header-ul">
        <li><Link to='/'>Pepe</Link></li>
        <li><Link to='/rageface'>Rageface</Link></li>
        <li><Link to='/twitch'>Twitch</Link></li>
      </ul>
    </nav>
);

export default SidebarHeader;