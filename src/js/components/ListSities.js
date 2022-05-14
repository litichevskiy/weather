const pubsub = new ( require('../utils/pubSub') );
const SelectItemList = require('../utils/SelectItemList');

class ListSities {
  constructor( data ) {
    this.container = data.container;
    this.selectedCity = this.selectedCity.bind( this );
    this.createListCityes = this.createListCityes.bind( this );
    pubsub.subscribe('create-list-cityes', this.createListCityes );
    this.container.addEventListener('click', this.selectedCity);

    this.selectItemList = new SelectItemList({
      list: this.container,
      selectHandler: this.selectedCity,
    });
  }

  createListCityes( list ) {
    list = list || [];

    let result = list.reduce( ( previousItem, item, index ) => {
      previousItem += `
      <li
        class="itemListSities"
        data-index=${index}
        data-full-name="${item.matching_full_name}">
        ${item.matching_full_name}
      </li>`;
      return previousItem;
    }, '');
    this.container.innerHTML = result;
    if( list.length >= 1 ) this.selectItemList.enabled();
  }

  selectedCity( event ) {
    this.selectItemList.disabled();
    pubsub.publish('selected-city', { index: event.target.getAttribute('data-index') });
  }
};

module.exports = ListSities;