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
      size: [10, 20, 25, 30, 50],
      fontWeight: "normal",
      activ: false,
    };
    this.AddText = this.AddText.bind(this);
    this.changeFont = this.changeFont.bind(this);
    this.changeTextarea = this.changeTextarea.bind(this);
    this.changeTextareaColor = this.changeTextareaColor.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.editText = this.editText.bind(this);
    this.saveText = this.saveText.bind(this);
  }
  AddText() {
    let { canvas } = this.props;
    let text = this.state.text;
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
  editText() {
    let { canvas } = this.props;
    if (canvas.getActiveObject() === undefined) { console.log("undefined") }
    else if (typeof (canvas.getActiveObject().text) == 'string') {
      let activeObj = canvas.getActiveObject();
      this.setState({
        text: activeObj.text,
        selectedSize: activeObj.fontSize,
        selectedFont: activeObj.fontFamily,
        fontWeight: activeObj.fontWeight,
        color: activeObj.fill,
        activ: true,
      })
    }
    else { console.log("canvas.getActiveObject()", activeObj); }
  }
  componentDidUpdate (){
    let { canvas } = this.props;
    console.log("componentDidUpdate", canvas);
    canvas.getActiveObject().text = this.state.text;
    canvas.getActiveObject().fontSize = this.state.selectedSize;
    canvas.getActiveObject().fontFamily = this.state.selectedFont;
    canvas.getActiveObject().fill = this.state.color;
    }
  

  saveText() {
    // let { canvas } = this.props;
    // console.log("saveText", canvas);
    // canvas.getActiveObject().text = this.state.text;
    // canvas.getActiveObject().fontSize = this.state.selectedSize;
    // canvas.getActiveObject().fontFamily = this.state.selectedFont;
    // canvas.getActiveObject().fill = this.state.color;
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
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.editText}>Изменить</button>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.saveText}>Сохранить</button>
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