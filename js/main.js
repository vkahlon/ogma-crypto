function testConnectivity() {
  var newReq = new XMLHttpRequest();
  newReq.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd');
  newReq.onreadystatechange = function () {
    if (newReq.readyState === XMLHttpRequest.DONE) {
      var status = newReq.status;
      if (status !== 200) {
        displayNetworkAlert();
        $accessLoadSignal.className = 'hidden';
      }
    }
  };
  newReq.send();
}
testConnectivity();
function getBigInfo(object, color) {
  var newReq = new XMLHttpRequest();
  newReq.open('GET', 'https://api.cryptonator.com/api/ticker/' + object.ticker + '-' + object.target);
  newReq.responseType = 'json';
  newReq.addEventListener('load', function () {
    var bigColor = color;
    var bigObject = {};
    var bigTarget = newReq.response.ticker.target;
    var bigBase = newReq.response.ticker.base;
    var bigPrice = newReq.response.ticker.price;
    bigPrice = Math.round(bigPrice * 100) / 100;
    var bigVol = newReq.response.ticker.volume;
    bigVol = Math.round(bigVol * 100) / 100;
    var bigChange = newReq.response.ticker.change;
    bigChange = Math.round(bigChange * 100) / 100;
    bigObject.base = bigBase;
    bigObject.price = bigPrice;
    bigObject.volume = bigVol;
    bigObject.change = bigChange;
    bigObject.target = bigTarget;
    bigObject.color = bigColor;
    $accessLoadSignal.className = 'hidden';
    displayTable(bigObject, true);
  });
  newReq.send();
}
function bigInfo() {
  var btcInput = {
    ticker: 'btc',
    target: 'usd'
  };
  getBigInfo(btcInput, '#F8A33C');
  var ethInput = {
    ticker: 'eth',
    target: 'usd'
  };
  getBigInfo(ethInput, '#768FED');
  var linkInput = {
    ticker: 'link',
    target: 'usd'
  };
  getBigInfo(linkInput, 'rgb(38,83,216)');
}
bigInfo();

function getData(object) {
  var userColor = '#2E64B0';
  var userObject = {};
  var userTarget = object.target;
  var userBase = object.base;
  var userPrice = object.price;
  userPrice = Math.round(userPrice * 100) / 100;
  var userVol = object.volume;
  userVol = Math.round(userVol * 100) / 100;
  var userChange = object.change;
  userChange = Math.round(userChange * 100) / 100;
  userObject.base = userBase;
  userObject.price = userPrice;
  userObject.volume = userVol;
  userObject.change = userChange;
  userObject.target = userTarget;
  userObject.color = userColor;
  return userObject;
}

function getDataForUser(object) {
  $accessLoadSignal.className = 'table-loader-signal d-flex justify-content-center';
  var newReq4 = new XMLHttpRequest();
  newReq4.open('GET', 'https://api.cryptonator.com/api/ticker/' + object.ticker + '-' + object.target);
  newReq4.responseType = 'json';
  newReq4.addEventListener('load', function () {
    if (newReq4.response.success === false) {
      $accessLoadSignal.className = 'hidden';
      displayAlert();
      $getInfoFromSubmission.reset();
    } else {
      data.tables.unshift(object);
      data.nextTableId++;
      var userDataObject = getData(newReq4.response.ticker);
      var tableID = object.tableID;
      userDataObject.tableID = tableID;
      $accessLoadSignal.className = 'hidden';
      displayUserTable(userDataObject, false);
    }
  });
  newReq4.send();
}
function reGetDataForUser(object) {
  $accessLoadSignal.className = 'table-loader-signal d-flex justify-content-center';
  var newReq5 = new XMLHttpRequest();
  newReq5.open('GET', 'https://api.cryptonator.com/api/ticker/' + object.ticker + '-' + object.target);
  newReq5.responseType = 'json';
  newReq5.addEventListener('load', function () {
    if (newReq5.response.success === false) {
      $accessLoadSignal.className = 'hidden';
      displayAlert();
      $getInfoFromSubmission.reset();
    } else {
      var reGetID = object.tableID;
      var reGetObject = getData(newReq5.response.ticker);
      reGetObject.tableID = reGetID;
      $accessLoadSignal.className = 'hidden';
      displayUserTable(reGetObject, false);
      var validtoStore = true;
      return validtoStore;
    }
  });
  newReq5.send();
}

