import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import Select from 'react-select';
import { SketchPicker } from 'react-color';

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
            range: '20',
        };
        this.clear = this.clear.bind(this);
        this.AddBrush = this.AddBrush.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.range = this.range.bind(this);
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
    range(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toggleBrushColorPicker = () => {
        this.setState({ displayBrushColorPicker: !this.state.displayColorPicker })
    };
    handleChangeBrushColor = (color) => {
        this.setState({ brushColor: color.hex });
    };
    handleCloseBrushColorPicker = () => {
        this.setState({ displayBrushColorPicker: false })
    };
    render() {
        const popover = {
          position: 'absolute',
          zIndex: '2',
        }
        const cover = {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }
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
                    { this.state.displayBrushColorPicker ? <div style={ popover }>
                      <div style={ cover } onClick={ this.handleCloseBrushColorPicker }/>
                      <SketchPicker color={ this.state.brushColor } onChangeComplete={ this.handleChangeBrushColor }/>
                    </div> : null }
                </div>
                <div className="controlpanel-item"><button onClick={ this.toggleBrushColorPicker }>Pick Color</button></div>
                <div className="controlpanel-item">
                    <p className="rangeCanvasWidth" id="rangeCanvasWidth">
                        <input name='range' type="range" min="1" max="100" step="1" value={this.state.range} onChange={this.range.bind(this)} className='mdl-slider mdl-js-slider'></input>
                    </p>
                </div>                
                <div className="controlpanel-item"><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.clear}>Clear all</button></div>
            </div>
        )
    }
}
export default Brush;
