import React from 'react';
import { ChromePicker } from 'react-color';

class BrushColorPicker extends React.Component {
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
        <button id="brush-color-picker" className="mdl-button mdl-js-button mdl-button--fab" onClick={ this.handleClick }>
            <i className="material-icons">brush</i>
        </button>
        <div className="mdl-tooltip" htmlFor="brush-color-picker">
            Brush color
        </div>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <ChromePicker
            color={this.props.color}
            onChangeComplete={ this.props.handleChangeBrushColor }
          />
        </div> : null }
      </div>
    )
  }
}

export default BrushColorPicker;