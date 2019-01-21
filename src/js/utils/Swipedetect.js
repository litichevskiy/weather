const pubsub = new( require('./pubSub') );
const INCLINE = 60; //px

class Swipedetect{
  constructor( data ) {
    this.container = data.container;
    this.init( data.swipedMove, data.swipedEnd );
  }

  init( swipedMove, swipedEnd ) {
    let startX = 0;
    let startY = 0;
    let deltaY = 0;
    let deltaX = 0;
    let touches;
    this.container.addEventListener('touchstart', ( event ) => {
      touches = event.changedTouches[0];
      startX = touches.pageX;
      startY = touches.pageY;
    }, { passive: true });

    this.container.addEventListener('touchmove', ( event ) => {
      touches = event.changedTouches[0];
      deltaY = touches.pageY - startY;
      deltaX = touches.pageX - startX;
      deltaY = -deltaY;

      if( deltaY > 100 ) return
      if( touches.pageX > startX ) swipedMove('right', deltaX, event.target );
      else swipedMove('left', deltaX, event.target);
    }, { passive: true });

    this.container.addEventListener('touchend', ( event ) => {
      touches = event.changedTouches[0];
      deltaX = touches.pageX - startX;
      swipedEnd( event.target, deltaX );
    });
  }
};

module.exports = Swipedetect;