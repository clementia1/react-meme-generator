import React from 'react';
import { ChromePicker } from 'react-color';

class TextBgColorPicker extends React.Component {
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
        <button id="text-bg-color" className="mdl-button mdl-js-button mdl-button--fab" onClick={ this.handleClick }>
            <i className="material-icons">format_color_fill</i>
        </button>
        <div className="mdl-tooltip" htmlFor="text-bg-color">
            Choose text background color
        </div>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <ChromePicker
            color={this.props.bgColor}
            onChangeComplete={ this.props.handleChangeComplete }
          />
        </div> : null }
      </div>
    )
  }
}

export default TextBgColorPicker;