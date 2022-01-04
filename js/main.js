function getBtcInfo() {
  var $changeBtcPrice = document.querySelector('#btc-price');
  var $changeBtcVolume = document.querySelector('#btc-vol');
  var $changeBtc = document.querySelector('#btc-change');
  var newReq = new XMLHttpRequest();
  newReq.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd');
  newReq.responseType = 'json';
  newReq.addEventListener('load', function () {
    var btcPrice = newReq.response.ticker.price;
    btcPrice = Math.round(btcPrice);
    $changeBtcPrice.textContent = btcPrice;

    var btcVol = newReq.response.ticker.volume;
    btcVol = Math.round(btcVol);
    $changeBtcVolume.textContent = btcVol;

    var btcChange = newReq.response.ticker.change;
    btcChange = Math.round(btcChange);
    $changeBtc.textContent = btcChange;
  });
  newReq.send();
}
function getEthInfo() {
  var $changeEthPrice = document.querySelector('#eth-price');
  var $changeEthVolume = document.querySelector('#eth-vol');
  var $changeEth = document.querySelector('#eth-change');
  var newReq2 = new XMLHttpRequest();
  newReq2.open('Get', 'https://api.cryptonator.com/api/ticker/eth-usd');
  newReq2.responseType = 'json';
  newReq2.addEventListener('load', function () {
    var ethPrice = newReq2.response.ticker.price;
    ethPrice = Math.round(ethPrice);
    $changeEthPrice.textContent = ethPrice;

    var ethVol = newReq2.response.ticker.volume;
    ethVol = Math.round(ethVol);
    $changeEthVolume.textContent = ethVol;

    var ethChange = newReq2.response.ticker.change;
    ethChange = Math.round(ethChange);
    $changeEth.textContent = ethChange;
  });
  newReq2.send();
}
function getLinkInfo() {
  var $changeLinkPrice = document.querySelector('#link-price');
  var $changeLinkVolume = document.querySelector('#link-vol');
  var $changeLink = document.querySelector('#link-change');
  var newReq3 = new XMLHttpRequest();
  newReq3.open('Get', 'https://api.cryptonator.com/api/ticker/link-usd');
  newReq3.responseType = 'json';
  newReq3.addEventListener('load', function () {
    var linkPrice = newReq3.response.ticker.price;
    linkPrice = Math.round(linkPrice);
    $changeLinkPrice.textContent = linkPrice;

    var linkVol = newReq3.response.ticker.volume;
    linkVol = Math.round(linkVol);
    $changeLinkVolume.textContent = linkVol;

    var ethLink = newReq3.response.ticker.change;
    ethLink = Math.round(ethLink);
    $changeLink.textContent = ethLink;
  });
  newReq3.send();
}

getBtcInfo();
getEthInfo();
getLinkInfo();
