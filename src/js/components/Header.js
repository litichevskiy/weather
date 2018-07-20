const pubsub = new ( require('../utils/pubSub') );
const ButtonImg = require('./ButtonImg');

class Header {
  constructor( data ) {
    this.container = data.container;
    let wrapper = this.container.querySelector('.wrapperButtons');
    this.cancelUpdated = this.cancelUpdated.bind( this );
    this.updateCard = this.updateCard.bind( this );
    this.startUpdated = this.startUpdated.bind( this );
    pubsub.subscribe('end-updated-all-weather-card', this.cancelUpdated);
    pubsub.subscribe('start-updated-all-weather-card', this.startUpdated);

    this.btnUpdate = new ButtonImg({
      parent: wrapper,
      className: 'updateCard',
      name: 'refresh',
      title: 'Update weather',
      handlerClick: this.updateCard,
    });

    new ButtonImg({
      parent: wrapper,
      name: 'plus',
      className: 'addCard',
      title: 'Add city',
      handlerClick: this.addCard,
    });
  }

  addCard( event ) {
    pubsub.publish('add-card-weather');
  }

  updateCard( event ) {
    pubsub.publish('update-all-weather-card');
  }

  cancelUpdated() {
    this.btnUpdate.btn.classList.remove('activeUpdate');
  }

  startUpdated() {
    this.btnUpdate.btn.classList.add('activeUpdate');
  }
};

module.exports = Header;