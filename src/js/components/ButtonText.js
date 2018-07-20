class ButtonText {
  constructor( data ) {
    this.btn = this.createButton( data );
    this.btn.addEventListener('click', data.handlerClick );
    data.parent.appendChild( this.btn );
  }

  createButton( conf ) {
    const btn = document.createElement('button');
    btn.className = conf.className;
    btn.innerHTML = conf.text;
    return btn;
  }
};

module.exports = ButtonText;