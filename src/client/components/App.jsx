import React from 'react';
import axios from 'axios';
import Canvas from './canvas';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import Sidebar from './sidebar/Sidebar';
import { SketchPicker } from 'react-color';


class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
        image: '',
        imageCount: 0,
        displayBgColorPicker: false,
        canvasBgColor: 'white',
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
  
  sendActiveObjectBackwards = () => {
    this.child.sendActiveObjectBackwards(); 
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

  handleCanvasBgColorChange = (color) => {
    this.setState({canvasBgColor: color.hex});
  }    

  toggleDisplayBgColorPicker = () => {
    this.setState({ displayBgColorPicker: !this.state.displayBgColorPicker })
  };

  handleCloseBgColorPicker = () => {
    this.setState({ displayBgColorPicker: false })
  };

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
      switch (true) {
          case getWindowWidth() >= 840:
              this.setState({width: getWindowWidth() * 0.75 - getWindowWidth() * 0.04});
                break;
          case getWindowWidth() < 840 && getWindowWidth() >= 480: 
              this.setState({width: getWindowWidth() * 0.75 - getWindowWidth() * 0.067});
                break;              
          case getWindowWidth() <= 480:
              this.setState({width: getWindowWidth() * 0.87});
                break;
      }      
  }

  render() {
    const popover = {
        position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    return (
        <div>
             <div className="header mdl-tabs mdl-js-tabs">
                    <div className="mdl-tabs__tab-bar">
                        <a href="#tab1" className="mdl-tabs__tab header-tab">MAIN SETTINGS</a>
                        {/* <a href="#tab2" className="mdl-tabs__tab header-tab">ADD TEXT</a>
                        <a href="#tab3" className="mdl-tabs__tab header-tab">DRAWING MODE</a> */}
                    </div>
                    <div className="mdl-tabs__panel header-panel is-active" id="tab1">
                        {/* <div className="controlpanel-item">
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input className="mdl-textfield__input" type="text" id="sample3" onChange={this.addImageFromUrl}/>
                                <label className="mdl-textfield__label" htmlFor="sample3">Add image from url</label>
                            </div>
                        </div> */}
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
                            <label className="input-custom-file mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                            ADD IMAGE
                            <input type="file" onChange={this.handleUploadImage}/>
                            </label>
                        </div>                        
                        <div className="controlpanel-item">
                            <button id="canvasBgColor" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={this.toggleDisplayBgColorPicker}>
                            <i className="material-icons">format_color_fill</i>
                            </button>
                            <div className="mdl-tooltip" htmlFor="canvasBgColor">
                            Change background color
                            </div>
                            { this.state.displayBgColorPicker ? <div style={ popover }>
                            <div style={ cover } onClick={ this.handleCloseBgColorPicker }/>
                            <SketchPicker color={ this.state.canvasBgColor } onChangeComplete={ this.handleCanvasBgColorChange } />
                            </div> : null }                            
                        </div>
                        <div className="controlpanel-item">
                            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.fitToWidth}>
                              FIT TO WIDTH
                            </button>
                            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.fitToHeight}>
                              FIT TO HEIGHT
                            </button>
                        </div>
                        <div className="controlpanel-item">
                            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.sendActiveObjectBackwards}>
                              Move layer down
                            </button>
                        </div>
                    </div>
                    <div className="mdl-tabs__panel header-panel" id="tab2">
                    </div>
                    <div className="mdl-tabs__panel header-panel" id="tab3">
                    </div>
            </div>

            <div className="mdl-grid">
                <div className="sidebar mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
                    <Sidebar addImage={this.addImageToCanvas}/>
                </div>
                <div className="mainCanvas mdl-cell mdl-cell--9-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
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