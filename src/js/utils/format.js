const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const MONTH = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DIRECTION_WIND = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

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
      let amPm = ( hours > 12 ) ? 'pm' : 'am';
      if( hours > 12 ) hours -= 12;
      else if( hours === 0 ) hours = '12';
      return `${hours}:${minutes} ${amPm}`;
    }
  },

  setS( str, format, prefix ) {
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

  // setSunset( str, format ) {
  //   let minutes;
  //   let hours;
  //   minutes = str.match(/:(\d{1,2})/)[1];
  //   minutes = isAddZero( +minutes );

  //   if( format === '12' ) {
  //     hours = match(/(\d{1,2}):/)[1];
  //     return `${hours}:${minutes}`;
  //   }
  //   else{
  //     // minutes = str.match(/:(\d{1,2})/)[1];
  //     hours = match(/(\d{1,2}):/)[1];
  //     hours = isAddZero( +hours );
  //   }
  // },

  fahrenheitToCelsius( deg ) {
    return (( deg - 32 ) / 1.8).toFixed( 0 );
  },

  celsiusToFahrenheit( deg ) {
    return Math.ceil( ( deg * 1.8 ) + 32 );
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
};

function isAddZero( num ) {
  return ( num < 10 ) ? `0${num}` : num;
}

module.exports = format;