const pubsub = new ( require('../utils/pubSub') );
const ButtonImg = require('./ButtonImg');
const ESC = 27; //key code
const TIME_HIDE_MESSAGE = 5000; //ms

class Message {
  constructor( data ) {
    this.container = data.container;
    this.message = this.container.querySelector('.message');
    this.deleteMessage = this.deleteMessage.bind( this );
    this.showMessage = this.showMessage.bind( this );
    this.checkKeyCode = this.checkKeyCode.bind( this );
    this.close = new ButtonImg({
      parent: this.container,
      className: 'deleteMessage',
      name: 'cancel',
      handlerClick: this.deleteMessage,
    });
    pubsub.subscribe('show-message', this.showMessage);
  }

  showMessage( data ) {
    this.message.innerHTML = data.message;
    this.container.classList.add('active');
    setTimeout(() => this.hideMessage(), TIME_HIDE_MESSAGE);
    document.addEventListener('keydown', this.checkKeyCode );
  }

  hideMessage() {
    document.removeEventListener('keydown', this.checkKeyCode );
    this.container.classList.remove('active');
    this.message.innerHTML = '';
  }

  deleteMessage() {
    this.hideMessage();
  }

  checkKeyCode( event ) {
    if( event.keyCode === ESC ) this.hideMessage();
  }
};

module.exports = Message;