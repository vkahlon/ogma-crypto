/* exported data */
var data = {
  view: 'table-form',
  tables: [],
  editing: null,
  nextTableId: 1
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
