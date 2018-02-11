import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';

const ImagePanel1 = (props) => (
  <div>
        <div className="mdl-grid">                                                                                                                                 
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="upload/memes/rageface/hmm.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="upload/memes/rageface/mofgod.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="upload/memes/rageface/1.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="upload/memes/rageface/wtf.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="upload/memes/rageface/okay.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="upload/memes/rageface/rly.png"/></div>
        </div>
  </div>
)

export default ImagePanel1;