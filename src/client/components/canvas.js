import React from 'react';
import { Strip, Panel, Character, Balloon } from './comic';



class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<Strip {...this.props}>
			<Panel width={this.props.width}>
			</Panel> 
		</Strip>
    );
  }
}


export default Canvas;