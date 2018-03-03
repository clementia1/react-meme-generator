import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown';
import customizeControls from '../fabricjs/customizeControls';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';
import Brush from './Brush';

class Strip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            isAddBlockOpened: false,
            isAddBlockOpenedBrush: false,
            isDrawingModeOn: false,
        };
        this.toggleAddCard = this.toggleAddCard.bind(this);
        this.toggleDrawMode = this.toggleDrawMode.bind(this);
    }
    
    onDownload() {
        let { canvas } = this.state;
        canvas.deactivateAll().renderAll();
        let link = this.downloadLink;
        link.setAttribute('href', canvas.toDataURL());
        link.setAttribute('download', 'random-meme-you-just-made' + '.png');
        link.click();
    }
    onEffect(effect) {
        let { canvas } = this.state;
        canvas.deactivateAll();
        let overlayImageUrl = canvas.toDataURL('png');
        let imageDOM = ReactDOM.findDOMNode(this.imageBuffer);
        imageDOM.setAttribute('src', overlayImageUrl);
        imageDOM.setAttribute('crossOrigin', 'anonymous');
        let filterImageUrl = imageDOM.getAttribute('src');
        // patch fabric for cross domain image jazz

        fabric.Image.fromURL(filterImageUrl, function (img) {
            switch (effect) {
                case 'grayscale':
                    img.filters.push(new fabric.Image.filters.Grayscale());
                    break;
                case 'invert':
                    img.filters.push(new fabric.Image.filters.Invert());
                    break;
            }
            img.applyFilters(canvas.renderAll.bind(canvas));
            canvas.add(img);
        }, {
                crossOrigin: 'anonymous'
            });
        canvas.deactivateAll().renderAll();
    }
    
    fitToObjectWidth() {        
        let { canvas } = this.state;
        if (canvas.getActiveObject()) {
            let activeObjWidth = canvas.getActiveObject().getWidth();
            canvas.item(0).setWidth(activeObjWidth, { backstoreOnly: true });
            canvas.item(0).setWidth(activeObjWidth, { cssOnly: true }).sendToBack();
            canvas.setWidth(activeObjWidth, { backstoreOnly: true });
            canvas.setWidth(activeObjWidth, { cssOnly: true });
            canvas.getActiveObject().center().setCoords();
        }
    }
    
    fitToObjectHeight() { 
        let { canvas } = this.state;
        if (canvas.getActiveObject()) {
            let activeObjHeight = canvas.getActiveObject().getHeight();
            canvas.item(0).setHeight(activeObjHeight, { backstoreOnly: true });
            canvas.item(0).setHeight(activeObjHeight, { cssOnly: true }).sendToBack();
            canvas.setHeight(activeObjHeight, { backstoreOnly: true });
            canvas.setHeight(activeObjHeight, { cssOnly: true });
            canvas.getActiveObject().center().setCoords();
        }     
    }
    
    sendActiveObjectBackwards() {
        let { canvas } = this.state;
        let activeObj = canvas.getActiveObject();
        canvas.sendBackwards(activeObj);
        canvas.renderAll();
    }
    
    componentDidMount() {
        this.props.onRef(this);
        let canvas = new fabric.Canvas('canvas', {
            preserveObjectStacking: true,
            backgroundColor : "white"});
        customizeControls(canvas);

        let { padding, width, height, fill, stroke, fontFamily, strokeWidth, fontSize } = this.props;

        let text = new fabric.IText('Type your text', {
            name: 'sampleText',
            top: padding + 20,
            left: width / 2,
            originX: 'center',
            textAlign: 'center',
            fontSize: 26,
            fontWeight: 'bold',
            fontFamily: fontFamily
        });
        canvas.add(text);

        canvas.on("object:selected", function(options) {
            options.target.bringToFront();
        });
        
        this.setState({ canvas });
    }

    componentDidUpdate() {
        let { canvas } = this.state;
        canvas.renderAll();
        componentHandler.upgradeDom();
    }
    
    componentWillReceiveProps(nextProps) {
        let { canvas } = this.state;
        
        if (nextProps.image !== this.props.image || nextProps.imageCount !== this.props.imageCount) {
            fabric.Image.fromURL(nextProps.image, function (oImg) {
                oImg.scaleToWidth(0.3 * canvas.getWidth());
                canvas.add(oImg);
            });
        }        
        console.log(canvas.item(0), canvas.item(1));
        if (nextProps.width !== this.props.width) {
            canvas.setWidth(nextProps.width, { backstoreOnly: true });
            canvas.setWidth(nextProps.width, { cssOnly: true });            
        }
        if (nextProps.height !== this.props.height) {
            canvas.setHeight(nextProps.height, { backstoreOnly: true });
            canvas.setHeight(nextProps.height, { cssOnly: true });
        }
        canvas.backgroundColor = nextProps.canvasbgcolor;
        canvas.renderAll();
    }

    componentWillUnmount() {
        this.props.onRef(null)
    }
    
    toggleAddCard() {
        this.setState({
            isAddBlockOpened: !this.state.isAddBlockOpened,
        })
    }
    toggleDrawMode() {
        this.setState({
            isAddBlockOpenedBrush: !this.state.isAddBlockOpenedBrush,
            isDrawingModeOn: !this.state.isDrawingModeOn
        })
    }
    render() {
        return (
            <div>
                <canvas id="canvas" {...this.props}></canvas>
                <div className="control-elements">
                    {this.state.isAddBlockOpened ?
                        <div className="control-box text-editor">
                            <Dropdown canvas={this.state.canvas}/>                            
                        </div> : null
                    }
                    {this.state.isAddBlockOpenedBrush ?
                        <div className="control-box draw-mode">
                            <Brush canvas={this.state.canvas} isDrawingModeOn={this.state.isDrawingModeOn}/>                            
                        </div> : null
                    }
                </div>
                <div className="control-buttons"> 
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleAddCard.bind(this)}>Edit Text</button>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleDrawMode.bind(this)}>Draw mode</button>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.onEffect.bind(this, 'grayscale')}>Grayscale</button>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.onEffect.bind(this, 'invert')}>Invert</button>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.onDownload.bind(this)}>Download</button>
                    <img ref={(ref) => this.imageBuffer = ref} crossOrigin="anonymous" src="" style={{ display: 'none' }} />
                    <a ref={(ref) => this.downloadLink = ref} style={{ display: 'none' }}>Download</a>
                </div>
            </div>
        );
    }
};

Strip.defaultProps = {
    width: 500,
    height: 500,
    top: 0,
    left: 0,
    padding: 0,
    column: 2,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 0,
    fontFamily: 'Arial',
    fontSize: 13,
};

export default Strip;