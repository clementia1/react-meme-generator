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
        canvasBgColor: '',
        width: 700,
        height: 500,
    };

    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.addImageToCanvas = this.addImageToCanvas.bind(this);
    this.addImageFromUrl = this.addImageFromUrl.bind(this);
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
  
  fitToWidth = () => {
    this.child.fitToObjectWidth(); 
  }
  
  fitToHeight = () => {
    this.child.fitToObjectHeight(); 
  }
    
  addImageFromUrl(event) { 
    this.setState({
        image: event.target.value
    }); 
 }
  
  handleWidthChange(event) {
      this.setState({width: event.target.value});
  }

  handleHeightChange(event) {
    this.setState({height: event.target.value});
  }

  handleCanvasBgColorChange = (event) => {
    this.setState({canvasBgColor: event.target.value});
  }    


  componentWillMount() {
    function getWindowWidth() {
        return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
      }
      this.setState({width: getWindowWidth() * 0.75 - getWindowWidth() * 0.03});
  }

  render() {
    return (
        <div>
             <div className="header mdl-tabs mdl-js-tabs">
                    <div className="mdl-tabs__tab-bar">
                        <a href="#tab1" className="mdl-tabs__tab header-tab">MAIN SETTINGS</a>
                        <a href="#tab2" className="mdl-tabs__tab header-tab">ADD TEXT</a>
                        <a href="#tab3" className="mdl-tabs__tab header-tab">DRAWING MODE</a>
                    </div>
                    <div className="mdl-tabs__panel header-panel is-active" id="tab1">
                        <div className="controlpanel-item">
                            <label className="input-custom-file mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                            ADD IMAGE
                            <input type="file" onChange={this.handleUploadImage}/>
                            </label>
                        </div>
                        <div className="controlpanel-item">
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input className="mdl-textfield__input" type="text" id="sample3" onChange={this.addImageFromUrl}/>
                                <label className="mdl-textfield__label" htmlFor="sample3">Add image from url</label>
                            </div>
                        </div>
                        <div className="controlpanel-item">
                            <p className="rangeCanvasWidth" id="rangeCanvasWidth"> <input className="mdl-slider mdl-js-slider" type="range" min="0" max="1500" step="10" value={this.state.width} onChange={this.handleWidthChange} /> </p>
                            <div className="mdl-tooltip" htmlFor="rangeCanvasWidth">
                            Adjust canvas width
                            </div>
                        </div>
                        <div className="controlpanel-item">
                            <p className="rangeCanvasWidth" id="rangeCanvasHeight"> <input className="mdl-slider mdl-js-slider" type="range" min="0" max="1000" step="10" value={this.state.height} onChange={this.handleHeightChange} /> </p>
                            <div className="mdl-tooltip" htmlFor="rangeCanvasHeight">
                            Adjust canvas height
                            </div>
                        </div>
                        <div className="controlpanel-item">
                            <p id="canvasBgColor"> <input type="color" onChange={this.handleCanvasBgColorChange}/> </p>
                            <div className="mdl-tooltip" htmlFor="canvasBgColor">
                            Change background color
                            </div>
                        </div>
                        <div className="controlpanel-item">
                            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.fitToWidth}>
                              FIT TO WIDTH
                            </button>
                            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.fitToHeight}>
                              FIT TO HEIGHT
                            </button>
                        </div>
                    </div>
                    <div className="mdl-tabs__panel header-panel" id="tab2">
                        <p>Second tab's content.</p>
                    </div>
                    <div className="mdl-tabs__panel header-panel" id="tab3">
                        <p>Third tab's content.</p>
                    </div>
            </div>

            <div className="mdl-grid">
                <div className="sidebar mdl-cell mdl-cell--3-col">
                    <Sidebar addImage={this.addImageToCanvas}/>
                </div>
                <div className="mainCanvas mdl-cell mdl-cell--9-col">
                    <Canvas onRef={ref => (this.child = ref)}
                        image={this.state.image}
                        imageCount={this.state.imageCount}
                        width={this.state.width}
                        height={this.state.height}
                        canvasbgcolor={this.state.canvasBgColor}
                    />
                </div>
            </div>
        </div>
    );
  }
}

export default App;