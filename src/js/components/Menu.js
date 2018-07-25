const pubsub = new ( require('../utils/pubSub') );
const ButtonImg = require('./ButtonImg');

class Menu {
  constructor( data ) {
    this.container = data.container;
    this.openMenu = this.openMenu.bind( this );
    this.closeMenu = this.closeMenu.bind( this );
    this.saveSettings = this.saveSettings.bind( this );
    this.setCurrentValue = this.setCurrentValue.bind( this );
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
    data.form.addEventListener('submit', this.saveSettings);
  }

  closeMenu() {
    this.container.classList.remove('enabled');
  }

  openMenu() {
    this.container.classList.add('enabled');
  }

  saveSettings ( event ){
    event.preventDefault();
    let settings = [...event.target.querySelectorAll('input:checked')];
    settings = settings.reduce( ( data, item ) => {
      data[item.name] = item.value;
      return data;
    }, {});
    pubsub.publish('new-settings', settings);
    this.closeMenu();
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
}

module.exports = Menu;