
const cityJson = require('./../citylist.json');
export let citiesList = cityJson.map(item => {
  var obj = {};

  obj['value'] = item['name'];
  obj['country'] = item['country'];
  return obj;
})

