const format = {
  formateDate( date ) {
    if( !date ) return;
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let result = '';
    result += isAddZero( hours ) + ':';
    result += isAddZero( minutes );
    return result;
  },

  fahrenheitToCelsius( deg ) {
    return (( deg - 32 ) / 1.8).toFixed( 0 );
  },

  celsiusToFahrenheit( deg ) {
    return Math.ceil( ( deg * 1.8 ) + 32 );
  },

  degToCompass( num ) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  },

  formateToday( str ) {
    return str.match(/^.+\d{4}/ig);
  },
};

function isAddZero( num ) {
  return ( num < 10 ) ? `0${num}` : num;
}

module.exports = format;