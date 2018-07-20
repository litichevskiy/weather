const pubsub = new ( require('../utils/pubSub') );
const InputSearch = require('./InputSearch');
const ButtonImg = require('./ButtonImg');
const serverApi = require('../serverApi');
const Preloader = require('./Preloader');
const ESC = 27;// keyCode;

class BlockSearch {
  constructor( data ) {
    this.container = data.container;
    this.disabledBlockSearch = this.disabledBlockSearch.bind( this );
    this.enabledBlockSearch = this.enabledBlockSearch.bind( this );
    this.newSubstring = this.newSubstring.bind( this );
    this.checkKeyCode = this.checkKeyCode.bind( this );
    this.enabledPreload = this.enabledPreload.bind( this );
    this.disabledPreload = this.disabledPreload.bind( this );
    pubsub.subscribe('hide-block-search', this.disabledBlockSearch);
    pubsub.subscribe('show-block-search', this.enabledBlockSearch);
    pubsub.subscribe('start-load-list-sities', this.enabledPreload);
    pubsub.subscribe('stop-load-list-sities', this.disabledPreload);

    this.inputSearch = new InputSearch({
      parent: this.container.querySelector('.containerSearch'),
      inputHandler: this.newSubstring,
    });
    this.preload = new Preloader({
      parent: this.container.querySelector('.containerListSities'),
    });
    new ButtonImg({
      parent: this.container.querySelector('.wrapper'),
      className: 'btnBack',
      name: 'back',
      handlerClick: this.closeBlock,
    });
  }

  enabledPreload() {
    this.preload.enabled();
  }

  disabledPreload() {
    this.preload.disabled();
  }

  closeBlock() {
    pubsub.publish('clicked-close-block-search');
  }

  disabledBlockSearch() {
    this.container.classList.add('disabled');
    document.removeEventListener('keydown', this.checkKeyCode );
    this.inputSearch.disabled();
  }

  enabledBlockSearch() {
    this.container.classList.remove('disabled');
    document.addEventListener('keydown', this.checkKeyCode );
    this.inputSearch.setFocus();
  }

  checkKeyCode( event ) {
    if ( event.keyCode === ESC ) this.closeBlock();
  }

  newSubstring( event ) {
    let substring = event.target.value;
    substring = substring.trim();
    pubsub.publish('new-substring-on-search-cityes', { key:substring });
  }
}

module.exports = BlockSearch;