function getEditDataForUser(object, tableID) {
  $accessLoadSignal.className = 'table-loader-signal d-flex justify-content-center';
  var newReq5 = new XMLHttpRequest();
  newReq5.open('GET', 'https://api.cryptonator.com/api/ticker/' + object.ticker + '-' + object.target);
  newReq5.responseType = 'json';
  newReq5.addEventListener('load', function () {
    if (newReq5.response.success === false) {
      $accessLoadSignal.className = 'hidden';
      displayAlert();
      $getInfoFromSubmission.reset();
    } else {
      $accessLoadSignal.className = 'hidden';
      var specifiedTable = tableID;
      var $replaceTable = document.querySelector('[data-view="' + specifiedTable + '"]');
      for (var index = 0; index < data.tables.length; index++) {
        var retrieveCorrectTable = data.tables[index].tableID;
        if (tableID === retrieveCorrectTable) {
          data.tables[index] = object;
        }
      }
      var editTableID = object.tableID;
      var editUserObject = getData(newReq5.response.ticker);
      editUserObject.tableID = editTableID;
      var tempReplace = createTableTree(editUserObject, false);
      for (var i = 0; i < data.tables.length; i++) {
        var retrievereplacementTable = data.tables[i].tableID;
        if (tableID === retrievereplacementTable) {
          $replaceTable.replaceWith(tempReplace);
        }
      }
    }
  });
  newReq5.send();
}
function trimData(array) {
  var trimmedList = [];
  for (var i = 0; i < 4; i++) {
    var mrktObject = {};
    var market = array[i].market;
    var price = array[i].price;
    price = Math.round(price * 100) / 100;
    mrktObject.market = market;
    mrktObject.price = price;
    trimmedList.push(mrktObject);
  }
  return trimmedList;
}

