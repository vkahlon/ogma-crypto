function getBtcInfo() {
  var newReq = new XMLHttpRequest();
  newReq.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd');
  newReq.responseType = 'json';
  newReq.addEventListener('load', function () {
    var btcColor = '#F8A33C';
    var btcObject = {};
    var btcTarget = newReq.response.ticker.target;
    var btcBase = newReq.response.ticker.base;
    var btcPrice = newReq.response.ticker.price;
    btcPrice = Math.round(btcPrice * 100) / 100;
    var btcVol = newReq.response.ticker.volume;
    btcVol = Math.round(btcVol * 100) / 100;
    var btcChange = newReq.response.ticker.change;
    btcChange = Math.round(btcChange * 100) / 100;
    btcObject.base = btcBase;
    btcObject.price = btcPrice;
    btcObject.volume = btcVol;
    btcObject.change = btcChange;
    btcObject.target = btcTarget;
    displayBigThreeTable(btcObject, btcColor);
  });
  newReq.send();
}
function getEthInfo() {
  var newReq2 = new XMLHttpRequest();
  newReq2.open('Get', 'https://api.cryptonator.com/api/ticker/eth-usd');
  newReq2.responseType = 'json';
  newReq2.addEventListener('load', function () {
    var ethColor = '#768FED';
    var ethObject = {};
    var ethBase = newReq2.response.ticker.base;
    var ethTarget = newReq2.response.ticker.target;
    var ethPrice = newReq2.response.ticker.price;
    ethPrice = Math.round(ethPrice * 100) / 100;
    var ethVol = newReq2.response.ticker.volume;
    ethVol = Math.round(ethVol);
    var ethChange = newReq2.response.ticker.change;
    ethChange = Math.round(ethChange * 100) / 100;
    ethObject.base = ethBase;
    ethObject.price = ethPrice;
    ethObject.volume = ethVol;
    ethObject.change = ethChange;
    ethObject.target = ethTarget;
    displayBigThreeTable(ethObject, ethColor);
  });
  newReq2.send();
}
function getLinkInfo() {
  var newReq3 = new XMLHttpRequest();
  newReq3.open('Get', 'https://api.cryptonator.com/api/ticker/link-usd');
  newReq3.responseType = 'json';
  newReq3.addEventListener('load', function () {
    var linkColor = 'rgb(38,83,216)';
    var linkObject = {};
    var linkTarget = newReq3.response.ticker.target;
    var linkBase = newReq3.response.ticker.base;
    var linkPrice = newReq3.response.ticker.price;
    linkPrice = Math.round(linkPrice * 100) / 100;
    var linkVol = newReq3.response.ticker.volume;
    linkVol = Math.round(linkVol);
    var linkChange = newReq3.response.ticker.change;
    linkChange = Math.round(linkChange * 100) / 100;
    linkObject.base = linkBase;
    linkObject.price = linkPrice;
    linkObject.volume = linkVol;
    linkObject.change = linkChange;
    linkObject.target = linkTarget;
    displayBigThreeTable(linkObject, linkColor);
  });
  newReq3.send();
}

function createTableTree(object, color) {
  var createDivElementCol = document.createElement('div');
  createDivElementCol.setAttribute('class', 'col-8 col-lg-4');

  var createTableElement = document.createElement('table');
  createTableElement.setAttribute('class', 'table table-striped table-hover');
  createDivElementCol.appendChild(createTableElement);

  var createTableHead = document.createElement('thead');
  createTableElement.appendChild(createTableHead);
  var createTableRow = document.createElement('tr');
  createTableHead.appendChild(createTableRow);
  var createTh = document.createElement('th');
  createTh.setAttribute('class', 'table-header');
  createTh.setAttribute('colspan', '2');
  createTh.setAttribute('style', 'color: ' + color);
  createTh.textContent = object.base;
  createTableRow.appendChild(createTh);

  var createTableBody = document.createElement('tbody');
  createTableElement.appendChild(createTableBody);

  var createTableRowTwo = document.createElement('tr');
  createTableBody.appendChild(createTableRowTwo);

  var createTableCellOne = document.createElement('td');
  createTableCellOne.setAttribute('class', 'description');
  createTableCellOne.textContent = 'Price';
  createTableRowTwo.appendChild(createTableCellOne);

  var createTableCellTwo = document.createElement('td');
  createTableCellTwo.setAttribute('class', 'col-4');
  createTableCellTwo.textContent = object.price;
  createTableRowTwo.appendChild(createTableCellTwo);

  var createTableRowThree = document.createElement('tr');
  createTableBody.appendChild(createTableRowThree);

  var createTableCellThree = document.createElement('td');
  createTableCellThree.setAttribute('class', 'description');
  createTableCellThree.textContent = 'Target';
  createTableRowThree.appendChild(createTableCellThree);

  var createTableCellFour = document.createElement('td');
  createTableCellFour.textContent = object.target;
  createTableRowThree.appendChild(createTableCellFour);

  var createTableRowFour = document.createElement('tr');
  createTableBody.appendChild(createTableRowFour);

  var createTableCellFive = document.createElement('td');
  createTableCellFive.setAttribute('class', 'description');
  createTableCellFive.textContent = 'Volume';
  createTableRowFour.appendChild(createTableCellFive);

  var createTableCellSix = document.createElement('td');
  createTableCellSix.setAttribute('class', 'volume');
  createTableCellSix.textContent = object.volume;
  createTableRowFour.appendChild(createTableCellSix);

  var createTableRowFive = document.createElement('tr');
  createTableBody.appendChild(createTableRowFive);

  var createTableCellSeven = document.createElement('td');
  createTableCellSeven.setAttribute('class', 'description');
  createTableCellSeven.textContent = 'Change';
  createTableRowFive.appendChild(createTableCellSeven);

  var createTableCellEight = document.createElement('td');
  createTableCellEight.textContent = object.change;
  createTableRowFive.appendChild(createTableCellEight);
  return createDivElementCol;
}

function displayBigThreeTable(object, color) {
  var $theGrandDiv = document.querySelector('.main-table');
  var newTable = createTableTree(object, color);
  $theGrandDiv.appendChild(newTable);
}
getBtcInfo();
getEthInfo();
getLinkInfo();
