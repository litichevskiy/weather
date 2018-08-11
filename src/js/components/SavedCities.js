const pubsub = new ( require('../utils/pubSub') );
const ButtonImg = require('./ButtonImg');
const Swipedetect = require('../utils/Swipedetect');
const getParentNode = require('../utils/getParentNode');
const TIME_ANIMATION = 250; //ms
const MAX_OFFSET = 60; // percent
const ESC = 27; // keyCode
const store = require('../store');

class SavedCities {
  constructor( data ) {
    this.container = data.container;
    this.listSities = this.container.querySelector('.listSavedCities');
    this.activeItem;
    this.showBlock = this.showBlock.bind( this );
    this.hideBlock = this.hideBlock.bind( this );
    this.swipedEnd = this.swipedEnd.bind( this );
    this.swipedMove = this.swipedMove.bind( this );
    this.checkKeyCode = this.checkKeyCode.bind( this );
    this.createItemList = this.createItemList.bind( this );
    pubsub.subscribe('show-saved-cities', this.showBlock);
    pubsub.subscribe('create-list-saved-sities', this.createItemList );

    new ButtonImg({
      parent: this.container.querySelector('.header .wrapper'),
      className: 'btnBack',
      name: 'back',
      title: '',
      handlerClick: this.hideBlock,
    });

    new Swipedetect({
      container: this.listSities,
      swipedMove: this.swipedMove,
      swipedEnd: this.swipedEnd,
    });

    this.listSities.addEventListener('click', ( event ) => {
      let target = event.target;
      if( target === this.listSities ) return
      if( target.tagName === 'LI' ) {
        this.toggleActiveItem( this.activeItem );
        this.activeItem = target;
        this.toggleActiveItem( this.activeItem );
        pubsub.publish('change-current-city', {id: +target.getAttribute('data-id') });
      }
      else this.deleteItemList( target );
    });
  }

  deleteItemList( target ) {
    target = getParentNode( target, 'LI' );
    pubsub.publish( 'delete-card', { id: +target.getAttribute('data-id') });
    target.classList.add('minHeight');
    this.remove( target, 'minHeight', true );
  }

  swipedMove( direction, pageX, target ) {
    let _pageX = ( pageX < 0 ) ? -pageX : pageX;
    if( _pageX < 20 ) return;

    target.style.transform = `translateZ(0) translateX(${pageX}px)`;
    target.style.opacity = `${1-( getPercent( 1000, _pageX ) / 20 )}`;
  }

  swipedEnd( target, pageX ) {
    if( pageX < 0 ) pageX = -pageX;
    let offset = getPercent( target.clientWidth, pageX );
    if( offset > MAX_OFFSET ) {
      this.deleteItemList( target );
    }
    else {
      target.classList.add('animation');
      target.style.transform = `translateZ(0) translateX(0px)`;
      target.style.opacity = '1';
      this.remove( target, 'animation' );
    }
  }

  remove( el, className, isDelele ) {
    setTimeout(() => {
        el.classList.remove( className );
        if( isDelele ) el.remove();
    }, TIME_ANIMATION );
  }

  showBlock() {
    let target = this.listSities.querySelector(`[data-id="${store.currentCitiId}"]`);
    if( target ) {
      this.activeItem = target;
      this.toggleActiveItem( target );
    }
    this.container.classList.add('enabled');
    document.addEventListener('keydown', this.checkKeyCode );
  }

  hideBlock() {
    if( this.activeItem ) {
      this.toggleActiveItem( this.activeItem );
      this.activeItem = undefined;
    }
    this.container.classList.add('animationOpacity');
    setTimeout(() => {
      this.container.classList.remove('animationOpacity');
      this.container.classList.remove('enabled');
    }, TIME_ANIMATION);
    document.removeEventListener('keydown', this.checkKeyCode );
  }

  createItemList( list ) {
    let location;
    this.listSities.innerHTML += list.reduce( ( total, item ) => {
      location = item.location;
      return total += `<li class="itemListSavedCities" data-id=${item.id}>
        ${location.city} ${location.country} ${location.region}
        <div class="wrapperBtnDel">
          <svg width="25px" height="25px" fill="#1f1d1d" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 774.266 774.266">
            <g>
              <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875    C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916    c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703    c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z     M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282    c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802    H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"/>
              <rect x="475.031" y="286.593" width="48.418" height="396.942"/>
              <rect x="363.361" y="286.593" width="48.418" height="396.942"/>
              <rect x="251.69" y="286.593" width="48.418" height="396.942"/>
            </g>
          </svg>
        </div>
      </li>`;
    }, '');
  }

  deleteActiveItem( target ) {
    target.classList.remove('active');
  }

  toggleActiveItem( target ) {
    target.classList.toggle('active');
  }

  checkKeyCode( event ) {
    if ( event.keyCode === ESC ) this.hideBlock();
  }
};

const getPercent = ( a, b ) => 100 / ( a / b );

module.exports = SavedCities;