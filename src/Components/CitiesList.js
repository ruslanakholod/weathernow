
const cityJson = require('./../citylist.json');
export let citiesList = cityJson.map(item => {
  var myObj = {};
  
  myObj['value'] = item['name'];
  myObj['country'] = item['country'];
  return myObj;
})

console.log(citiesList[20])

