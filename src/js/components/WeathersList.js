const pubsub = new ( require('../utils/pubSub') );
const getParentNode = require('../utils/getParentNode');
const format = require('../utils/format');
const store = require('../store');
const Preloader = require('./Preloader');
const CODES = require('../utils/weatherCodes');

const dataRoles = {
  'delete': 'deleteCard',
};

class WeathersList {
  constructor( data ) {
    this.container = data.container;
    this.createCardWeater = this.createCardWeater.bind( this );
    this.updateCardWeater = this.updateCardWeater.bind( this );
    this.enabledPreload = this.enabledPreload.bind( this );
    this.disabledPreload = this.disabledPreload.bind( this );
    this.updateTemperature = this.updateTemperature.bind( this );
    this.updateSpeed = this.updateSpeed.bind( this );
    this.updateTimeFormat = this.updateTimeFormat.bind( this );

    pubsub.subscribe('create-card-weater', this.createCardWeater );
    pubsub.subscribe('update-card-weater', this.updateCardWeater );
    pubsub.subscribe('start-load-card-weather', this.enabledPreload );
    pubsub.subscribe('end-load-card-weather', this.disabledPreload );
    pubsub.subscribe('update-units-temperature', this.updateTemperature );
    pubsub.subscribe('update-units-speed', this.updateSpeed );
    pubsub.subscribe('update-units-timeFormat', this.updateTimeFormat );

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

  updateTemperature( list ) {
    let card, forecastList, forecastItems, todayMinMax;
    const temperature = store.settings.temperature;

    list.forEach( data => {
      card = this.container.querySelector(`[data-id="${data.id}"]`);
      forecastItems = card.querySelectorAll('.itemForecast');
      forecastList = data.item.forecast.slice(1,);
      todayMinMax = data.item.forecast[0];

      (card.querySelector('.temperatureToday'))
      .innerHTML = format.fahrenheitToCelsius(+data.item.condition.temp, temperature );
      (card.querySelector('.minToday'))
      .innerHTML = format.fahrenheitToCelsius(+todayMinMax.low, temperature );
      (card.querySelector('.maxToday'))
      .innerHTML = format.fahrenheitToCelsius(+todayMinMax.low, temperature );

      forecastList.forEach(( item, index ) => {
        (forecastItems[index].querySelector('.minT'))
        .innerHTML = format.fahrenheitToCelsius(+item.low, temperature );
        (forecastItems[index].querySelector('.maxT'))
        .innerHTML = format.fahrenheitToCelsius(+item.high, temperature );
      });
    });
  }

  updateSpeed( list ) {
    let card;
    const speed = store.settings.speed;
    list.forEach( data => {
      card = this.container.querySelector(`[data-id="${data.id}"]`);
      (card.querySelector('.visibility'))
      .innerHTML = format.getWindStrength(data.atmosphere.visibility, speed, '');
      (card.querySelector('.wind'))
      .innerHTML = format.getWindStrength(data.wind.speed, speed, '/h');
    });
  }

  updateTimeFormat( list ) {
    let card;
    const timeFormat = store.settings.timeFormat;
    list.forEach( data => {
      card = this.container.querySelector(`[data-id="${data.id}"]`);

      (card.querySelector(`[data-time-update="time-update"]`))
      .innerHTML = format.getCurrentTime( data.lastUpdate, timeFormat );
      (card.querySelector('.sunrise'))
      .innerHTML = format.getTimeSunriseSunset(data.astronomy.sunrise, timeFormat, 'am' );
      (card.querySelector('.sunset'))
      .innerHTML = format.getTimeSunriseSunset(data.astronomy.sunset, timeFormat, 'pm' );
    });
  }
};

function getRising( num ) {
  if( !num ) return '';
  else if ( num > 1 ) '<span>&#8595;</span>';
  else if ( num < 2 ) '<span>&#8593;</span>';
};

function createForecast( list, tempFormat ) {
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
          <img class="imgForecast" src="./src/images/weather/${CODES[item.code]}.png" alt=""/>
          <div class="containerMinMax">
            <div class="maxTemperature">
              <span class="minIcon">&#8595;</span>
              <span class="minT">${format.fahrenheitToCelsius( +item.low, tempFormat )}</span>
            </div>
            <div class="minTemperature">
              <span class="maxIcon">&#8593;</span>
              <span class="maxT">${format.fahrenheitToCelsius(+item.high, tempFormat)}</span>
            </div>
          </div>
        </div>
      </li>`
  },``);
};

function templateCard( data ) {
  const { location, item, atmosphere, wind, astronomy } = data;
  const date =  data.lastUpdate;
  const { temperature, speed, timeFormat } = store.settings;
  const forecast = item.forecast.slice(1,);
  const todayMinMax = item.forecast[0];
  const template =
      `<svg class="deleteCard" data-role="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642" width="14" >
        <title id="Delete city">Delete city</title>
        <path data-role="delete" fill="#FFF" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"/>
      </svg>
      <div class="row">
        <div class="cell">
        <div class="cityName">${location.city}</div>
        <div class="regionName">${location.country} ${location.region}</div>
        <div class="containerDate">
          <small class="content">${format.formateToday(date)}</small>
          <small class="content">updated in:
            <small data-time-update="time-update">${format.getCurrentTime(date, timeFormat)}</small>
          </small>
        </div>
        <div class="blockTemperature">
          <div class="containerTemperatureToday">
            <div class="temperatureToday">${format.fahrenheitToCelsius(+item.condition.temp, temperature )}</div>
            <div class="containerMinMaxToday">
              <div class="wrapper">
                <small>&#8595;</small>
                <span class="minToday">${format.fahrenheitToCelsius(+todayMinMax.low, temperature)}</span>
              </div>
              <div class="wrapper">
                <small>&#8593;</small>
                <span class="maxToday">${format.fahrenheitToCelsius(+todayMinMax.high, temperature)}</span>
              </div>
            </div>
          </div>
          <div class="condition">
            <img class="imgToday" src="./src/images/weather/${CODES[item.condition.code]}.png" alt="" />
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
            <span class="visibility">${format.getWindStrength(atmosphere.visibility, speed, '')}</span>
          </div>
          <div class="content">
            <span class="title">wind</span>
            <span class="wind">${format.getWindStrength(wind.speed, speed, '/h')}</span>
            <span class="windDirection">${format.getDirectionWind(+wind.direction)}</span>
          </div>
          <div class="content">
            <span class="title">sunrise</span>
            <span class="sunrise">${format.getTimeSunriseSunset(astronomy.sunrise, timeFormat, 'am')}</span>
          </div>
          <div class="content">
            <span class="title">sunset</span>
            <span class="sunset">${format.getTimeSunriseSunset(astronomy.sunset, timeFormat, 'pm')}</span>
          </div>
        </div>
        <div class="wrapperForecast">
          <div class="blockForecast">
            <div class="titleForecast">Forecast</div>
            <ul class="listForecast">
              ${createForecast(forecast, temperature)}
            </ul>
          </div>
        </div>
      </div>`;
    return template;
};

module.exports = WeathersList;