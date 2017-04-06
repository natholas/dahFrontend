app.filter('dateDiff', function(Currency) {
  return function(date1, date2) {
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();

    var date = new Date(date1 - date2);

    var str = '';
    str += date.getUTCDate()-1 + " days, ";
    str += date.getUTCHours() + " hours";

    return str;
  }
});
