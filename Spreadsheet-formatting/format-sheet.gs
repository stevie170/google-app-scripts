function onOpen() {  // when the file opens, add a custom menu
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
      .addItem('Format Square CSV Data', 'formatSquareCsvData') 
      // when the menu is clicked, run the formatSquareCsvData function
      .addToUi();
}

function formatSquareCsvData() {
  var spreadsheet = SpreadsheetApp.getActive(); // get the active spreadsheet
  var sheet = spreadsheet.getActiveSheet(); // get the active sheet
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();  // select all
  spreadsheet.getActiveRangeList().clearFormat(); // clear formatting on whole sheet
  
  // move the column with customer name to the left so it's more accessible
  spreadsheet.getRange('B:B').activate(); // highlight column B
  spreadsheet.getActiveSheet().insertColumnsBefore(spreadsheet.getActiveRange().getColumn(), 1); // insert a column before column B
  spreadsheet.getActiveRange().offset(0, 0, spreadsheet.getActiveRange().getNumRows(), 1).activate(); // highlight the new column
  spreadsheet.getRange('AK:AK').moveTo(spreadsheet.getActiveRange()); // move column AK into the new column
  
  // Hide unnecessary columns in the spreadsheet
  spreadsheet.getRange('C:D').activate(); // activate columns C through D
  spreadsheet.getActiveSheet().hideColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns()); // hide active columns
  spreadsheet.getRange('F:K').activate(); // activate columns F through K
  spreadsheet.getActiveSheet().hideColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns()); // hide active columns
  spreadsheet.getRange('N:U').activate(); // activate columns N through U
  spreadsheet.getActiveSheet().hideColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns()); // hide active columns
  spreadsheet.getRange('X:AE').activate(); // activate columns X through AE
  spreadsheet.getActiveSheet().hideColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns()); // hide active columns
  spreadsheet.getRange('AH:AV').activate(); // activate columns AH through AV
  spreadsheet.getActiveSheet().hideColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns()); // hide active columns
  
  // a little more formatting for readability
  spreadsheet.getRange('1:1').activate(); // activate row 1, header row
  spreadsheet.getActiveRangeList().setFontWeight('bold'); // make the header row bold
  // spreadsheet.getRange('V:V').activate().setFontColor('#ff0000'); // make the Fees column red - I'm opting not to do this for now
  spreadsheet.getRangeList(['E:E', 'L:L', 'M:M', 'V:V', 'W:W']).activate(); // activate the currency columns
  spreadsheet.getActiveRangeList().setNumberFormat('"$"#,##0.00')
  .setNumberFormat('_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)');  // format to accounting number format
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveRangeList().setNumberFormat('M/d/yyyy'); // format the date
  spreadsheet.getRange('B:M').activate();  
  spreadsheet.getActiveSheet().autoResizeColumns(1, 7); // resize the first 7 columns to data width
  spreadsheet.getRange('B:B').activate(); // activate column B
  spreadsheet.getActiveRangeList().setFontColor('ACCENT1'); // set color of customers to blue so they stand out
  sheet.getRange('1:1000').applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY); // format every other row light grey and header row dark grey
  

  // sort by date, ascending
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRange().offset(1, 0, spreadsheet.getActiveRange().getNumRows() - 1).sort({column: 1, ascending: true});

  spreadsheet.getRange('A2').activate(); // activate A:2 - this is just so that a single row isn't selected when the script finishes

}
