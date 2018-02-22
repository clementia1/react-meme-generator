import React from 'react';
import Select from 'react-select';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import 'react-select/dist/react-select.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      color: '#000000',
      bgColor: 'transparent', 
      font: ['Arial', 'Sherwood', 'Geneva', 'Verdana', 'Monaco', 'Myriad Pro', 'Lucida Grande', 'Ubuntu', 'Impact', 'Times New Roman', 'Georgia', 'Gothic', 'Pacifico', 'Vollkorn SC', 'Pangolin', 'Play', 'Roboto', 'Lobster', 'Cormorant Infant'],
      selectedFont: "Arial",
      selectedFontSize: 12,
      size: [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 72],
      fontWeight: "normal",
      activ: false,
    };
    this.AddText = this.AddText.bind(this);
    this.changeTextarea = this.changeTextarea.bind(this);
    this.changeTextareaColor = this.changeTextareaColor.bind(this);
  }
  AddText() {
    let { canvas } = this.props;
    let text = this.state.text;
    if (text !== '') {
      let textSample = new fabric.IText(text, {
        fontSize: this.state.selectedFontSize,
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
    if (activObj && activObj.setText && activObj.getSelectedText() == false) {  
      if (this.state.text !== prevState.text) activObj.setText(this.state.text);
      if (this.state.selectedFontSize !== prevState.selectedFontSize) activObj.set({fontSize: this.state.selectedFontSize});
      if (this.state.selectedFont !== prevState.selectedFont) activObj.set({fontFamily: this.state.selectedFont}); 
      if (this.state.color !== prevState.color) activObj.set({fill: this.state.color});
      if (this.state.bgColor !== prevState.bgColor) activObj.set({backgroundColor: this.state.bgColor});
      canvas.renderAll();
    }

    if (activObj && activObj.setText && activObj.isEditing && activObj.getSelectionStyles) {
      activObj.dirty = true;      
      if (this.state.selectedFontSize) activObj.setSelectionStyles({fontSize: this.state.selectedFontSize});
      if (this.state.selectedFont) activObj.setSelectionStyles({fontFamily: this.state.selectedFont}); 
      if (this.state.color) activObj.setSelectionStyles({fill: this.state.color});
      if (this.state.bgColor) activObj.setSelectionStyles({backgroundColor: this.state.bgColor});
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
  changeBgColor(e) {
    this.setState({
      bgColor: e.target.value
    })
  }
  handleFontSizeChange = (selectedFontSize) => {
    this.setState({ selectedFontSize: selectedFontSize.value});
  }
  
  handleFontFamilyChange = (selectedFont) => {
    this.setState({ selectedFont: selectedFont.value});
  }

  render() {
    const { selectedFontSize } = this.state;
    let fontSizeOptions = this.state.size.map((item) => {
            return item = { 'value': item, 'label': item }
    });
    let fontFamilyOptions = this.state.font.map((item) => {
            return item = { 'value': item, 'label': item, 'title': item }
    });
    return (
      <div className="add-card-opened">
        <textarea onChange={this.changeTextarea} ></textarea>
        <input type="color" value={this.state.color} onChange={this.changeTextareaColor.bind(this)}></input>
        <input type="color" value={this.state.bgColor} onChange={this.changeBgColor.bind(this)}></input>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.AddText}>Добавить</button>
        <Select className="font-family-select"
            placeholder={this.state.selectedFont}
            value={this.selectedFont}
            onChange={this.handleFontFamilyChange}
            options={fontFamilyOptions}
        />
        <Select
            placeholder={this.state.selectedFontSize}
            value={this.selectedFontSize}
            onChange={this.handleFontSizeChange}
            options={fontSizeOptions}
        />
      </div>
    )
  }
}
export default Dropdown;