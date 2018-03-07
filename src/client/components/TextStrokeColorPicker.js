import React from 'react';
import { ChromePicker } from 'react-color';

class TextStrokeColorPicker extends React.Component {
  state = {    
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
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
    return (
      <div>
        <button id="stroke-color" className="mdl-button mdl-js-button mdl-button--fab" onClick={ this.handleClick }>
            <i className="material-icons">border_color</i>
        </button>
        <div className="mdl-tooltip" htmlFor="stroke-color">
            Text outline color
        </div>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <ChromePicker
            color={this.props.strokeColor}
            onChangeComplete={ this.props.handleChangeComplete }
          />
        </div> : null }
      </div>
    )
  }
}

export default TextStrokeColorPicker;