import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import Select from 'react-select';
import { SketchPicker } from 'react-color';
import BrushColorPicker from '../BrushColorPicker';

class Brush extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayBrushColorPicker: false,
            brushColor: '#000000',
            drawingMode: 'Pencil',
            width: 10,
            mode: ['Pencil', 'Circle', 'Spray', 'Pattern'],
            selectedMode: 'Pencil',
            range: 20,
        };
        this.clear = this.clear.bind(this);
        this.AddBrush = this.AddBrush.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }
    clear() {
        let { canvas } = this.props;
        canvas.clear()
    }
    componentDidMount() {
        this.AddBrush();
    }
    componentDidUpdate() {
        this.AddBrush();
    }
    componentWillUnmount() {
        let { canvas } = this.props;
        canvas.isDrawingMode = false;
    }

    AddBrush() {
        let { canvas } = this.props;
        canvas.isDrawingMode = this.props.isDrawingModeOn;
        canvas.freeDrawingBrush = new fabric[this.state.selectedMode + 'Brush'](canvas);
        if (this.state.selectedMode == 'Circle') {
            canvas.freeDrawingBrush.width = this.state.range / 150;
        } else {
            canvas.freeDrawingBrush.width = this.state.range;
        }
        canvas.freeDrawingBrush.color = this.state.brushColor;
    }
    changeMode(selectedMode) {
        this.setState({selectedMode: selectedMode.value})
    }
    range = (e) => {
        this.setState({range: e.target.value})
    }
    handleChangeBrushColor = (color) => {
        this.setState({ brushColor: color.hex });
    };

    render() {
        let brushMode = this.state.mode.map((item) => {
            return item = { 'value': item, 'label': item }
        });
        return (
            <div className="draw-mode-panel">                
                <div className="controlpanel-item">
                    <Select className="brush-mode-select"
                        placeholder={this.state.selectedMode}
                        value={this.selectedMode}
                        onChange={this.changeMode}
                        options={brushMode}
                    />
                </div> 
                <div className="controlpanel-item">
                    <BrushColorPicker color={this.state.brushColor} handleChangeBrushColor={this.handleChangeBrushColor}/>
                </div>                
                <div className="controlpanel-item">
                    <p className="rangeCanvasWidth" id="rangeCanvasWidth">
                        <input name='range' type="range" min="1" max="100" step="1" value={this.state.range} onChange={this.range} className='mdl-slider mdl-js-slider'></input>
                    </p>
                </div>                
                <div className="controlpanel-item"><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.clear}>Clear all</button></div>
            </div>
        )
    }
}
export default Brush;
