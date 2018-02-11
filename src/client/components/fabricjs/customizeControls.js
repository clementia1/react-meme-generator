function customizeControls(canvas) {
    
    var DIMICON = 15;
    var dataImage = [            
            "http://localhost:3000/upload/remove.svg", /*delete*/
          ];
          //********override*****//
          fabric.Object.prototype._drawControl = function(control, ctx, methodName, left, top) {
            if (!this.isControlVisible(control)) {
              return;
            }
            var SelectedIconImage = new Image();
            var size = this.cornerSize;
            /*  fabric.isVML() ||*/
            this.transparentCorners || ctx.clearRect(left, top, size, size);
            switch (control) {
              case 'tl':
                //*delete*
                SelectedIconImage.src = dataImage[0];
                break;
              /*case 'tr':
                //*scale*
                SelectedIconImage.src = dataImage[1];
                break;
              case 'bl':
                //*scale*
                SelectedIconImage.src = dataImage[2];
                break;
              case 'br':
                //*rotate*
                SelectedIconImage.src = dataImage[3];
                break;*/
              default:
                ctx[methodName](left, top, size, size);
            }
          
            if (control == 'tl' || control == 'tr' || control == 'bl' || control == 'br') {
              try {
                ctx.drawImage(SelectedIconImage, left, top, DIMICON, DIMICON);
              } catch (e) {
                ctx[methodName](left, top, size, size);
              }
            }
          }
          
          //override prorotype _setCornerCursor to change the corner cusrors

          fabric.Canvas.prototype._setCornerCursor = function (corner, target) {
              if (corner === 'tl') {
                  this.setCursor('pointer');
              } else if (corner === "bl") {
                  this.setCursor('sw-resize');
              } else if (corner === "br") {
                  this.setCursor('se-resize');
              } else if (corner === "mb") {
                  this.setCursor('s-resize');
              } else if (corner === "ml") {
                  this.setCursor('w-resize');
              } else if (corner === "mr") {
                  this.setCursor('e-resize');
              } else if (corner === "mt") {
                  this.setCursor('n-resize');
              } else if (corner === "tr") {
                  this.setCursor('ne-resize');
              } else if (corner === 'mtr' && target.hasRotatingPoint) {
                  this.setCursor(this.rotationCursor);
              } else {
                  this.setCursor(this.defaultCursor);
                  return false;
              }
          };
    
          fabric.Canvas.prototype._getActionFromCorner = function(target, corner) {
            var action = 'drag';
            if (corner) {
              switch (corner) {
                case 'ml':
                case 'mr':
                  action = 'scaleX';
                  break;
                case 'mt':
                case 'mb':
                  action = 'scaleY';
                  break;
                case 'mtr':
                  action = 'rotate';
                  break;
                  /*//**ADD **
                case 'br':
                  action = 'rotate';
                  break;*/
                case 'tl': //delete function if mouse down
                  action = 'delete';
                  canvas.remove(canvas.getActiveObject());
                  break;
                  /**ADD END**/
                default:
                  action = 'scale';
              }
              return action;
            }
          }
          
          fabric.Canvas.prototype.getItemByName = function(name) {
            var object = null,
                objects = this.getObjects();
          
            for (var i = 0, len = this.size(); i < len; i++) {
              if (objects[i].name && objects[i].name === name) {
                object = objects[i];
                break;
              }
            }
          
            return object;
          };
          /*fabric.Canvas.prototype._performTransformAction = function(e, transform, pointer) {
              var x = pointer.x,
                y = pointer.y,
                target = transform.target,
                action = transform.action;
          
              if (action === 'rotate') {
                this._rotateObject(x, y);
                this._fire('rotating', target, e);
              } else if (action === 'scale') {
                this._onScale(e, transform, x, y);
                this._fire('scaling', target, e);
              } else if (action === 'scaleX') {
                this._scaleObject(x, y, 'x');
                this._fire('scaling', target, e);
              } else if (action === 'scaleY') {
                this._scaleObject(x, y, 'y');
                this._fire('scaling', target, e);
              }
              //**ADD**
              else if (action === 'delete') {
                //do nothing, because here function executed when mouse moves
              }
              //**ADD END**
              else {
                this._translateObject(x, y);
                this._fire('moving', target, e);
                this.setCursor(this.moveCursor);
              }
            }*/
}

export default customizeControls;