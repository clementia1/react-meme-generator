import React from 'react';
import Select from 'react-select';
import TextColorPicker from '../TextColorPicker';
import TextBgColorPicker from '../TextBgColorPicker';
import TextStrokeColorPicker from '../TextStrokeColorPicker';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import 'react-select/dist/react-select.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      color: '#000000',
      bgColor: '#000000',
      strokeColor: '#000000',
      textStrokeWidth: 1, 
      font: ['Arial', 'Sherwood', 'Geneva', 'Verdana', 'Monaco', 'Myriad Pro', 'Lucida Grande', 'Ubuntu', 'Impact', 'Times New Roman', 'Georgia', 'Gothic', 'Pacifico', 'Vollkorn SC', 'Pangolin', 'Play', 'Roboto', 'Lobster', 'Cormorant Infant'],
      selectedFont: "Arial",
      selectedFontSize: 12,
      size: [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 72],
      fontWeight: "normal",
      activ: false,      
      currentControlItem: ''
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
        hasRotatingPoint: true
      });
      canvas.add(textSample);
      }
  }

  componentDidUpdate(prevProps, prevState) {
    let { canvas } = this.props;
    let activObj = canvas.getActiveObject();
    // if activeObject is a text - changing it

    if (activObj && activObj.setText && activObj.isEditing && activObj.getSelectionStyles) {
      activObj.dirty = true;
      switch (this.state.currentControlItem) {
        case 'color':
          activObj.setSelectionStyles({fill: this.state.color}).setCoords();
          break;
        case 'bgColor':
          activObj.setSelectionStyles({textBackgroundColor: this.state.bgColor}).setCoords();
          break;
        case 'strokeColor':
          activObj.setSelectionStyles({stroke: this.state.strokeColor}).setCoords();
          break;
        case 'strokeWidth':
          activObj.setSelectionStyles({strokeWidth: +this.state.textStrokeWidth}).setCoords();
          break;
        case 'selectedFont':
          activObj.setSelectionStyles({fontFamily: this.state.selectedFont}).setCoords();
          break;
        case 'selectedFontSize':
          activObj.setSelectionStyles({fontSize: this.state.selectedFontSize}).setCoords();
          break;
      }
      canvas.renderAll();
    }     
  }  

  changeTextarea(e) {
    this.setState({
      text: e.target.value
    })
  }
  changeTextareaColor = (color) => {
    this.setState({color: color.hex})
  }
  changeBgColor = (color) => {
    this.setState({bgColor: color.hex})
  }
  changeStrokeColor = (color) => {
    this.setState({strokeColor: color.hex})
  }
  handleFontSizeChange = (selectedFontSize) => {
    this.setState({ selectedFontSize: selectedFontSize.value});
  }
  
  handleFontFamilyChange = (selectedFont) => {
    this.setState({ selectedFont: selectedFont.value});
  }

  handleControlItemFocus = (e, name) => {
    this.setState({ currentControlItem: e.target.name === '' ? name : e.target.name});
  }
  handleStrokeWidthChange = (e) => {
    this.setState({textStrokeWidth: e.target.value})
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
      <div className="text-editor-panel">        
        <div class="mdl-textfield mdl-js-textfield texteditor-textarea-container">
            <textarea class="mdl-textfield__input texteditor-textarea" type="text" rows= "3" id="create-text" onChange={this.changeTextarea}></textarea>
            <label class="mdl-textfield__label" for="create-text">Text</label>
        </div>
        <div className="controlpanel-item"><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.AddText}>Add text</button></div>
        <div className="controlpanel-item" onFocus={(e) => this.handleControlItemFocus(e, "color")}>
            <TextColorPicker color={this.state.color} handleChangeComplete={this.changeTextareaColor}/>
        </div>
        <div className="controlpanel-item" onFocus={(e) => this.handleControlItemFocus(e, "bgColor")}>
            <TextBgColorPicker bgColor={this.state.bgColor} handleChangeComplete={this.changeBgColor}/>
        </div>
        <div className="controlpanel-item" onFocus={(e) => this.handleControlItemFocus(e, "strokeColor")}>
            <TextStrokeColorPicker strokeColor={this.state.strokeColor} handleChangeComplete={this.changeStrokeColor}/>
        </div>
        <div className="controlpanel-item">
            <Select className="font-family-select"
                placeholder={this.state.selectedFont}
                value={this.selectedFont}
                onChange={this.handleFontFamilyChange}
                onFocus={(e) => this.handleControlItemFocus(e, "selectedFont")}
                options={fontFamilyOptions}
            />
        </div>
        <div className="controlpanel-item">
            <Select
                placeholder={this.state.selectedFontSize}
                value={this.selectedFontSize}
                onChange={this.handleFontSizeChange}
                onFocus={(e) => this.handleControlItemFocus(e, "selectedFontSize")}
                options={fontSizeOptions}
            />
        </div>
        <div className="controlpanel-item" onFocus={(e) => this.handleControlItemFocus(e, "strokeWidth")}>
                    <p className="stroke-width-range" id="stroke-width-range">
                        <input name="strokeWidth" type="range" min="1" max="30" step="1" value={this.state.textStrokeWidth} onChange={this.handleStrokeWidthChange} className='mdl-slider mdl-js-slider'></input>
                    </p>
                    <div className="mdl-tooltip" htmlFor="stroke-width-range">
                        Text outline width
                    </div>
        </div>  
      </div>
    )
  }
}
export default Dropdown;