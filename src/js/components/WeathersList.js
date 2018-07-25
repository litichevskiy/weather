const pubsub = new ( require('../utils/pubSub') );
const getParentNode = require('../utils/getParentNode');
const format = require('../utils/format');
const store = require('../store');
const Preloader = require('./Preloader');
const CODES = require('../utils/weatherCodes');

const dataRoles = {
  'delete': 'deleteCard',
  'update': 'update',
};

class WeathersList {
  constructor( data ) {
    this.container = data.container;
    this.createCardWeater = this.createCardWeater.bind( this );
    this.updateCardWeater = this.updateCardWeater.bind( this );
    this.enabledPreload = this.enabledPreload.bind( this );
    this.disabledPreload = this.disabledPreload.bind( this );
    pubsub.subscribe('create-card-weater', this.createCardWeater );
    pubsub.subscribe('update-card-weater', this.updateCardWeater );
    pubsub.subscribe('start-load-card-weather', this.enabledPreload );
    pubsub.subscribe('end-load-card-weather', this.disabledPreload );

    this.container.addEventListener('click', ( event ) => {
      let target = event.target;
      let action = dataRoles[target.dataset.role];
      if( !action ) return;

      this[action]( target );
    });
    this.preload = new Preloader({
      parent: document.querySelector('.containerCardWeater'),
    });
  }

  createCardWeater( data ) {
    const card = document.createElement('li');
    card.classList.add('itemCardWeather');
    card.setAttribute('data-id', data.id );

    card.innerHTML = templateCard( data );
    this.container.appendChild( card );
  }

  updateCardWeater( data ) {
    let card = this.container.querySelector(`[data-id="${data.id}"]`);
    card.innerHTML = templateCard( data );
  }

  deleteCard( target ) {
    let card = getParentNode( target, 'LI' );
    pubsub.publish( 'delete-card', { id: +card.dataset.id });
    this.container.removeChild( card );
  }

  enabledPreload() {
    this.preload.enabled();
  }

  disabledPreload() {
    this.preload.disabled();
  }
};

function getRising( num ) {
  if( !num ) return '';
  else if ( num > 1 ) '<span>&#8595;</span>';
  else if ( num < 2 ) '<span>&#8593;</span>';
};

function createForecast( list ) {
  return list.reduce(( previousValue, item ) => {
    return previousValue + `
      <li class="itemForecast">
        <div class="cellForecast">
          <div class="containerDate">
            <span class="dayForecast">${item.day}</span>
            <time class="dateForecast">${item.date}</time>
          </div>
          <span class="descriptionForecast">${item.text}</span>
        </div>
        <div class="cellForecast">
          <img class="imgForecast" src="images/weather/${CODES[item.code]}.png" alt=""/>
          <div class="containerMinMax">
            <div class="maxTemperature">
              <span class="minIcon">&#8595;</span>
              <span>${format.fahrenheitToCelsius( +item.low )} °C</span>
            </div>
            <div class="minTemperature">
              <span class="maxIcon">&#8593;</span>
              <span>${format.fahrenheitToCelsius(+item.high)} °C</span>
            </div>
          </div>
        </div>
      </li>`
  },``);
};

function templateCard( data ) {

  const { location, item, atmosphere, wind, astronomy } = data;
    const date =  data.lastUpdate;
    const timeFormat = store.settings.timeFormat;
    let forecast = item.forecast.slice(1,);
    let todayMinMax = item.forecast[0];

    const template =
      `<svg class="deleteCard" data-role="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642" width="14" >
        <title id="Delete city">Delete city</title>
        <path data-role="delete" fill="#FFF" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"/>
      </svg>
      <div class="row">
        <div class="cell">
        <div class="cityName">${location.city} ${location.country}</div>
        <div class="containerDate">
          <small class="content">${format.formateToday(date)}</small>
          <small class="content">updated in:
            <small data-time-update="time-update">${format.getCurrentTime(date, timeFormat)}</small>
          </small>
        </div>
        <div class="blockTemperature">
          <div class="containerTemperatureToday">
            <div class="temperatureToday">${format.fahrenheitToCelsius( +item.condition.temp )} °C</div>
            <div class="containerMinMaxToday">
              <div class="wrapper">
                <small>&#8595;</small>
                <span class="minToday">${format.fahrenheitToCelsius(+todayMinMax.low)}°C</span>
              </div>
              <div class="wrapper">
                <small>&#8593;</small>
                <span class="maxToday">${format.fahrenheitToCelsius(+todayMinMax.high)}°C</span>
              </div>
            </div>
          </div>
          <div class="condition">
            <img class="imgToday" src="images/weather/${CODES[item.condition.code]}.png" alt="" />
            <div>${item.condition.text}</div>
          </div>
        </div>
        </div>
        <div class="cell descriptionAtmosphere">
          <div class="content">
            <span class="title">humidity</span>
            <span class="humidity">${atmosphere.humidity}%</span>
          </div>
          <div class="content">
            <span class="title">pressure</span>
            <span class="pressure">
              ${atmosphere.pressure}
              mbar ${getRising(+atmosphere.rising)}
            </span>
          </div>
          <div class="content">
            <span class="title">visibility</span>
            <span class="visibility">${atmosphere.visibility}</span> km
          </div>
          <div class="content">
            <span class="title">wind</span>
            <span class="wind">${wind.speed}</span> km/h
            <span class="windDirection">${format.getDirectionWind(+wind.direction)}</span>
          </div>
          <div class="content">
            <span class="title">sunrise</span>
            <span class="sunrise">${format.setS(astronomy.sunrise, timeFormat, 'am')}</span>
          </div>
          <div class="content">
            <span class="title">sunset</span>
            <span class="sunset">${format.setS(astronomy.sunset, timeFormat, 'pm')}</span>
          </div>
        </div>
        <div class="wrapperForecast">
          <div class="blockForecast">
            <div class="titleForecast">Forecast</div>
            <ul class="listForecast">
              ${createForecast(forecast)}
            </ul>
          </div>
        </div>
      </div>`;

    return template;
};

module.exports = WeathersList;