const getParentNode = require('../utils/getParentNode');
const pubsub = new ( require('../utils/pubSub') );
const ButtonImg = require('./ButtonImg');
const Swipedetect = require('../utils/Swipedetect');
const ESC = 27;// keyCode
const ANIMATION_TIME = 200;// ms

class Menu {
  constructor( data ) {
    this.container = data.container;
    this.active = 0;
    this.openMenu = this.openMenu.bind( this );
    this.closeMenu = this.closeMenu.bind( this );
    this.saveSettings = this.saveSettings.bind( this );
    this.setCurrentValue = this.setCurrentValue.bind( this );
    this.checkKeyCode = this.checkKeyCode.bind( this );
    this.swipedMove = this.swipedMove.bind( this );
    this.swipedEnd = this.swipedEnd.bind( this );
    pubsub.subscribe('open-settings', this.openMenu );
    pubsub.subscribe('close-menu', this.closeMenu );
    pubsub.subscribe('set-current-settings', this.setCurrentValue );
    new ButtonImg({
      parent: this.container.querySelector('.headerMenu'),
      name: 'back',
      className: 'cancel',
      title: 'Close',
      handlerClick: this.closeMenu,
    });

    new Swipedetect({
      container: this.container,
      swipedMove: this.swipedMove,
      swipedEnd: this.swipedEnd,
    });

    data.form.addEventListener('click', this.saveSettings);
  }

  closeMenu() {
    setTimeout(() => {
      this.container.classList.remove('enabled');
      this.container.classList.remove('disabled');
    }, ANIMATION_TIME);
    this.container.classList.add('disabled');
    document.removeEventListener('keydown', this.checkKeyCode );
  }

  openMenu() {
    this.container.classList.add('enabled');
    document.addEventListener('keydown', this.checkKeyCode );
  }

  saveSettings ( event ){
    let target = event.target;
    if( target.tagName !== 'INPUT' ) return;
    pubsub.publish('new-settings', {key: target.name, value: target.value});
  }

  setCurrentValue( data ) {
    let settings = data.settings;
    let item;
    let key;
    for( key in settings ) {
      item = this.container.querySelector(`input[value="${settings[key]}"]`);
      if( item ) item.checked = true;
    };
  }

  checkKeyCode( event ) {
    if ( event.keyCode === ESC ) this.closeMenu();
  }

  swipedMove( direction, pageX, target ) {
    let _pageX = ( pageX < 0 ) ? -pageX : pageX;
    if( _pageX < 20 ) return;

    if( direction === 'right' ) this.openMenu();
    else this.closeMenu();
  }

  swipedEnd( target, pageX ) {}
}

module.exports = Menu;