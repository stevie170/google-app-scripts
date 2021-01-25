// Google App Script to automate Generation of a School and Work Excuse Note
//     
// by Stevie Bird

function excuseNoteGenerator(e) {
  
  // Don't forget to set up the trigger for the spreasheet to be On Form Submit
  // Customize the value variables to match each column on the submission spreadsheet for the form
  var timestamp = e.values[0]; 
  var clientFullName = e.values[1];
  var sessionDate = e.values[2];
  var sessionTime = e.values[3];
  var emailYN = e.values[4];
  var emailAddr = e.values[5];

  
  // renumber all of these values ^^^ if the form changes... 

  // format the session date: 
  // pull the month, day, and year out of the date and format it yyyy-mm-dd
  var dateArray = [];
  dateArray = sessionDate.split("/");
  var dateMonth = dateArray[0];
  var dateDay = dateArray[1];
  var dateYear = dateArray[2];
  if(1 <= dateMonth <= 9){
    dateMonth = "0" + dateMonth;
  }
  if(1 <= dateDay <= 9){
    dateDay = "0" + dateDay;
  }
  var formattedSessionDate = dateYear + "-" + dateMonth + "-" + dateDay;

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
  
  // validate the email addresses
  var sendEmail = "";
  if(validateEmail(emailAddr)){
    console.log("Email address has been validated.");
    sendEmail = "yes";
  }else{
    console.log("Email address is invalid.");
    emailAddr = "invalid email entered: " + emailAddr;
    sendEmail = "";
  }
  

  var rootFolder = DriveApp.getFolderById("IDNUMBERGOESHERE")  // change the url id number to match the id of the folder
  
  // find the client folder within the root folder, or create it if it's not there 
  var templateResponseFolder = getFolder(clientFullName, true, rootFolder); 
  
  // point to the template documents  
  // change the url id numbers to match the id of each Google Doc to be used as a template
  var templateFileForms = DriveApp.getFileById("IDNUMBERGOESHERE");  

  //
  // this next section is to create and populate the Telehealth consent form document 
  //

  // create the file by copying from the template
  var copy = templateFileForms.makeCopy(clientFullName + " " + "Excuse Note" + " " + formattedSessionDate + " " + timestampNumsOnly, templateResponseFolder); 
  var doc = DocumentApp.openById(copy.getId());   // get the document from the file
  var body = doc.getBody(); // access the body of the document
  
  // Customize the text tags to match the text tags in the template document
  
  // replace the text tags for the required fields with information submitted from the form
  body.replaceText("{{Client Full Name}}", clientFullName);
  body.replaceText("{{Date}}", sessionDate);
  body.replaceText("{{Time}}", sessionTime);
  
  doc.saveAndClose();

  // save the doc as a pdf file
  var blobPdf = copy.getAs(MimeType.PDF);
  templateResponseFolder.createFile(blobPdf).setName(clientFullName + " " + "Excuse Note" + " " + formattedSessionDate + " " + timestampNumsOnly + "-pdf");
  // var newPdf =  // I had this at the front of the previous line, checking to see if the script needs it, I'm pretty sure it doesn't

  // remove the doc and just keep the pdf
  try{
    templateResponseFolder.removeFile(DriveApp.getFileById(copy.getId()));
    console.log("Doc successfully removed."); 
  }catch(err){
    // The ApiException status code indicates the detailed failure reason.
    console.log("Doc not removed. Error: " + err); 
  }
  
  // email the excuse note pdf 
  
  if(emailYN == "Yes"){
    if(sendEmail == "yes"){
      // create the content for the email
      var emailFrom = "NAME TO GO IN FROM:";
      var emailSubject = "School/Work Excuse Note";
      var emailGreeting = "To Whom It May Concern:\n\n";
      var emailContent = "Please see the attached file. \n\nIf you have any questions please contact your therapist.";
      var emailSignature = "\n\nSincerely, \nSIGNATURE LINE INFO HERE";
      var file = DocumentApp.openById(copy.getId());
      // send the email - try/catch is for in case there is an error
      try {
        MailApp.sendEmail(emailAddr, emailSubject, emailGreeting + emailContent + emailSignature, {name: emailFrom, attachments: [blobPdf]});
        // name: this specifies the name of the sender, default is User's Name
        // attachments: an array of files to send with the email
        console.log("Email sent successfully.");
      }catch (err) {
        // The ApiException status code indicates the detailed failure reason.
        console.log("No email sent: " + err);
      }
    }else{
      console.log("Invalid email address entered, no email sent.");
    } 
  }

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

// a function to validate the email address
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

