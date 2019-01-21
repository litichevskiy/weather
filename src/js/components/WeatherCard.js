const pubsub = new ( require('../utils/pubSub') );
const getParentNode = require('../utils/getParentNode');
const format = require('../utils/format');
const store = require('../store');
const Preloader = require('./Preloader');
const CODES = require('../utils/weatherCodes');
const INTERVAL = 60000; // 1 min in ms
const MAX_TIME_UPDATED = 2; // hours

class WeatherCard {
  constructor( data ) {
    this.container = data.container;
    this.intervalId = undefined;
    this.updatedTimeElem;
    this.createCardWeater = this.createCardWeater.bind( this );
    this.enabledPreload = this.enabledPreload.bind( this );
    this.disabledPreload = this.disabledPreload.bind( this );
    this.updateTemperature = this.updateTemperature.bind( this );
    this.updateSpeed = this.updateSpeed.bind( this );
    this.updateTimeFormat = this.updateTimeFormat.bind( this );
    this.deleteCard = this.deleteCard.bind( this );

    pubsub.subscribe('create-card-weater', this.createCardWeater );
    pubsub.subscribe('update-card-weater', this.createCardWeater );
    pubsub.subscribe('start-load-card-weather', this.enabledPreload );
    pubsub.subscribe('end-load-card-weather', this.disabledPreload );
    pubsub.subscribe('update-units-temperature', this.updateTemperature );
    pubsub.subscribe('update-units-speed', this.updateSpeed );
    pubsub.subscribe('update-units-timeFormat', this.updateTimeFormat );
    pubsub.subscribe('delete-weather-card', this.deleteCard );

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
    this.deleteCard( true );

    this.updatedTimeElem = card.querySelector('.updatedTime .time');
    this.getLastUpdateTime();
    this.addIntervalUpdateTime();
  }

  getLastUpdateTime() {
    let time = format.convertMS( Date.now() - store.lastUpdateTime );
    if( time.hours < MAX_TIME_UPDATED ) {
      if( time.minutes >= 1 ) {
        time = ( time.hours < 1 ) ? `${time.minutes}m ago` : `${time.hours}h ${time.minutes}m ago`;
      }
      else time = 'less than a minute ago';
    }
    else{
      clearInterval( this.intervalId );
      time = `over ${MAX_TIME_UPDATED} hours ago`;
    }
    this.updatedTimeElem.innerHTML = time;
  }

  addIntervalUpdateTime() {
    this.intervalId = setInterval(() => this.getLastUpdateTime(), INTERVAL);
  }

  deleteCard( isAnimation ) {
    if( this.intervalId !== undefined ) clearInterval( this.intervalId );
    if( !isAnimation ) this.container.innerHTML = '';
    if( this.container.children[1] ) this.container.children[0].remove();
  }

  enabledPreload() {
    this.deleteCard();
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
      .innerHTML = format.convertTemperature(+data.item.condition.temperature, temperature );
      (card.querySelector('.minToday'))
      .innerHTML = format.convertTemperature(+todayMinMax.low, temperature );
      (card.querySelector('.maxToday'))
      .innerHTML = format.convertTemperature(+todayMinMax.high, temperature );

      forecastList.forEach(( item, index ) => {
        (forecastItems[index].querySelector('.minT'))
        .innerHTML = format.convertTemperature(+item.low, temperature );
        (forecastItems[index].querySelector('.maxT'))
        .innerHTML = format.convertTemperature(+item.high, temperature );
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
            <time class="dateForecast">${format.formateDateForecast(item.date * 1000)}</time>
          </div>
          <span class="descriptionForecast">${item.text}</span>
        </div>
        <div class="cellForecast">
          <img class="imgForecast" src="images/weather/${CODES[item.code]}.png" alt=""/>
          <div class="containerMinMax">
            <div class="maxTemperature">
              <span class="minIcon monospaceNumber">&#8595;</span>
              <span class="minT monospaceNumber">${format.convertTemperature( +item.low, tempFormat )}</span>
            </div>
            <div class="minTemperature">
              <span class="maxIcon">&#8593;</span>
              <span class="maxT">${format.convertTemperature(+item.high, tempFormat)}</span>
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
      `<div class="row">
        <div class="cell">
        <div class="cityName">${location.city}</div>
        <div class="regionName">${location.country} ${location.region}</div>
        <div class="containerDate">
          <small class="content">${format.formateToday(date)}</small>
          <small class="content monospaceNumber">
            <small data-time-update="time-update">${format.getCurrentTime(new Date(data.localTime), timeFormat)}</small>
            <small class="descriptionTime">( local time )</small>
          </small>
          <small class="updatedTime">
            updated: <small class="time"></small>
          </small>
        </div>
        <div class="blockTemperature">
          <div class="containerTemperatureToday">
            <div class="temperatureToday monospaceNumber">${format.convertTemperature(+item.condition.temperature, temperature )}</div>
            <div class="containerMinMaxToday">
              <div class="wrapper">
                <small>&#8595;</small>
                <span class="minToday monospaceNumber">${format.convertTemperature(+todayMinMax.low, temperature)}</span>
              </div>
              <div class="wrapper">
                <small>&#8593;</small>
                <span class="maxToday monospaceNumber">${format.convertTemperature(+todayMinMax.high, temperature)}</span>
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
            <span class="humidity monospaceNumber">${atmosphere.humidity}%</span>
          </div>
          <div class="content">
            <span class="title">pressure</span>
            <span class="pressure monospaceNumber">
              ${atmosphere.pressure}
              mbar ${getRising(+atmosphere.rising)}
            </span>
          </div>
          <div class="content">
            <span class="title">visibility</span>
            <span class="visibility monospaceNumber">${format.getWindStrength(atmosphere.visibility, speed, '')}</span>
          </div>
          <div class="content">
            <span class="title">wind</span>
            <span class="wind monospaceNumber">${format.getWindStrength(wind.speed, speed, '/h')}</span>
            <span class="windDirection">${format.getDirectionWind(+wind.direction)}</span>
          </div>
          <div class="content">
            <span class="title">sunrise</span>
            <span class="sunrise monospaceNumber">${format.getTimeSunriseSunset(astronomy.sunrise, timeFormat, 'am')}</span>
          </div>
          <div class="content">
            <span class="title">sunset</span>
            <span class="sunset monospaceNumber">${format.getTimeSunriseSunset(astronomy.sunset, timeFormat, 'pm')}</span>
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

module.exports = WeatherCard;