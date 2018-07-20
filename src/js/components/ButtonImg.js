const buttons = {
  plus: `<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>`,
  back: `<svg xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 240.823 240.823" xml:space="preserve">
          <g>
            <path fill="#FFF" id="Chevron_Right" d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179
            l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816
            C52.942,116.507,52.942,124.327,57.633,129.007z"/>
          </g>
        </svg>`,
  cancel: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642" width="14" >
            <path fill-rule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"/>
          </svg>`,
  refresh: `<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg>`,
}

class ButtonImg {
  constructor( data ) {
    this.btn = this.createButton( data );
    this.btn.addEventListener('click', data.handlerClick );
    data.parent.appendChild( this.btn );
  }

  createButton( conf ) {
    // const btn = document.createElement('button');
    // btn.className = conf.className;
    // if( conf.title ) btn.setAttribute('title', conf.title );
    // return btn;
    const btn = document.createElement('div');
    btn.className = conf.className;
    if( conf.title ) btn.setAttribute('title', conf.title );
    // debugger
    btn.innerHTML = buttons[conf.name];
    return btn;
  }
};

module.exports = ButtonImg;
