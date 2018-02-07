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
      size:[10, 20, 25,30,50],
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
    let textSample = new fabric.IText(text, {
      fontSize: this.state.selectedSize,
      fontFamily: this.state.selectedFont,
      fontWeight: '',
      width: 100,
      left: 100,
      top: 400,
      originX: 'center',
      originY: 'center',
      hasRotatingPoint: true,
      centerTransform: true,
      fill: this.state.color,

    });
    canvas.add(textSample);
    this.setState({ canvas });
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
        <textarea onChange={this.changeTextarea} value={this.state.text}></textarea>
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