import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import { Link } from 'react-router-dom';

const SidebarHeader = () => (
    <nav>
      <ul>
        <li><Link to='/'>Rageface</Link></li>
        <li><Link to='/ImagePanel2'>Pepe</Link></li>
      </ul>
    </nav>
);

export default SidebarHeader;