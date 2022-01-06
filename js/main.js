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
    btcObject.color = btcColor;
    displayTable(btcObject, true);
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
    ethObject.color = ethColor;
    displayTable(ethObject, true);
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
    linkObject.color = linkColor;
    displayTable(linkObject, true);
  });
  newReq3.send();
}

function getDataForUser(object) {
  var newReq4 = new XMLHttpRequest();
  newReq4.open('GET', 'https://api.cryptonator.com/api/ticker/' + object.ticker + '-' + object.target);
  newReq4.responseType = 'json';
  newReq4.addEventListener('load', function () {
    if (newReq4.response.success === false) {
      displayAlert();
    } else {
      var tableID = object.tableID;
      var userColor = '#2E64B0';
      var userObject = {};
      var userTarget = newReq4.response.ticker.target;
      var userBase = newReq4.response.ticker.base;
      var userPrice = newReq4.response.ticker.price;
      userPrice = Math.round(userPrice * 100) / 100;
      var userVol = newReq4.response.ticker.volume;
      userVol = Math.round(userVol * 100) / 100;
      var userChange = newReq4.response.ticker.change;
      userChange = Math.round(userChange * 100) / 100;
      userObject.base = userBase;
      userObject.price = userPrice;
      userObject.volume = userVol;
      userObject.change = userChange;
      userObject.target = userTarget;
      userObject.color = userColor;
      userObject.tableID = tableID;
      displayUserTable(userObject, false);
    }
  });
  newReq4.send();
}
function createAlert(event) {
  var createDiv = document.createElement('div');
  createDiv.className = 'col-8 col-lg-4 alert alert-warning alert-dismissible fade show';
  createDiv.setAttribute('role', 'alert');

  var createH4 = document.createElement('h4');
  createH4.className = 'alert-heading';
  createH4.textContent = 'Invalid Input';
  createDiv.appendChild(createH4);

  var createSpan = document.createElement('span');
  createSpan.textContent = 'Try again with a valid input';
  createDiv.appendChild(createSpan);

  var createButton = document.createElement('button');
  createButton.setAttribute('type', 'button');
  createButton.setAttribute('class', 'close close-alert');
  createButton.setAttribute('data-dismiss', 'alert');
  createButton.setAttribute('aria-label', 'Close');
  createDiv.appendChild(createButton);

  var createSpanTwo = document.createElement('span');
  createSpanTwo.setAttribute('aria-hidden', 'true');
  createSpanTwo.innerHTML = '&times;';
  createButton.appendChild(createSpanTwo);

  return createDiv;
}

function displayAlert() {
  var $grabAlertPackage = document.querySelector('.alert-package');
  var newAlert = createAlert();
  $grabAlertPackage.appendChild(newAlert);
}

