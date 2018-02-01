import React from 'react';


class hovering extends React.Component {
    constructor(props) {
     super(props);
     this.state = {image: ''};
 
   }

(function() {
    var canvas = this.__canvas = new fabric.Canvas('c');
    fabric.Object.prototype.transparentCorners = false;
  
    canvas.on('mouse:over', function(e) {
      e.target.set('fill', 'red');
      canvas.renderAll();
    });
  
    canvas.on('mouse:out', function(e) {
      e.target.set('fill', 'green');
      canvas.renderAll();
    });
  
    // add random objects
    for (var i = 15; i--; ) {
      var dim = fabric.util.getRandomInt(30, 60);
      var klass = ['Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0,2)];
      var options = {
        top: fabric.util.getRandomInt(0, 600),
        left: fabric.util.getRandomInt(0, 600),
        fill: 'green'
      };
      if (klass === 'Circle') {
        options.radius = dim;
      }
      else {
        options.width = dim;
        options.height = dim;
      }
      canvas.add(new fabric[klass](options));
    }
  })();

  export default App;