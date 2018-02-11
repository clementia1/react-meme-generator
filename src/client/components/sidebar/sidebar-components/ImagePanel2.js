import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';

const ImagePanel2 = (props) => (
  <div>
        <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
        </div>
  </div>
)

export default ImagePanel2;