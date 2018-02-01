import React from 'react';
import { Strip, Panel, Character, Balloon } from './comic';



class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<Strip title="Your title here" column="1">
			<Panel>
                { 
                this.props.characters.map((character) => {
                    return <Character image={character.image}>
                              <Balloon text="Reactify Comic!"/>
                           </Character>
                    })
                }
			</Panel>
		</Strip>
    );
  }
}

export default Canvas;