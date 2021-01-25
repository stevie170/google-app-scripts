// Google App Script to automate Intake Form Submission
//    and Consent Form electronic signatures
// by Stevie Bird

function soapProgressNote(e) {
  
  // Don't forget to set up the trigger for the spreasheet to be On Form Submit
  // Customize the value variables to match each column on the submission spreadsheet for the form
  
  var timestamp = e.values[0]; 
  var clientFullName = e.values[1];
  var sessionDate = e.values[2];
  var sessionAttending = e.values[3];
  var sessionGoals = e.values[4];
  var complaint = e.values[5];
  var findings = e.values[6];
  var progress = e.values[7];
  var plansNext = e.values[8];

  // renumber all of these values ^^^ if the form changes... 
  
  // // format the session date: pull the month, day, and year out of the date and format it yyyy-mm-dd
  var sessionDateArray = [];
  sessionDateArray = sessionDate.split("/");
  var sessionMonth = sessionDateArray[0];
  var sessionDay = sessionDateArray[1];
  var sessionYear = sessionDateArray[2];
  if(1 <= sessionMonth <= 9){  // make it a 2-digit month
    sessionMonth = "0" + sessionMonth;
  }
  if(1 <= sessionDay <= 9){  // make it a 2-digit day
    sessionDay = "0" + sessionDay;
  }
  var formattedSessionDate = sessionYear + "-" + sessionMonth + "-" + sessionDay;

  // format the timestamp:
  // add it to the filename so there is no duplicate file
  var timestampArray = [];
  timestampArray = timestamp.split(" ");
  var timestampDate = timestampArray[0];
  var timestampTime = timestampArray[1];
  var timestampDateArray = [];
  timestampDateArray = timestampDate.split("/");
  var timestampTimeArray = [];
  timestampTimeArray = timestampTime.split(":");
  var timestampNumsOnly = timestampDateArray[0] + timestampDateArray[1] + timestampDateArray[2] + timestampTimeArray[0] + timestampTimeArray[1] + timestampTimeArray[2];

  // point to the folder where the Client files are stored
  var rootFolder = DriveApp.getFolderById("IDNUMBERGOESHERE") // change this to match the id of the root folder where you want to create client files
  
  // find the client folder within the root folder, or create it if it's not there 
  var templateResponseFolder = getFolder(clientFullName, true, rootFolder); 
  
  // point to the template document  
  // change the url id numbers to match the id of each Google Doc to be used as a template
  var templateFileNote = DriveApp.getFileById("IDNUMBERGOESHERE");  
  
  //
  // this next section is to create and populate the Notes document 
  //

  // create the file by copying from the template
  var copy = templateFileNote.makeCopy(clientFullName + " " + formattedSessionDate + " " + timestampNumsOnly, templateResponseFolder); 
  var doc = DocumentApp.openById(copy.getId())   // get the document from the file
  var body = doc.getBody(); // access the body of the document
  
  // Customize the text tags to match the text tags in the template document
  
  // replace the text tags  with information submitted from the form
  // if the fields are not required on the form, only put them in the doc if responses were submitted

  //  only use the client's first name
  var clientNameArray = [];
  clientNameArray = clientFullName.split(" ");
  var clientFirstName = clientNameArray[0];
  body.replaceText("{{Client First Name}}", clientFirstName);

  body.replaceText("{{Session Date}}", sessionDate);

  if(sessionAttending !== ""){  
    body.replaceText("{{Attending}}", sessionAttending);
  }else{
    body.replaceText("{{Attending}}", "");
  }

  if(sessionGoals !== ""){  
    body.replaceText("{{Goals}}", sessionGoals);
  }else{
    body.replaceText("{{Goals}}", "");
  }
  
if(complaint !== ""){  
    body.replaceText("{{Complaint}}", complaint);
  }else{
    body.replaceText("{{Complaint}}", "");
  }

if(findings !== ""){  
    body.replaceText("{{Findings}}", findings);
  }else{
    body.replaceText("{{Findings}}", "");
  }

if(progress !== ""){  
    body.replaceText("{{Progress}}", progress);
  }else{
    body.replaceText("{{Progress}}", "");
  }

if(plansNext !== ""){  
    body.replaceText("{{Next Session Plans}}", plansNext);
  }else{
    body.replaceText("{{Next Session Plans}}", "");
  }

  // end of replacing text tags in the document
  
  doc.saveAndClose();  // save and close the document
   
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
  // this ensures we always get a folder back whenever we automatically set create to True
  if(folder == null && create){   
    folder = root.createFolder(name);  
  }
  
  return folder;
 
}  
