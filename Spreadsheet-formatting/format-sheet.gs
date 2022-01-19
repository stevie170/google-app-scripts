function onOpen() {  // when the file opens, add a custom menu
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
      .addItem('Format Square CSV Data', 'formatSquareCsvData') 
      // when the menu is clicked, run the formatSquareCsvData function
      .addToUi();
}

function formatSquareCsvData() {
  
}
