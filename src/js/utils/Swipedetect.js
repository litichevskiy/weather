const pubsub = new( require('./pubSub') );
const INCLINE = 60; //px

class Swipedetect{
  constructor( data ) {
    this.container = data.container;
    this.swipedetect = this.swipedetect.bind( this );
    this.init( this.container, this.swipedetect );
  }

  init() {
    let startX = 0;
    let startY = 0;
    let deltaY = 0;
    let result = 0;
    let touches;
    this.container.addEventListener('touchstart', ( event ) => {
      touches = event.changedTouches[0];
      startX = touches.pageX;
      startY = touches.pageY;
    });

    this.container.addEventListener('touchend', ( event ) => {
      touches = event.changedTouches[0];
      deltaY = touches.pageY - startY;
      result = touches.pageX - startX;
      if( deltaY < 0 ) deltaY = -deltaY;
      if( deltaY < INCLINE ) {
        if( result <= -1 ) this.swipedetect('left');
          else if( result >= 1 ) this.swipedetect('right');
      }
    });
  }

  swipedetect( direction ) {
    pubsub.publish('swipe-detect', direction );
  }
};

module.exports = Swipedetect;