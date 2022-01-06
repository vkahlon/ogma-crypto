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
    displayTable(bigObject, true);
  });
  newReq.send();
}

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
  var newReq4 = new XMLHttpRequest();
  newReq4.open('GET', 'https://api.cryptonator.com/api/ticker/' + object.ticker + '-' + object.target);
  newReq4.responseType = 'json';
  newReq4.addEventListener('load', function () {
    if (newReq4.response.success === false) {
      displayAlert();
      $getInfoFromSubmission.reset();
    } else {
      data.tables.unshift(object);
      data.nextTableId++;
      var userDataObject = getData(newReq4.response.ticker);
      var tableID = object.tableID;
      userDataObject.tableID = tableID;
      displayUserTable(userDataObject, false);
    }
  });
  newReq4.send();
}
function reGetDataForUser(object) {
  var newReq5 = new XMLHttpRequest();
  newReq5.open('GET', 'https://api.cryptonator.com/api/ticker/' + object.ticker + '-' + object.target);
  newReq5.responseType = 'json';
  newReq5.addEventListener('load', function () {
    if (newReq5.response.success === false) {
      displayAlert();
      $getInfoFromSubmission.reset();
    } else {
      var reGetID = object.tableID;
      var reGetObject = getData(newReq5.response.ticker);
      reGetObject.tableID = reGetID;
      displayUserTable(reGetObject, false);
      var validtoStore = true;
      return validtoStore;
    }
  });
  newReq5.send();
}

function getEditDataForUser(object, tableID) {
  var newReq5 = new XMLHttpRequest();
  newReq5.open('GET', 'https://api.cryptonator.com/api/ticker/' + object.ticker + '-' + object.target);
  newReq5.responseType = 'json';
  newReq5.addEventListener('load', function () {
    if (newReq5.response.success === false) {
      displayAlert();
      $getInfoFromSubmission.reset();
    } else {
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
    reGetDataForUser(data.tables[index]);
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

function goBackTables(event) {
  $grabTheDeletion.classList.add('hidden');
  switchViews('show-tables');
  resetFormToDefault();
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
function editTable(object) {
  $grabformTicker.setAttribute('value', object.ticker);
  $grabformTarget.setAttribute('value', object.target);
  $grabformSubmission.textContent = 'Update';
  $grabTheDeletion.classList.remove('hidden');
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
function bringWarning() {
  switchViews('warning-form');
}

function cancelWarning() {
  goToFormPage();
}
function resetFormToDefault() {
  $grabformTicker.setAttribute('value', '');
  $grabformTarget.setAttribute('value', '');
  $grabformSubmission.textContent = 'Submit';

}
var $getInfoFromSubmission = document.querySelector('#get-table-form');
$getInfoFromSubmission.addEventListener('submit', gatherInputData);
var $awaitEdit = document.querySelector('.table-holder');
$awaitEdit.addEventListener('click', findTable);

var $grabformTicker = document.querySelector('#table-ticker');
var $grabformTarget = document.querySelector('#table-target');
var $grabformSubmission = document.querySelector('#submit');

var $grabTheDeletion = document.querySelector('.btn-outline-danger');
$grabTheDeletion.addEventListener('click', bringWarning);

var $cancelDeletion = document.querySelector('.btn-outline-secondary');
$cancelDeletion.addEventListener('click', cancelWarning);
