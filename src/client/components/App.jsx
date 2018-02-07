import React from 'react';
import axios from 'axios';
import Canvas from './canvas';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';


class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
        image: '',
        imageCount: 0,
        width: 500,
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
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                    <label className="input-custom-file mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                      ADD IMAGE
                      <input type="file" onChange={this.handleUploadImage}/>
                    </label>
                    <br></br>
                      <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" type="text" id="title" onChange={this.handleTitleChange} />
                        <label className="mdl-textfield__label" htmlFor="title">Type your title</label>
                      </div>
                    <p className="rangeCanvasWidth" id="rangeCanvasWidth"> <input className="mdl-slider mdl-js-slider" type="range" min="0" max="1000" step="10" value={this.state.width} onChange={this.handleWidthChange} /> </p>
                    <div className="mdl-tooltip" htmlFor="rangeCanvasWidth">
                    Adjust canvas width
                    </div>
                </div>
            </div>
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col">
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
                        <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
                        <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
                        <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="https://pbs.twimg.com/profile_images/848395594590814208/_TtPuzHs.jpg"/></div>
                        <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="upload/Pepe_pls.png"/></div>
                        <div className="mdl-cell mdl-cell--3-col mdl-shadow--2dp imgBox" onClick={this.addImageToCanvas}><img src="upload/rageface.jpg"/></div>
                    </div>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                    <Canvas image={this.state.image} imageCount={this.state.imageCount} title={this.state.title} width={this.state.width}/>
                </div>
            </div>
        </div>
    );
  }
}

export default App;