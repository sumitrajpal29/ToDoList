exports.date = getDate;
function getDate(){
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var date = new Date();
  var dateString = date.toLocaleString("en-US",options)
  console.log(date);
  return dateString;
}
exports.day = getDay;
function getDay(){
  var options = { weekday: 'long'};
  var date = new Date();
  let day = date.getDay().toLocaleString("en-US,options");
  return day;
}
