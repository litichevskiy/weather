const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTH = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DIRECTION_WIND = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
const MILE = 2.094; // 1 km in miles

const format = {
  getCurrentTime( date, format ) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    minutes = isAddZero( minutes );
    if( format === '24' ) {
      hours = isAddZero( hours );
      return `${hours}:${minutes}`;
    }
    else{
      let amPm = ( hours > 11 ) ? 'PM' : 'AM';
      if( hours > 12 ) hours -= 12;
      else if( hours === 0 ) hours = '12';
      return `${hours}:${minutes} ${amPm}`;
    }
  },

  getTimeSunriseSunset( str, format, prefix ) {
    let minutes;
    let hours;
    minutes = str.match(/:(\d{1,2})/)[1];
    minutes = isAddZero( +minutes );

    if( format === '12' ) {
      hours = str.match(/(\d{1,2}):/)[1];
      return `${hours}:${minutes} ${prefix}`;
    }
    else{
      hours = str.match(/(\d{1,2}):/)[1];
      if( prefix === 'am' ) hours = isAddZero( +hours );
      else hours = +hours + 12;
      return `${hours}:${minutes}`;
    }
  },

  convertTemperature( deg, prefix ) {
    if( prefix === 'c' ) return deg.toFixed( 0 ) + ' °C';
    else return ( ( deg * 9 / 5 ) + 32 ).toFixed( 0 ) + ' °F';
  },

  getWindStrength( windSpeed, prefix, inHours ) {
    if( prefix === 'km' ) return `${( windSpeed * 3.6 ).toFixed(1)} km${inHours}`;
    else return `${(+windSpeed * MILE).toFixed(1)} mi${inHours}`;
  },

  getDirectionWind( num ) {
    var val = Math.floor((num / 22.5) + 0.5);
    return DIRECTION_WIND[(val % 16)];
  },

  formateToday( date ) {
    const weekDay = DAYS[date.getDay()];
    const monthDay = date.getDate();
    const month = MONTH[date.getMonth()];
    const year = date.getFullYear();
    return `${weekDay}, ${monthDay} ${month} ${year}`;
  },

  formateDateForecast( ms ) {
    const date = (new Date( ms )).toString().split(' ')
    return `${date[0]} ${date[2]} ${date[1]} ${date[3]}`;
  },

  convertMS( ms ) {
    let hours, minutes, seconds;
    seconds = Math.floor( ms / 1000 );
    minutes = Math.floor( seconds / 60 );
    seconds = seconds % 60;
    hours = Math.floor( minutes / 60 );
    minutes = minutes % 60;
    hours = hours % 24;

    return { hours: hours, minutes: minutes, seconds: seconds };
  },
};

function isAddZero( num ) {
  return ( num < 10 ) ? `0${num}` : num;
}

module.exports = format;