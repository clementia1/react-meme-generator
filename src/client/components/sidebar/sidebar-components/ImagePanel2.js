import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';

const ImagePanel2 = (props) => (

  <div>
        <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="upload/memes/pepe/feelsbadman.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox " onClick={props.addImage}><img src="upload/memes/pepe/feelsgoodman.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="upload/memes/pepe/Pepe_pls.png"/></div>
        </div>
  </div>
)

export default ImagePanel2;