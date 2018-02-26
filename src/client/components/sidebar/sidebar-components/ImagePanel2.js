import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';

const ImagePanel2 = (props) => (

  <div>
        <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/feelsbadman.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox " onClick={props.addImage}><img src="images/memes/pepe/feelsgoodman.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/Pepe_pls.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe0.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe1.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe2.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe3.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe4.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe5.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe6.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe7.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe8.png"/></div>
            <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={props.addImage}><img src="images/memes/pepe/pepe9.png"/></div>
        </div>
  </div>
)

export default ImagePanel2;