import React from 'react';
import axios from 'axios';
import Canvas from './canvas';

class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
        image: '',
        width: 500,
        title: 'Type your title',
        characters: [
            {
                name: 'character1',
                image: '/upload/rageface.jpg'                
            },
            {
                name: 'character2',
                image: '/upload/rageface.jpg'                
            }
        ]
    };
       
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  handleUploadImage(event) {
    const data = new FormData();
    data.append('file', event.target.files[0]);
      this.setState({image: event.target.files[0].name});
    // '/upload' is your node.js route that triggers our middleware
    axios.post('/upload', data).then((response) => {
      console.log(response); // do something with the response
    });
  }
  
  getImage() {
      let imageUrl = "/upload/" + this.state.image;
      let reader  = new FileReader();
      let el = document.querySelector('.displayImage');
      let imageEl = el.querySelector("img");

      axios.get(imageUrl, {
              responseType: "blob"
          })
          .then(function (response) {
                reader.readAsDataURL(response.data);
          	    reader.onload = function() {					
	               var imageDataUrl = reader.result;
	               imageEl.setAttribute("src", imageDataUrl);
	            }
          });
  }
  
  handleWidthChange(event) {
      this.setState({width: event.target.value});
  }
   
  handleTitleChange(event) {
      this.setState({title: event.target.value});
  }
    
  removeCharacter() {
      this.setState({characters: this.state.characters.slice(0, -1)});
  }
  render() {
    return (
      <div>
        <button onClick={this.removeCharacter.bind(this)}>Remove character</button>
        <input type="file" onChange={this.handleUploadImage} />
        Заголовок: <input type="text" onChange={this.handleTitleChange} />
        Ширина: <input type="range" min="0" max="1000" step="10" value={this.state.width} onChange={this.handleWidthChange} />
        <button onClick={this.getImage}>Show image</button>
        <div className="displayImage"><img></img></div> 
        <Canvas title={this.state.title} width={this.state.width} characters={this.state.characters}/>        
      </div>
    );
  }
}

export default App;