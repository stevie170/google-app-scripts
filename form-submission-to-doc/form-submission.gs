function sessionNoteSubmission(e) {
  
  // Don't forget to set up the trigger for the spreasheet to be On Form Submit
  // Customize the value variables to match each column on the submission spreadsheet for the form
  var timestamp = e.values[0]; 
  var clientFirstName = e.values[1];
  var clientLastName = e.values[2];
  var sessionDate = e.values[3];
  var sessionTime = e.values[4]; 
  var sessionType = e.values[5];
  var assessment = e.values[6];
  var sessionRecap = e.values[7];
  var homework = e.values[8];
  var followupYN = e.values[9];
  var followupNotes = e.values[10];

  // remove two slashes from the date and turn them into dashes to add the date to the filename  
  var dashDate = sessionDate;
  if (dashDate.indexOf("/") !== -1) { 
    dashDate = dashDate.replace("/","-");   
  }  
  if (sessionDate.indexOf("/") !== -1) { 
    dashDate = dashDate.replace("/","-");   
  }  
  
  var create = true;
  var rootFolder = DriveApp.getFolderById("1OnhPmXoO9ZmukVj8RAWcm72nM3fm6MHJ") // change this to match the id of the root folder where you want to create client files
  
  // change this to find the client folder and create it if it's not there
  // var templateResponseFolder = DriveApp.getFolderById("1OnhPmXoO9ZmukVj8RAWcm72nM3fm6MHJ");
  
  // find or create client folder 
  var templateResponseFolder = getFolder(clientFirstName + clientLastName, true, rootFolder); 
  
  // point to the template document  
  var templateFile = DriveApp.getFileById("1Wh7JkUVFBHG32TFuAeJ75REA5q11G3r9RjQfCjYX030");  // change this to match the id of the Google Doc to be used as a template
  
  var copy = templateFile.makeCopy(clientFirstName + " " + clientLastName + " " + dashDate, templateResponseFolder); 
  var doc = DocumentApp.openById(copy.getId())   
  
  var body = doc.getBody();
  
  // Customize the text tags to match the text tags in the template document
  
  body.replaceText("{{NoteTime}}", timestamp);
  body.replaceText("{{ClientName}}", clientFirstName + " " + clientLastName);
  body.replaceText("{{Date}}", sessionDate);
  body.replaceText("{{StartTime}}", sessionTime);
  body.replaceText("{{Recap}}", sessionRecap);
  body.replaceText("{{Therapist}}", Session.getActiveUser().getEmail())
  
  // if the fields are not required on the form, only put them in the doc if responses were submitted
  
  if(sessionType !== ""){
    body.replaceText("{{Type}}", "Type of Session: " + "\n\n" + sessionType);
   }else{
    body.replaceText("{{Type}}", "");
  } 
  
  if(assessment !== ""){
    body.replaceText("{{Assessment}}", "Assessment:" + "\n\n" + assessment);
  }else{
    body.replaceText("{{Assessment}}", "");
  } 
  
  if(homework !== ""){
    body.replaceText("{{Homework}}", "Homework:" + "\n\n" + homework);
  }else{
    body.replaceText("{{Homework}}", "");
  } 
    
  if(followupYN == "Yes"){
    body.replaceText("{{Supervisor}}", "Notes for Follow-up with Supervisor:"+ "\n\n" + followupNotes);
  }else{
    body.replaceText("{{Supervisor}}", "");
  } 
  
  // end of replacing text tags in the document
  
  doc.saveAndClose();
  
}

// a function to get or create a folder
// parameters: name = string 'name of folder'
//             create = Boolean (whether we should aautomatically create the folder if we don't find it) 
//             root = location of where the folder should be searched for
function getFolder(name, create, root){

  // if no location was passed in, point to the root of the drive
  if(root == null){   
     root = DriveApp;    
  }
  
  var folderIter = root.getFoldersByName(name); // iterate the folders
  
  var folder = null; // create a new variable for the folder we're looking for and set it to null by default

  // if the folder iterator has a next object, set the folder variable equal to the folder iterator next item
  // the folder iterator will have a next object if it matches the name we passed in
  if(folderIter.hasNext()){  
    folder = folderIter.next();  
  }
  
  // if the folder is null AND if create is set to True
  // set the value of folder equal to root.createFolder and pass in the name
  // this ensures we always get a folder back whenever we automatically set create to Trud
  if(folder == null && create){   
    folder = root.createFolder(name);  
  }
  
  return folder;
 
}  
