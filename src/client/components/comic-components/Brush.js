import React from 'react';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';


class Brush extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#000000',
            drawingMode: 'Pencil',
            width: 10,
            drowingMode: true,
            mode: ['Pencil', 'Circle', 'Spray', 'Pattern'],
            selectedMode: 'Pencil',
            range: '20',
        };
        this.clear = this.clear.bind(this);
        this.AddBrush = this.AddBrush.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.range = this.range.bind(this);
        this.toggleDraw = this.toggleDraw.bind(this);
    }
    clear() {
        let { canvas } = this.props;
        canvas.clear()
    }
    componentDidUpdate() {
        this.AddBrush();
    }

    AddBrush() {
        console.log(this.state.range);
        let { canvas } = this.props;
        canvas.isDrawingMode = this.state.drowingMode;
        canvas.freeDrawingBrush = new fabric[this.state.selectedMode + 'Brush'](canvas);
        if (this.state.selectedMode == 'Circle') {
            canvas.freeDrawingBrush.width = this.state.range / 150;
        } else {
            canvas.freeDrawingBrush.width = this.state.range;
        }
        canvas.freeDrawingBrush.color = this.state.color;

    }
    changeMode(e) {
        this.setState({
            selectedMode: e.target.value
        })
    }
    range(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toggleDraw() {
        this.setState({
            drowingMode: !this.state.drowingMode
        })
    }
    render() {
        return (
            <div>
                <label >Mode:</label>
                <select onChange={this.changeMode} value={this.state.selectedMode}>
                    {this.state.mode.map((item, index) => {
                        return <option key={index} value={item} >{item}</option>
                    })}    </select>
                <label >Range:</label>
                <p className="rangeCanvasWidth" id="rangeCanvasWidth">
                    <input name='range' type="range" min="1" max="100" step="1" value={this.state.range} onChange={this.range.bind(this)} className='mdl-slider mdl-js-slider'></input>
                </p>
                
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.clear}>СТЕРЕТЬ ВСЕ</button>
                <label >Color:</label>
                <input name='color' type="color" value={this.state.color} onChange={this.range.bind(this)}></input>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">начинаем рисовать
                <input type="checkbox" className="mdl-checkbox__input" onClick={this.toggleDraw}></input>
                </label>
            </div>
        )
    }
}
export default Brush;
