function autoFillGoogleDocFromForm(e) {  // e is the parameter passed in by Google Drive that contains the submissions from the submitted form
  // create a variable for each value in the respoise from the event parameter e
  // 0 index of the array will reference the first column of the spreadsheet
  var timestamp = e.values[0]; 
  var firstName = e.values[1];
  var lastName = e.values[2];
  var title = e.values[3];
  
  // get a reference to our Template google doc
  var templateFile = DriveApp.getFileById("googlefileidfromurlgoeshere");
  
  // get a reference to the folder we want to create our doc in
  var templateResponseFolder = DriveApp.getFolderById("googlefileidfromurlgoeshere");
  
  var copy = templateFile.makeCopy(lastName + ", " + firstName, templateResponseFolder);
  var doc = DocumentApp.openById(copy.getId())  // open the doc in google docs; it was in google drive
  
  var body = doc.getBody();
  
  body.replaceText("{{FirstName}}", firstName);
  body.replaceText("{{LastName}}", lastName);
  body.replaceText("{{Title}}", title);

  doc.saveAndClose();
  
} 