window.addEventListener('load', restoreTables);
function restoreTables(event) {
  for (var index = 0; index < data.tables.length; index++) {
    getDataForUser(data.tables[index]);
  }
}
function createTableTree(object, isBigThree) {
  var createDivElementCol = document.createElement('div');
  if (isBigThree === true) {
    createDivElementCol.setAttribute('class', 'col-8 col-lg-4');
  } else {
    createDivElementCol.setAttribute('class', 'dom-table col-8 col-lg-4');
    createDivElementCol.setAttribute('data-view', object.tableID);
  }
  var createTableElement = document.createElement('table');
  createTableElement.setAttribute('class', 'table table-striped table-hover');
  createDivElementCol.appendChild(createTableElement);

  if (isBigThree === true) {
    var createTableHead = document.createElement('thead');
    createTableElement.appendChild(createTableHead);
    var createTableRow = document.createElement('tr');
    createTableHead.appendChild(createTableRow);
    var createTh = document.createElement('th');
    createTh.setAttribute('class', 'table-header big-three-header');
    createTh.setAttribute('colspan', '2');
    createTh.setAttribute('style', 'color: ' + object.color);
    createTh.textContent = object.base;
    createTableRow.appendChild(createTh);
  } else {
    createTableHead = document.createElement('thead');
    createTableElement.appendChild(createTableHead);
    createTableRow = document.createElement('tr');
    createTableHead.appendChild(createTableRow);
    createTh = document.createElement('th');
    createTh.setAttribute('colspan', '2');
    createTh.setAttribute('style', 'color: ' + object.color);
    createTableRow.appendChild(createTh);

    var createSpanAlpha = document.createElement('span');
    createSpanAlpha.className = 'table-header d-flex justify-content-between table-header';
    createSpanAlpha.textContent = object.base;
    createTh.appendChild(createSpanAlpha);

    var createIconButton = document.createElement('button');
    createIconButton.className = 'btn btn-outline-primary rounded fas fa-pencil-alt';
    createSpanAlpha.appendChild(createIconButton);
  }
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

function displayUserTable(object, isBigThree) {
  var $theGrandDiv = document.querySelector('.user-table');
  var newTable = createTableTree(object, isBigThree);
  $theGrandDiv.prepend(newTable);
}
function displayTable(object, isBigThree) {
  var $theGrandDiv = document.querySelector('.big-three');
  var newTable = createTableTree(object, isBigThree);
  $theGrandDiv.append(newTable);
}
getBtcInfo();
getEthInfo();
getLinkInfo();

function goBackTables(event) {
  switchViews('show-tables');
}
function goToFormPage(event) {
  switchViews('table-form');
}

function switchViews(view) {
  for (var index = 0; index < $views.length; index++) {
    if ($views[index].getAttribute('data-view') === view) {
      $views[index].classList.remove('hidden');
    } else {
      $views[index].classList.add('hidden');
    }
  }
}

var $views = document.querySelectorAll('.view-container');
var $createTableButton = document.querySelector('.table-creator');
$createTableButton.addEventListener('click', goToFormPage);
var $closeForm = document.querySelector('.close-form');
$closeForm.addEventListener('click', goBackTables);

function gatherInputData(event) {
  event.preventDefault();
  if (data.editing === null) {
    var inputInfo = {};
    var tickerValue = $getInfoFromSubmission.elements.ticker.value;
    var targetValue = $getInfoFromSubmission.elements.target.value;
    inputInfo.ticker = tickerValue;
    inputInfo.target = targetValue;
    inputInfo.tableID = data.nextTableId;
    data.nextTableId++;
    data.tables.unshift(inputInfo);
    getDataForUser(inputInfo);

  } else {
    var editInputInfo = {};
    var editTickerValue = $getInfoFromSubmission.elements.ticker.value;
    var editTargetValue = $getInfoFromSubmission.elements.target.value;
    var grabtheTableValue = data.editing;
    editInputInfo.ticker = editTickerValue;
    editInputInfo.target = editTargetValue;
    editInputInfo.tableID = grabtheTableValue;
    for (var index = 0; index < data.tables.length; index++) {
      var retrieveCorrectTable = data.tables[index].tableID;
      if (grabtheTableValue === retrieveCorrectTable) {
        data.tables[index] = editInputInfo;
      }
    }
    data.editing = null;
  }
  $getInfoFromSubmission.reset();
  goBackTables();
}
function editTable(object) {
  $grabformTicker.setAttribute('value', object.ticker);
  $grabformTarget.setAttribute('value', object.target);
  $grabformSubmission.textContent = 'Update';
  data.editing = object.tableID;
}

function findTable() {
  if (event.target.tagName === 'BUTTON') {
    var $closestIdiom = event.target.closest('DIV');
    $closestIdiom = $closestIdiom.getAttribute('data-view');
    $closestIdiom = parseInt($closestIdiom);
    for (var i = 0; i < data.tables.length; i++) {
      var retrieveCorrectTable = data.tables[i].tableID;
      if (retrieveCorrectTable === $closestIdiom) {
        var editUserInput = data.tables[i];
        editTable(editUserInput);
        goToFormPage();
      }
    }
  }
}
var $getInfoFromSubmission = document.querySelector('#get-table-form');
$getInfoFromSubmission.addEventListener('submit', gatherInputData);
var $awaitEdit = document.querySelector('.table-holder');
$awaitEdit.addEventListener('click', findTable);

var $grabformTicker = document.querySelector('#table-ticker');
var $grabformTarget = document.querySelector('#table-target');
var $grabformSubmission = document.querySelector('#submit');
