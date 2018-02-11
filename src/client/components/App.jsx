import React from 'react';
import axios from 'axios';
import Canvas from './canvas';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import Sidebar from './sidebar/Sidebar';


class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
        image: '',
        imageCount: 0,
        width: 700,
        title: 'Type your title'
    };
       
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.addImageToCanvas = this.addImageToCanvas.bind(this);
  }

  handleUploadImage(event) {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    let imagePath = '/upload/' + event.target.files[0].name;
    
    axios.post('/upload', data).then((response) => {
      this.setState({image: imagePath});
      console.log(response); 
    });
  }
  
  addImageToCanvas(event) {     
     let img = event.target.src;
     this.setState({
         image: img,
         imageCount: this.state.imageCount + 1
     }); 
  }
  
  handleWidthChange(event) {
      this.setState({width: event.target.value});
  }
   
  handleTitleChange(event) {
      this.setState({title: event.target.value});
  }

  render() {
    return (
        <div>
             <div class="mdl-tabs mdl-js-tabs">
                    <div class="mdl-tabs__tab-bar">
                        <a href="#tab1" class="mdl-tabs__tab header-tab">MAIN SETTINGS</a>
                        <a href="#tab2" class="mdl-tabs__tab header-tab">ADD TEXT</a>
                        <a href="#tab3" class="mdl-tabs__tab header-tab">DRAWING MODE</a>
                    </div>
                    <div class="mdl-tabs__panel header-panel is-active" id="tab1">
                        <div className="controlpanel-item">
                            <label className="input-custom-file mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                            ADD IMAGE
                            <input type="file" onChange={this.handleUploadImage}/>
                            </label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield controlpanel-item">
                            <input className="mdl-textfield__input" type="text" id="title" onChange={this.handleTitleChange} />
                            <label className="mdl-textfield__label" htmlFor="title">Type your title</label>
                        </div>
                        <div className="controlpanel-item">
                            <p className="rangeCanvasWidth" id="rangeCanvasWidth"> <input className="mdl-slider mdl-js-slider" type="range" min="0" max="1000" step="10" value={this.state.width} onChange={this.handleWidthChange} /> </p>
                            <div className="mdl-tooltip" htmlFor="rangeCanvasWidth">
                            Adjust canvas width
                            </div>
                        </div>
                    </div>
                    <div class="mdl-tabs__panel header-panel" id="tab2">
                        <p>Second tab's content.</p>
                    </div>
                    <div class="mdl-tabs__panel header-panel" id="tab3">
                        <p>Third tab's content.</p>
                    </div>
            </div>

            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col">
                    <Sidebar/>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                    <Canvas image={this.state.image} imageCount={this.state.imageCount} title={this.state.title} width={this.state.width}/>
                </div>
            </div>
        </div>
    );
  }
}

/*<div className="mdl-grid">
    <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
    <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
    <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
    <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
    <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="upload/Pepe_pls.png"/></div>
    <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="upload/rageface.jpg"/></div>
</div>*/

export default App;