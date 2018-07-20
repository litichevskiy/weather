const UP = 38;
const DOWN = 40;
const ENTER = 13;

class SelectItemList {
  constructor( data ) {
    this.list = data.list;
    this.activeItem;
    this.selectItemList = data.selectHandler;
    this.checkKeyCode = this.checkKeyCode.bind( this );
  }

  disabled() {
    this.activeItem.classList.remove('active');
    this.activeItem = null;
    document.removeEventListener('keydown', this.checkKeyCode);
  }

  enabled() {
    this.activeItem = this.list.children[0];
    this.activeItem.classList.add('active');
    document.addEventListener('keydown', this.checkKeyCode);
  }

  checkKeyCode( event ) {
    let code = event.keyCode;
    if ( code === UP ) this.selectPreviousItem();
    else if ( code === DOWN ) this.selectNextItem();
    else if ( code === ENTER ) this.selectItem();
  }

  selectPreviousItem() {

    if( this.activeItem.previousElementSibling ) {
      let prevElem = this.activeItem.previousElementSibling;
      this.activeItem.classList.remove('active');
      prevElem.classList.add('active');
      this.activeItem = prevElem;
    }
  }

  selectNextItem() {

    if( this.activeItem.nextElementSibling ) {
      let nextElem = this.activeItem.nextElementSibling;
      this.activeItem.classList.remove('active');
      nextElem.classList.add('active');
      this.activeItem = nextElem;
    }
  };

  selectItem() {
    if ( !this.activeItem ) return;
    this.selectItemList({ target: this.activeItem });
  };
}

module.exports = SelectItemList;