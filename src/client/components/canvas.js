import React from 'react';
import { Strip, Panel, Character, Balloon } from './comic';



class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<Strip image={this.props.image} width={this.props.width} title={this.props.title} column="1">
			<Panel width={this.props.width}>

			</Panel>
		</Strip>
    );
  }
}

                /*{ 
                this.props.characters.map((character) => {
                    return <Character image={character.image}>
                              <Balloon text="javascript... i like it"/>
                           </Character>
                    })
                }*/

export default Canvas;