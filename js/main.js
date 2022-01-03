function getBtcInfo(ticker, target) {
  var newReq = new XMLHttpRequest();
  newReq.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd');
  newReq.responseType = 'json';
  newReq.addEventListener('load', function () {
  });
}
getBtcInfo('BTC', 'USD');
