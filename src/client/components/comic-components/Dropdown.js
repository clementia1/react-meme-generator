import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      color: '#000000',
      font: ['Arial', 'Sherwood', 'Geneva', 'Verdana', 'Monaco', 'Myriad Pro', 'Lucida Grande', 'Ubuntu', 'Impact', 'Times New Roman', 'Georgia', 'Gothic'],
      selectedFont: "Arial",
      selectedSize: 20,
      size: [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 72],
      fontWeight: "normal",
      activ: false,
    };
    this.AddText = this.AddText.bind(this);
    this.changeFont = this.changeFont.bind(this);
    this.changeTextarea = this.changeTextarea.bind(this);
    this.changeTextareaColor = this.changeTextareaColor.bind(this);
    this.changeSize = this.changeSize.bind(this);
  }
  AddText() {
    let { canvas } = this.props;
    let text = this.state.text;
    if (text !== '') {
      let textSample = new fabric.IText(text, {
        fontSize: this.state.selectedSize,
        fontFamily: this.state.selectedFont,
        fontWeight: '',
        width: 100,
        left: 50,
        top: 50,
        originX: 'center',
        originY: 'center',
        hasRotatingPoint: true,
        centerTransform: true,
        fill: this.state.color,
      });
      canvas.add(textSample);
      }
  }

  componentDidUpdate(prevProps, prevState) {
    let { canvas } = this.props;
    let activObj = canvas.getActiveObject();
    // if activeObject is a text - changing it
    if (activObj && activObj.setText) {  
      if (this.state.text !== prevState.text) activObj.setText(this.state.text);
      if (this.state.selectedSize !== prevState.text) activObj.set({fontSize: this.state.selectedSize});
      if (this.state.selectedFont !== prevState.text) activObj.set({fontFamily: this.state.selectedFont}); 
      if (this.state.color !== prevState.text) activObj.set({fill: this.state.color});
      canvas.renderAll();
    }      
  }  

  changeTextarea(e) {
    this.setState({
      text: e.target.value
    })
  }
  changeTextareaColor(e) {
    this.setState({
      color: e.target.value
    })
  }
  changeFont(e) {
    this.setState({
      selectedFont: e.target.value
    })
  }
  changeSize(e) {
    this.setState({
      selectedSize: e.target.value
    })
  }

  render() {
    return (
      <div className="add-card-opened">
        <textarea onChange={this.changeTextarea} ></textarea>
        <input type="color" value={this.state.color} onChange={this.changeTextareaColor.bind(this)}></input>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.AddText}>Добавить</button>
        <select className="font-selector" onChange={this.changeFont} value={this.state.selectedFont}>
          {this.state.font.map((item, index) => {
            return <option key={index} value={item} style={{ fontFamily: item }}>{item}</option>
          })}    </select>
        <select className="font-selector" onChange={this.changeSize} value={this.state.selectedSize}>
          {this.state.size.map((item, index) => {
            return <option key={index} value={item} style={{ fontFamily: item }}>{item}</option>
          })}    </select>

      </div>
    )
  }
}
export default Dropdown;