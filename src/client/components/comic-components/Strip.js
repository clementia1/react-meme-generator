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

        };
        this.toggleAddCard = this.toggleAddCard.bind(this);
        this.toggleAddCardBrush = this.toggleAddCardBrush.bind(this);
    }
    onDownload() {
        var { canvas } = this.state;
        var link = this.downloadLink;
        link.setAttribute('href', canvas.toDataURL());
        link.setAttribute('download', this.props.title + '.png');
        link.click();
    }
    onEffect(effect) {
        var { canvas } = this.state;
        canvas.deactivateAll();
        var overlayImageUrl = canvas.toDataURL('png');
        var imageDOM = ReactDOM.findDOMNode(this.imageBuffer);
        imageDOM.setAttribute('src', overlayImageUrl);
        imageDOM.setAttribute('crossOrigin', 'anonymous');
        var filterImageUrl = imageDOM.getAttribute('src');
        // patch fabric for cross domain image jazz

        fabric.Image.fromURL(filterImageUrl, function (img) {
            switch (effect) {
                case 'grayscale':
                    img.filters.push(new fabric.Image.filters.Grayscale());
                    break;
                case 'sepia':
                    img.filters.push(new fabric.Image.filters.Sepia());
                    break;
                case 'sepia2':
                    img.filters.push(new fabric.Image.filters.Sepia2());
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
    componentDidMount() {
        var canvas = new fabric.Canvas('canvas');
        customizeControls(canvas);

        var { padding, width, height, fill, stroke, fontFamily, strokeWidth, fontSize } = this.props;
        var rect = new fabric.Rect({
            top: padding,
            left: padding,
            width: width - 2 * padding,
            height: height - 2 * padding,
            fill: fill,
            stroke: stroke,
            selectable: false,
            strokeWidth: strokeWidth
        });
        canvas.add(rect);

        var title = this.props.title;
        if (this.props.upperCase) title = title.toUpperCase();

        var text = new fabric.Text(title, {
            name: 'mainTitle',
            top: padding + 20,
            left: width / 2,
            originX: 'center',
            textAlign: 'center',
            fontSize: 26,
            fontWeight: 'bold',
            fontFamily: fontFamily
        });
        canvas.add(text);

        this.setState({ canvas });
    }


    componentWillReceiveProps(nextProps) {
        var { canvas } = this.state;
        console.log(nextProps.imageCount, this.props.imageCount);
        if (nextProps.image !== this.props.image || nextProps.imageCount !== this.props.imageCount) {
            fabric.Image.fromURL(nextProps.image, function (oImg) {
                oImg.scaleToWidth(0.5 * canvas.getWidth());
                canvas.add(oImg);
            });
        }
        console.log(canvas.item(0), canvas.item(1));
        
        canvas.item(0).setWidth(nextProps.width, { backstoreOnly: true });
        canvas.item(0).setWidth(nextProps.width, { cssOnly: true }).sendToBack();
        canvas.setWidth(nextProps.width, { backstoreOnly: true });
        canvas.setWidth(nextProps.width, { cssOnly: true });
        if (canvas.getItemByName('mainTitle')) {
            canvas.getItemByName('mainTitle').setText(nextProps.title).bringToFront();
        } 
        canvas.getItemByName('mainTitle').bringToFront();
    }
    toggleAddCard() {
        this.setState({
            isAddBlockOpened: !this.state.isAddBlockOpened,
        })
    }
    toggleAddCardBrush() {
        this.setState({
            isAddBlockOpenedBrush: !this.state.isAddBlockOpenedBrush,
        })
    }
    render() {
        var _this = this;
        var parentProps = Object.assign({}, _this.props);
        delete parentProps.children;
        var childProps = Object.assign({}, { canvas: _this.state.canvas, parent: parentProps, rootParent: parentProps });
        var childrenWithProps = React.Children.map(this.props.children, function (child, id) {
            var currentProps = Object.assign({}, childProps, { index: id });
            return React.cloneElement(child, currentProps);
        });
        return (
            <div>
                <canvas id="canvas" {...this.props}></canvas>
                {childrenWithProps}
                <div>
                    {this.state.isAddBlockOpened ?
                        <div className="add-card-opened">
                            <Dropdown canvas={this.state.canvas} />
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleAddCard}>Х</button>
                        </div> : <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleAddCard.bind(this)}>добавить текст</button>
                    }
                    {this.state.isAddBlockOpenedBrush ?
                        <div className="add-card-opened">
                            <Brush canvas={this.state.canvas} />
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleAddCardBrush}>Х</button>
                        </div> : <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleAddCardBrush.bind(this)}>РЕЖИМ КИСТЬ</button>
                    }
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.onEffect.bind(this, 'grayscale')}>Grayscale</button>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.onEffect.bind(this, 'sepia')}>Sepia</button>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={this.onEffect.bind(this, 'sepia2')}>Sepia 2</button>
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
    title: 'Comic Title',
    column: 2,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 0,
    fontFamily: 'Arial',
    fontSize: 13,
    upperCase: false
};

export default Strip;