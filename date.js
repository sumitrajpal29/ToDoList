exports.date = function(){
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date();
  return date.toLocaleString("en-US",options);
}

exports.day = function (){
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const date = new Date();
  return days[date.getDay()];
}
