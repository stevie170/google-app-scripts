// Google App Script to automate Intake Form Submission
//    and Consent Form electronic signatures
// by Stevie Bird

function telehealthConsent(e) {
  
  // Don't forget to set up the trigger for the spreasheet to be On Form Submit
  // Customize the value variables to match each column on the submission spreadsheet for the form
  var timestamp = e.values[0]; 
  var clientFullName = e.values[1];
  var parentName = e.values[2];
  var phoneNum = e.values[3];
  var emailAddr = e.values[4];
  var consentTeleSigCheck = e.values[5]; // maybe I don't need this?
  var consentTeleSigName = e.values[6];

  // renumber all of these values ^^^ if the form changes... 
  
  // pull the date and time out of the timestamp
  var timestampString = JSON.stringify(timestamp) // make sure the timestamp is a string
  var timestampArray = [];
  timestampArray = timestampString.split(" ");
  var submitDate = timestampArray[0];
  var submitTime = timestampArray[1];

  // remove two slashes from the date and turn them into dashes to add the date to the filename  
  var dashDate = submitDate;
  if (dashDate.indexOf("/") !== -1) { 
    dashDate = dashDate.replace("/","-");   
  }  
  if (submitDate.indexOf("/") !== -1) { 
    dashDate = dashDate.replace("/","-");   
  }  

  // remove two colons from the time and turn them into dashes to add the time to the filename  
  var dashTime = submitTime;
  if (dashTime.indexOf(":") !== -1) { 
    dashTime = dashTime.replace(":","-");   
  }  
  if (submitTime.indexOf(":") !== -1) { 
    dashTime = dashTime.replace(":","-");   
  }  

  var rootFolder = DriveApp.getFolderById("IDNUMBERGOESHERE") // change this to match the id of the root folder where you want to create client files
  
  // find the client folder within the root folder, or create it if it's not there 
  var templateResponseFolder = getFolder(clientFullName, true, rootFolder); 
  
  // point to the template documents  
  // change the url id numbers to match the id of each Google Doc to be used as a template
  var templateFileForms = DriveApp.getFileById("IDNUMBERGOESHERE");  

  //
  // this next section is to create and populate the Telehealth consent form document 
  //

  // create the file by copying from the template
  var copy = templateFileForms.makeCopy(clientFullName + " " + "Signed Telehealth Consent" + " " + dashDate + " " + dashTime, templateResponseFolder); 
  var doc = DocumentApp.openById(copy.getId())   // get the document from the file
  var body = doc.getBody(); // access the body of the document
  
  // Customize the text tags to match the text tags in the template document
  
  // replace the text tags for the required fields with information submitted from the form
  body.replaceText("{{Submission Date}}", timestamp);
  body.replaceText("{{Client Name}}", clientFullName);
  body.replaceText("{{Email Address}}", "Email address: " + emailAddr);
  body.replaceText("{{Phone Number}}", "Phone number: " + phoneNum);
  body.replaceText("{{Signature}}", consentTeleSigName);
  body.replaceText("{{Timestamp}}", timestamp);

  // if the fields are not required on the form, only put them in the doc if responses were submitted
  if(parentName !== ""){
    body.replaceText("{{Parent Name}}", "If client is a minor, Parent Name: " + parentName);
  }else{
    body.replaceText("{{Parent Name}}", "");
  } 


  // end of replacing text tags in the document
  
  // remove empty paragraphs from the document
  removeEmptyParagraphs(body);

  doc.saveAndClose();  // save and close the document

  // save the doc as a pdf file
  var blobPdf = copy.getAs(MimeType.PDF);
  templateResponseFolder.createFile(blobPdf).setName(clientFullName + " " + "Signed Telehealth Consent" + " " + dashDate + " " + dashTime + "-pdf");
 
  // remove the doc and just keep the pdf
  try{
    templateResponseFolder.removeFile(DriveApp.getFileById(copy.getId()));
    console.log("Doc successfully removed."); 
  }catch(err){
    // The ApiException status code indicates the detailed failure reason.
    console.log("Doc not removed. Error: " + err); 
  } 

  // send a confirmation email 
  // get just the first name for the greeting
  sigFirstName = consentTeleSigName.split(/\s(.+)/)[0];
  MailApp.sendEmail(emailAddr, "Thank you for completing your telehealth consent form", "Dear " + sigFirstName + ",\n\nThank you for submitting your telehealth consent form. We look forward to seeing you soon. \n\nIf you have any questions please feel free to contact us. We recommend contacting your therapist directly, or you may call the number below. \n\nSincerely, \nPRACTICE NAME\nPHONE NUMBER\nADDRESS\nEMAIL OR WEB ADDRESS");

}

// a function to get or create a folder
// parameters: name = string 'name of folder'
//             create = Boolean (whether we should automatically create the folder if we don't find it) 
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

// function to remove empty paragraphs from a document
// pass in the body of the document you want to remove whitespace from
function removeEmptyParagraphs(docBody) {
  var paras = docBody.getParagraphs();
  var l = paras.length - 1;
  for (var i = 0; i < l; i++) {
    // clean up paragraphs that only contain whitespace
    paras[i].replaceText("^\\s+$", ""); 
    // remove blank paragraphs
    if (paras[i].getText() === ""){
      paras[i].removeFromParent();
    }
  }
}
