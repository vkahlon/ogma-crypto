/* exported data */
var data = {
  view: 'table-form',
  tables: [],
  marketTables: [],
  marketEditing: null,
  editing: null,
  nextTableId: 1,
  nextMarketID: 100
};
window.addEventListener('beforeunload', retrieveData);
var previousEntriesJSON = localStorage.getItem('total-user-input');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}
function retrieveData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('total-user-input', dataJSON);
}
