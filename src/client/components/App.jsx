import React from 'react';
import axios from 'axios';
import Canvas from './canvas';

class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
        image: '',
        width: 500,
        title: 'Type your title'
    };
       
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
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
  

  
  handleWidthChange(event) {
      this.setState({width: event.target.value});
  }
   
  handleTitleChange(event) {
      this.setState({title: event.target.value});
  }

  render() {
    return (
      <div>        
        <input type="file" onChange={this.handleUploadImage} />
        Заголовок: <input type="text" onChange={this.handleTitleChange} />
        Ширина: <input type="range" min="0" max="1000" step="10" value={this.state.width} onChange={this.handleWidthChange} />
        <div className="displayImage"><img></img></div> 
        <Canvas image={this.state.image} title={this.state.title} width={this.state.width} />        
      </div>
    );
  }
}

export default App;