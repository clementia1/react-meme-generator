import React from 'react';
import axios from 'axios';

class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {image: ''};

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  handleUploadImage(event) {
    const data = new FormData();
    data.append('file', event.target.files[0]);
      this.setState({image: event.target.files[0].name});
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');
      console.log(event.target.files[0]);
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
    
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleUploadImage} />
        <button onClick={this.getImage}>Show image</button>
        <div className="displayImage"><img></img></div>        
      </div>
    );
  }
}

export default App;