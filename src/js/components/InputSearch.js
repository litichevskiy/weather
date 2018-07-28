const ButtonImg = require('./ButtonImg');
const pubsub = new ( require('../utils/pubSub') );

class InputSearch {
  constructor( data ) {
    let wrapper = this.createInput();
    this.input = wrapper.querySelector('.inputSearch');
    data.parent.appendChild( wrapper );
    this.clearInput = this.clearInput.bind( this );
    this.close = new ButtonImg({
      parent: wrapper,
      className: 'buttonClear',
      name: 'cancel',
      handlerClick: this.clearInput,
    });
    this.input.addEventListener('input', data.inputHandler);
  }

  createInput() {
    let div = document.createElement('div');
    let input = document.createElement('input');
    div.appendChild( input );
    div.className = 'containerInput';
    input.className = 'inputSearch';
    input.setAttribute('type', 'text');
    input.setAttribute('aria-label', 'search city');
    input.setAttribute('placeholder', 'City name');
    return div;
  }

  clearInput() {
    if( !this.input.value ) return this.setFocus();
    this.input.value = '';
    this.setFocus();
    pubsub.publish('input-searh-cleared');
  }

  disabled() {
    this.input.value = '';
    this.input.blur();
  }

  setFocus() {
    this.input.focus();
  }
};

module.exports = InputSearch;