function getDataForComparison(object) {
  $accessLoadSignal.className = 'table-loader-signal d-flex justify-content-center';
  var newReq2 = new XMLHttpRequest();
  newReq2.open('GET', 'https://api.cryptonator.com/api/full/' + object.ticker + '-' + object.target);
  newReq2.responseType = 'json';
  newReq2.addEventListener('load', function () {
    if (newReq2.response.success === false) {
      $accessLoadSignal.className = 'hidden';
      displayAlert();
      $getInfoFromComparison.reset();
    } else {
      $accessLoadSignal.className = 'hidden';
      var compareID = data.nextMarketID;
      var userDataObject = {};
      var userDataTicker = newReq2.response.ticker.base;
      var userDataList = trimData(newReq2.response.ticker.markets);
      var userDataTarget = newReq2.response.ticker.target;
      userDataObject.ticker = userDataTicker;
      userDataObject.list = userDataList;
      userDataObject.target = userDataTarget;
      userDataObject.color = '#017bff';
      userDataObject.marketID = compareID;
      displayVendorTable(userDataObject);
      data.marketTables.unshift(userDataObject);
      data.nextMarketID++;
    }
  });
  newReq2.send();
}
function reGetComparisonTable(object) {
  $accessLoadSignal.className = 'table-loader-signal d-flex justify-content-center';
  var newReq3 = new XMLHttpRequest();
  newReq3.open('GET', 'https://api.cryptonator.com/api/full/' + object.ticker + '-' + object.target);
  newReq3.responseType = 'json';
  newReq3.addEventListener('load', function () {
    if (newReq3.response.success === false) {
      $accessLoadSignal.className = 'hidden';
      displayAlert();
      $getInfoFromComparison.reset();
    } else {
      $accessLoadSignal.className = 'hidden';
      var compareID = object.marketID;
      var userDataObject = {};
      var userDataTicker = newReq3.response.ticker.base;
      var userDataList = trimData(newReq3.response.ticker.markets);
      var userDataTarget = newReq3.response.ticker.target;
      userDataObject.ticker = userDataTicker;
      userDataObject.list = userDataList;
      userDataObject.target = userDataTarget;
      userDataObject.color = '#017bff';
      userDataObject.marketID = compareID;
      displayVendorTable(userDataObject);
    }
  });
  newReq3.send();
}
function retrieveEditComparisonTable(object, compareTableID) {
  $accessLoadSignal.className = 'table-loader-signal d-flex justify-content-center';

  var newReq4 = new XMLHttpRequest();
  newReq4.open('GET', 'https://api.cryptonator.com/api/full/' + object.ticker + '-' + object.target);
  newReq4.responseType = 'json';
  newReq4.addEventListener('load', function () {
    if (newReq4.response.success === false) {
      $accessLoadSignal.className = 'hidden';
      displayAlert();
      $getInfoFromComparison.reset();
    } else {
      $accessLoadSignal.className = 'hidden';
      var tableID = compareTableID;
      var $replaceCompareTable = document.querySelector('[data-view="' + tableID + '"]');
      for (var index = 0; index < data.marketTables.length; index++) {
        var retrieveCorrectTable = data.marketTables[index].marketID;
        if (tableID === retrieveCorrectTable) {
          data.marketTables[index] = object;
        }
      }
      var userDataObject = {};
      var userDataTicker = newReq4.response.ticker.base;
      var userDataList = trimData(newReq4.response.ticker.markets);
      var userDataTarget = newReq4.response.ticker.target;
      userDataObject.ticker = userDataTicker;
      userDataObject.list = userDataList;
      userDataObject.target = userDataTarget;
      userDataObject.color = '#017bff';
      userDataObject.marketID = tableID;
      var tempCompareTable = compareTableTree(userDataObject);
      for (var i = 0; i < data.marketTables.length; i++) {
        var retrieveReplacementTable = data.marketTables[i].marketID;
        if (tableID === retrieveReplacementTable) {
          $replaceCompareTable.replaceWith(tempCompareTable);
        }
      }
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
function createNetworkAlert(event) {
  var createDiv = document.createElement('div');
  createDiv.className = 'col-8 col-lg-4 alert alert-danger alert-dismissible fade show';
  createDiv.setAttribute('role', 'alert');

  var createH4 = document.createElement('h4');
  createH4.className = 'alert-heading';
  createH4.textContent = 'Network Connection Issue';
  createDiv.appendChild(createH4);

  var createSpan = document.createElement('span');
  createSpan.textContent = 'Please check your internet connection and try again. If the issue persists, please try again later.';
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

function displayNetworkAlert() {
  var $grabAlertPackage = document.querySelector('.alert-package');
  var newAlert = createNetworkAlert();
  $grabAlertPackage.appendChild(newAlert);
}

window.addEventListener('load', restoreTables);
window.addEventListener('load', vendorTables);
function restoreTables(event) {
  for (var index = 0; index < data.tables.length; index++) {
    reGetDataForUser(data.tables[index]);
  }
}
function vendorTables(event) {
  for (var index = 0; index < data.marketTables.length; index++) {
    reGetComparisonTable(data.marketTables[index]);
  }
}
function compareTableTree(object) {
  var createDivCompare = document.createElement('div');
  createDivCompare.setAttribute('class', 'col-8 col-lg-4');
  createDivCompare.setAttribute('data-view', object.marketID);

  var createTableElement = document.createElement('table');
  createTableElement.setAttribute('class', 'table table-striped table-hover');
  createDivCompare.appendChild(createTableElement);

  var createTableHead = document.createElement('thead');
  createTableElement.appendChild(createTableHead);
  var createTableRow = document.createElement('tr');
  createTableHead.appendChild(createTableRow);
  var createTh = document.createElement('th');
  createTh.setAttribute('colspan', '2');
  createTh.setAttribute('style', 'color: ' + object.color);
  createTableRow.appendChild(createTh);

  var createSpanAlpha = document.createElement('span');
  createSpanAlpha.className = 'table-header d-flex justify-content-between table-header';
  createSpanAlpha.textContent = object.ticker + ' Markets';
  createTh.appendChild(createSpanAlpha);

  var createIconButton = document.createElement('button');
  createIconButton.className = 'btn btn-outline-primary rounded fas fas-compare fa-pencil-alt';
  createSpanAlpha.appendChild(createIconButton);

  var createTableBody = document.createElement('tbody');
  createTableElement.appendChild(createTableBody);

  var createTableRowTwo = document.createElement('tr');
  createTableBody.appendChild(createTableRowTwo);

  var createTableCellOne = document.createElement('td');
  createTableCellOne.setAttribute('class', 'description');
  createTableCellOne.textContent = object.list[0].market;
  createTableRowTwo.appendChild(createTableCellOne);

  var createTableCellTwo = document.createElement('td');
  createTableCellTwo.setAttribute('class', 'col-5');
  createTableCellTwo.textContent = object.list[0].price + ' ' + object.target;
  createTableRowTwo.appendChild(createTableCellTwo);

  var createTableRowThree = document.createElement('tr');
  createTableBody.appendChild(createTableRowThree);

  var createTableCellThree = document.createElement('td');
  createTableCellThree.setAttribute('class', 'description');
  createTableCellThree.textContent = object.list[1].market;
  createTableRowThree.appendChild(createTableCellThree);

  var createTableCellFour = document.createElement('td');
  createTableCellFour.textContent = object.list[1].price + ' ' + object.target;
  createTableRowThree.appendChild(createTableCellFour);

  var createTableRowFour = document.createElement('tr');
  createTableBody.appendChild(createTableRowFour);

  var createTableCellFive = document.createElement('td');
  createTableCellFive.setAttribute('class', 'description');
  createTableCellFive.textContent = object.list[2].market;
  createTableRowFour.appendChild(createTableCellFive);

  var createTableCellSix = document.createElement('td');
  createTableCellSix.textContent = object.list[2].price + ' ' + object.target;
  createTableRowFour.appendChild(createTableCellSix);

  var createTableRowFive = document.createElement('tr');
  createTableBody.appendChild(createTableRowFive);

  var createTableCellSeven = document.createElement('td');
  createTableCellSeven.setAttribute('class', 'description');
  createTableCellSeven.textContent = object.list[3].market;
  createTableRowFive.appendChild(createTableCellSeven);

  var createTableCellEight = document.createElement('td');
  createTableCellEight.textContent = object.list[3].price + ' ' + object.target;
  createTableRowFive.appendChild(createTableCellEight);
  return createDivCompare;
}
function displayVendorTable(object) {
  var $headDiv = document.querySelector('.compare-table');
  var newCompareTable = compareTableTree(object);
  $headDiv.prepend(newCompareTable);
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
function goBackTables(event) {
  data.editing = null;
  $grabTheDeletion.classList.add('hidden');
  switchViews('show-tables');
  resetFormToDefault();
}
function goToFormPage(event) {
  switchViews('table-form');
}
function compareForm(event) {
  switchViews('comparison-form');
}
function closeComparison(event) {
  data.marketEditing = null;
  $grabCompDeleteButton.classList.add('hidden');
  resetComparisonFormToDefault();
  switchViews('show-tables');
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
    getDataForUser(inputInfo);
    $getInfoFromSubmission.reset();

  } else {
    var editInputInfo = {};
    var editTickerValue = $getInfoFromSubmission.elements.ticker.value;
    var editTargetValue = $getInfoFromSubmission.elements.target.value;
    var grabtheTableValue = data.editing;
    editInputInfo.ticker = editTickerValue;
    editInputInfo.target = editTargetValue;
    editInputInfo.tableID = grabtheTableValue;
    getEditDataForUser(editInputInfo, grabtheTableValue);
    data.editing = null;
  }
  resetFormToDefault();
  goBackTables();
}
function getComparisonInputData(event) {
  event.preventDefault();
  if (data.marketEditing === null) {
    var tokenOne = {};
    var tokenOneTicker = $getInfoFromComparison.elements.ticker.value;
    var tokensTarget = $getInfoFromComparison.elements.target.value;
    tokenOne.ticker = tokenOneTicker;
    tokenOne.target = tokensTarget;
    getDataForComparison(tokenOne);
  } else {
    var editTokenOne = {};
    var editTokenOneTicker = $getInfoFromComparison.elements.ticker.value;
    var editTokensTarget = $getInfoFromComparison.elements.target.value;
    var grabCompareToken = data.marketEditing;
    editTokenOne.ticker = editTokenOneTicker;
    editTokenOne.target = editTokensTarget;
    editTokenOne.marketID = grabCompareToken;
    retrieveEditComparisonTable(editTokenOne, grabCompareToken);
    data.marketEditing = null;
  }
  resetComparisonFormToDefault();
  switchViews('show-tables');
}
function editTable(object) {
  $grabformTicker.setAttribute('value', object.ticker);
  $grabformTarget.setAttribute('value', object.target);
  $grabformSubmission.textContent = 'Update';
  $grabTheDeletion.classList.remove('hidden');
  data.editing = object.tableID;
}
function editComparisonTable(object) {
  $grabCompTicker.setAttribute('value', object.ticker);
  $grabCompTarget.setAttribute('value', object.target);
  $grabCompSubmission.textContent = 'Update';
  $grabCompDeleteButton.classList.remove('hidden');
  data.marketEditing = object.marketID;
}
function findComparisonTable() {
  if (event.target.tagName === 'BUTTON') {
    var $closestIdiom = event.target.closest('DIV');
    $closestIdiom = $closestIdiom.getAttribute('data-view');
    $closestIdiom = parseInt($closestIdiom);
    for (var i = 0; i < data.marketTables.length; i++) {
      var retrieveCorrectTable = data.marketTables[i].marketID;
      if (retrieveCorrectTable === $closestIdiom) {
        var editCompTable = data.marketTables[i];
        editComparisonTable(editCompTable);
        compareForm();
      }
    }
  }
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
function bringWarning() {
  switchViews('warning-form');
}

function cancelWarning() {
  goToFormPage();
}
function bringWarningComparison() {
  switchViews('warning-form-comparison');
}
function resetFormToDefault() {
  $grabformTicker.setAttribute('value', '');
  $grabformTarget.setAttribute('value', '');
  $grabformSubmission.textContent = 'Submit';
}
function resetComparisonFormToDefault() {
  $grabCompTicker.setAttribute('value', '');
  $grabCompTarget.setAttribute('value', '');
  $grabCompSubmission.textContent = 'Submit';
}

function deleteTable(event) {
  var whichTable = data.editing;
  var $replaceTable = document.querySelector('[data-view="' + whichTable + '"]');
  if (whichTable !== null) {
    for (var i = 0; i < data.tables.length; i++) {
      var retrieveCorrectTable = data.tables[i].tableID;
      if (retrieveCorrectTable === whichTable) {
        data.tables.splice(i, 1);
        $replaceTable.remove();
        data.editing = null;
        goBackTables();
      }
    }
  }
}
function deleteComparisonTable(event) {
  var whichComparisonTable = data.marketEditing;
  var $replaceCompareTable = document.querySelector('[data-view="' + whichComparisonTable + '"]');
  if (whichComparisonTable !== null) {
    for (var i = 0; i < data.marketTables.length; i++) {
      var retrieveCorrectTable = data.marketTables[i].marketID;
      if (retrieveCorrectTable === whichComparisonTable) {
        data.marketTables.splice(i, 1);
        $replaceCompareTable.remove();
        data.marketEditing = null;
        goBackTables();
      }
    }
  }
}
var $getInfoFromSubmission = document.querySelector('#get-table-form');
$getInfoFromSubmission.addEventListener('submit', gatherInputData);
var $awaitEdit = document.querySelector('.user-table');
$awaitEdit.addEventListener('click', findTable);

var $grabformTicker = document.querySelector('#table-ticker');
var $grabformTarget = document.querySelector('#table-target');
var $grabformSubmission = document.querySelector('#submit');

var $grabCompTicker = document.querySelector('#comparison-ticker');
var $grabCompTarget = document.querySelector('#comparison-target');
var $grabCompSubmission = document.querySelector('#submitComparison');

var $grabCompDeleteButton = document.querySelector('.warning-button-two');
$grabCompDeleteButton.addEventListener('click', bringWarningComparison);

var $grabTheDeletion = document.querySelector('.warning-button-one');
$grabTheDeletion.addEventListener('click', bringWarning);

var $cancelDeletion = document.querySelector('.cancel-deletion');
$cancelDeletion.addEventListener('click', cancelWarning);

var $deleteTheTable = document.querySelector('.delete-table-button');
$deleteTheTable.addEventListener('click', deleteTable);

var $activateComparisonForm = document.querySelector('.comparison-creator');
$activateComparisonForm.addEventListener('click', compareForm);

var $closeComparisonForm = document.querySelector('.close-comparison');
$closeComparisonForm.addEventListener('click', closeComparison);

var $getInfoFromComparison = document.querySelector('#get-comparison-form');
$getInfoFromComparison.addEventListener('submit', getComparisonInputData);

var $acessCompareTable = document.querySelector('.compare-table');
$acessCompareTable.addEventListener('click', findComparisonTable);

var $comparisonDeleteButton = document.querySelector('.cancel-deletion-comparison');
$comparisonDeleteButton.addEventListener('click', compareForm);

var $deleteComparisonTable = document.querySelector('.delete-comparison-button');
$deleteComparisonTable.addEventListener('click', deleteComparisonTable);

var $accessLoadSignal = document.querySelector('.table-loader-signal');
