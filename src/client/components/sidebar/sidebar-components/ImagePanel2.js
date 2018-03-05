import React from 'react';
import axios from 'axios';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min.js';

class ImagePanel2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }
    componentWillMount() {
            axios.get('/api/getimages/?dir=/memes/pepe').then((response) => {
                this.setState({images: response.data})
            })
    }
    render() {        
        return (
            <div>
                <div className="mdl-grid sidebar-panel">
                        {
                            this.state.images.map((item, index) => {
                                return <div key={index} className="mdl-cell mdl-cell--3-col mdl-cell--3-col-tablet mdl-cell--1-col-phone mdl-shadow--2dp imgBox" onClick={this.props.addImage}><img src={"images/memes/pepe/" + item}/></div>
                            })
                        }
                </div>
            </div>
        );
    }
}

export default ImagePanel2;