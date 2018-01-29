import React from 'react';
import { Strip, Panel, Character, Balloon } from 'react-komik';



class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<Strip title="Your title here" column="1">
			<Panel>
				<Character
					image={this.props.char1}>
					<Balloon 
						text="Reactify Comic!" />
				</Character>
			</Panel>
		</Strip>
    );
  }
}

export default Canvas;