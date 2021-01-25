// Google App Script to automate Intake Form Submission
//    and Consent Form electronic signatures
//
// by Stevie Bird
//

function newClientFormSubmission(e) {
  
  // Don't forget to set up the trigger for the spreasheet to be On Form Submit

  // Customize the value variables to match each column on the form's responses spreadsheet
  var timestamp = e.values[0]; 
  var minorYN = e.values[1];

  // adult information form
  var clientFirstName = e.values[2];
  var clientLastName = e.values[3];
  var clientPrefName = e.values[4];
  var dateOfBirth = e.values[5];
  var clientAge = e.values[6]; 
  var clientGender = e.values[7];
  var mailingAddr  = e.values[8];
  var emailAddr = e.values[9];
  var emailConsent = e.values[10];
  var phoneNum = e.values[11];
  var phoneVoicemailConsent = e.values[12];
  var phoneTextConsent = e.values[13];

  // minor information form & intake questionnaire
  var minorFirstName = e.values[14];
  var minorLastName = e.values[15];
  var minorPrefName = e.values[16];
  var minorDateOfBirth = e.values[17];
  var minorAge = e.values[18]; 
  var minorGender = e.values[19];
  var parentName = e.values[20];
  var minorMailingAddr  = e.values[21];
  var parentEmail = e.values[22];
  var parentEmailConsent = e.values[23];
  var parentPhone = e.values[24];
  var parentPhoneVoicemailConsent = e.values[25];
  var parentPhoneTextConsent = e.values[26];
  var minorPhoneNum = e.values[27];
  var minorCallConsent = e.values[28];
  var minorVoicemailConsent = e.values[29];
  var minorTextConsent = e.values[30];
  var minorEmailAddr = e.values[31];
  var minorEmailConsent = e.values[32];
  var minorSchool = e.values[33];
  var minorGrade = e.values[34];
  var minorSiblingsYN = e.values[35];
  var minorSiblingsNum = e.values[36];
  var minorSiblingsNames = e.values[37];
  var minorMedsYN = e.values[38];
  var minorMedsList = e.values[39];
  var minorTherapyPast = e.values[40];
  var minorTherapyPastDetails = e.values[41];
  var minorFamilyHistory = e.values[42];
  var minorHospitalPast = e.values[43];
  var minorSuicideAttempt = e.values[44];
  var minorSuicideAttemptDetails = e.values[45];
  var minorSuicidalThoughts = e.values[46];
  var minorPastSixMonths = e.values[47];
  var minorHealthHistory = e.values[48];
  var minorTherapyReason = e.values[49];
  var minorReferral = e.values[50];

// adult intake questionnaire
  var maritalStatus = e.values[51];
  var maritalStatusLength = e.values[25];
  var partnerName = e.values[53];
  var partnerDOB = e.values[54];
  var childrenYN = e.values[55];
  var childrenNum = e.values[56];
  var childrenNames = e.values[57];
  var medsYN = e.values[58];
  var medsList = e.values[59];
  var pastTherapyYN = e.values[60];
  var pastTherapyDetails = e.values[61];
  var suicidalThoughts = e.values[62];
  var suicideAttempt = e.values[63];
  var suicideAttemptDetails = e.values[64];
  var harmfulThoughts = e.values[65];
  var drugUse = e.values[66];
  var alchoholUse = e.values[67];
  var familyHistory = e.values[68];
  var hospitalPast = e.values[69];
  var pastSixMonths = e.values[70];
  var healthHistory = e.values[71];
  var therapyReason = e.values[72];
  var therapyFears = e.values[73];
  var referral = e.values[74];

  // emergency contact (adults only)
  var iceName = e.values[75];
  var iceRelationship = e.values[76];
  var icePhone1 = e.values[77];
  var icePhone2 = e.values[78];

  // signatures
  var consentTreatSigCheck = e.values[79]; // do we need to do some kind of check on these checkboxes? They were required...
  var consentTreatSigName = e.values[80];
  var privacyPractSigCheck = e.values[81]; // do we need to do some kind of check on these checkboxes? They were required...
  var privacyPractSigName = e.values[82];

  // renumber all of these values ^^^ if the form changes... 
  
  // pull the date and time out of the timestamp
  var timestampArray = [];
  timestampArray = timestamp.split(" ");
  var submitDate = timestampArray[0];
  var submitTime = timestampArray[1];
  
  // format the date: pull the month, day, and year out of the date and format it yyyy-mm-dd
  var dateArray = [];
  dateArray = submitDate.split("/");
  var submitMonth = dateArray[0];
  var submitDay = dateArray[1];
  var submitYear = dateArray[2];
  if(1 <= submitMonth <= 9){
    submitMonth = "0" + submitMonth;
  }
  if(1 <= submitDay <= 9){
    submitDay = "0" + submitDay;
  }
  var formattedDate = submitYear + "-" + submitMonth + "-" + submitDay;

  // format the time: remove two colons from the time and turn them into dashes to add the time to the filename  
  var dashTime = submitTime;
  if (dashTime.indexOf(":") !== -1) { 
    dashTime = dashTime.replace(":","-");   
  }  
  if (submitTime.indexOf(":") !== -1) { 
    dashTime = dashTime.replace(":","-");   
  }  

  // decide if the client is a minor or not, then make sure all the variables are set properly
  if(minorYN == "Yes"){
    // make sure all the variables are set properly
    emailAddr = parentEmail;
    emailConsent = parentEmailConsent;
    phoneNum = parentPhone;
    phoneTextConsent = parentPhoneTextConsent;
    phoneVoicemailConsent = parentPhoneVoicemailConsent;
    clientFirstName = minorFirstName;
    clientLastName = minorLastName;
    clientPrefName = minorPrefName;
    dateOfBirth = minorDateOfBirth;
    clientAge = minorAge;
    clientGender = minorGender;
    mailingAddr = minorMailingAddr;
    medsYN = minorMedsYN;
    medsList = minorMedsList;
    pastTherapyYN = minorTherapyPast;
    pastTherapyDetails = minorTherapyPastDetails;
    familyHistory = minorFamilyHistory;
    hospitalPast = minorHospitalPast;
    suicideAttempt = minorSuicideAttempt;
    suicideAttemptDetails = minorSuicideAttemptDetails;
    suicidalThoughts = minorSuicidalThoughts;
    pastSixMonths = minorPastSixMonths;
    healthHistory = minorHealthHistory;
    therapyReason = minorTherapyReason;
    referral = minorReferral; 
    // set tags for minor vs adult
    var healthHistoryTag = "Has your child ever experienced any of the following? Please check all that apply.\nChecked Answers:\n";
    var pastSixMonthsTag = "Has your child experienced any of the following in the past six months? Please check all that apply.\nChecked Answers:\n";
    var medsYNTag = "Is your child currently taking any medications? ";
    var pastTherapyTag = "Has your child ever seen a therapist before? ";
    var suicideAttemptTag = "Has your child ever attempted suicide? ";
    var suicidalThoughtsTag = "Does your child have suicidal thoughts? ";
    var hospitalPastTag = "Has your child ever been hospitalized for a mental health reason? ";
    var therapyReasonTag = "Briefly describe your child's reason for coming to counseling.\n";
  }else{ // set tags for an adult
    var healthHistoryTag = "Have you ever experienced any of the following? Please check all that apply.\nChecked Answers:\n";
    var pastSixMonthsTag = "Have you experienced any of the following in the past six months? Please check all that apply.\nChecked Answers:\n";
    var medsYNTag = "Are you currently taking any medications? ";
    var pastTherapyTag = "Have you ever seen a therapist before? ";
    var suicideAttemptTag = "Have you ever attempted suicide? ";
    var suicidalThoughtsTag = "Do you have suicidal thoughts? ";
    var hospitalPastTag = "Have you ever been hospitalized for a mental health reason? ";
    var therapyReasonTag = "Briefly describe your reason for coming to counseling:\n";
  }   
  
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
  if(validateEmail(minorEmailAddr)){
    console.log("Minor email address has been validate.")
  }else{
    console.log("Minor email address is invalid.");
    minorEmailAddr = "invalid email entered: " + minorEmailAddr;
  }
  
  // point to the folder where you want all the client folders to reside 
  var rootFolder = DriveApp.getFolderById("IDNUMBERGOESHERE")  // change the url id number to match the id of the folder
 
  // combine first and last name
  var clientFullName = clientFirstName + " " + clientLastName

  // find the client folder within the root folder, or create it if it's not there 
  var templateResponseFolder = getFolder(clientFullName, true, rootFolder); 
  
  // point to the template document  
  // change the url id number to match the id of the Google Doc to be used as a template
  var templateFileForms = DriveApp.getFileById("IDNUMBERGOESHERE");  
  
  //
  // this next section is to create and populate the Signed New Client Forms document 
  //

  // create the file by copying from the template
  var copy = templateFileForms.makeCopy(clientFullName + " " + "Signed New Client Forms" + " " + formattedDate + " " + dashTime, templateResponseFolder); // copy from the template to a new google doc
  var doc = DocumentApp.openById(copy.getId());   // get the document from the file
  var body = doc.getBody(); // access the body of the document
  
  // Customize the text tags to match the text tags in the template document
  
  // replace the text tags with information submitted from the form
  // for fields that are not required, check to see if it has content first

  body.replaceText("{{Submission Date}}", timestamp);
  body.replaceText("{{Client Name}}", clientFullName);
  body.replaceText("{{Mailing Address}}", "Mailing Address: " + mailingAddr);
  body.replaceText("{{Signature1}}", consentTreatSigName);
  body.replaceText("{{Signature2}}", privacyPractSigName);
  body.replaceText("{{Timestamp}}", timestamp);
  
  // if the client is a minor, fill the minor-specific sections of the form; if not, delete them
  if(minorYN == "Yes"){
    body.replaceText("{{Minor}}", "Is the client a minor? Yes");
   
    if(minorEmailAddr !== ""){
      body.replaceText("{{Minor Email}}", "Minor Email Address: " + minorEmailAddr);
      if(minorEmailConsent !== ""){
        body.replaceText("{{Minor Email Consent}}", "Ok to email? " + "Yes");
      }else{
        body.replaceText("{{Minor Email Consent}}", "Ok to email? " + "No");
      }      
    }else{
      body.replaceText("{{Minor Email}}", "");
      body.replaceText("{{Minor Email Consent}}", "");
    }
    if(minorPhoneNum !== ""){
      body.replaceText("{{Minor Phone}}", "Minor Phone Number: " + minorPhoneNum);
      if(minorCallConsent !== ""){
        body.replaceText("{{Minor Phone Consent}}", "Ok to call? " + "Yes");
      }else{
        body.replaceText("{{Minor Phone Consent}}", "Ok to call? " + "No");
      }
      if(minorTextConsent !== ""){  
        body.replaceText("{{Minor Text Consent}}", "Ok to text? " + "Yes");
      }else{
        body.replaceText("{{Minor Text Consent}}", "Ok to text? " + "No");
      }   
      if(minorVoicemailConsent !== ""){  
        body.replaceText("{{Minor Voicemail Consent}}", "Ok to leave a voicemail? " + "Yes");
      }else{
        body.replaceText("{{Minor Voicemail Consent}}", "Ok to leave a voicemail? " + "No");
      }       
    }else{
      body.replaceText("{{Minor Phone}}", "");
      body.replaceText("{{Minor Phone Consent}}", "");
      body.replaceText("{{Minor Text Consent}}", "");
      body.replaceText("{{Minor Voicemail Consent}}", "");
    }
    if(parentName !== ""){
      body.replaceText("{{Parent Name}}", "Parent's Name: " + parentName);
    }else{
      body.replaceText("{{Parent Name}}", "");
    }
    if(minorSchool !== ""){
      body.replaceText("{{Minor School}}", "Does your child attend school? " + minorSchool);
      if(minorGrade !== ""){
        body.replaceText("{{Minor Grade}}", "If yes, grade in school: " + minorGrade);
      }else{
        body.replaceText("{{Minor Grade}}", "");
      }      
    }else{
      body.replaceText("{{Minor School}}", "");
      body.replaceText("{{Minor Grade}}", "");
    }
    if(minorSiblingsYN == "Yes"){
      if(minorSiblingsNum !== ""){
        if(minorSiblingsNames !== ""){
          body.replaceText("{{Minor Siblings}}", "Does your child have siblings? Yes\nIf yes, how many? " + minorSiblingsNum + "\nNames and ages of siblings: \n" + minorSiblingsNames);
        }else{
          body.replaceText("{{Minor Siblings}}", "Does your child have siblings? Yes\nIf yes, how many? " + minorSiblingsNum);
        }      
      }else{
        body.replaceText("{{Minor Siblings}}", "Does your child have siblings? Yes");
      }
    }else if(minorSiblingsYN == "No"){
      body.replaceText("{{Minor Siblings}}", "");
    }else{
      body.replaceText("{{Minor Siblings}}", "");
    }
  }else if (minorYN == "No"){
    body.replaceText("{{Minor}}", "");
    body.replaceText("{{Minor Email}}", "");
    body.replaceText("{{Minor Email Consent}}", "");
    body.replaceText("{{Minor Phone}}", "");
    body.replaceText("{{Minor Phone Consent}}", "");
    body.replaceText("{{Minor Text Consent}}", "");
    body.replaceText("{{Minor Voicemail Consent}}", "");
    body.replaceText("{{Parent Name}}", "");
    body.replaceText("{{Minor School}}", "");
    body.replaceText("{{Minor Grade}}", "");
    body.replaceText("{{Minor Siblings}}", "");    
  }else{    // this is in case it doesn't return the value as a string
    body.replaceText("{{Minor}}", "");
    body.replaceText("{{Minor Email}}", "");
    body.replaceText("{{Minor Email Consent}}", "");
    body.replaceText("{{Minor Phone}}", "");
    body.replaceText("{{Minor Phone Consent}}", "");
    body.replaceText("{{Minor Text Consent}}", "");
    body.replaceText("{{Minor Voicemail Consent}}", "");
    body.replaceText("{{Parent Name}}", "");
    body.replaceText("{{Minor School}}", "");
    body.replaceText("{{Minor Grade}}", "");
    body.replaceText("{{Minor Siblings}}", "");    
  }

  body.replaceText("{{Email Address}}", "Email address: " + emailAddr);
  body.replaceText("{{Phone Number}}", "Phone number: " + phoneNum);
  if(phoneTextConsent !== ""){
      body.replaceText("{{Text Consent}}", "Ok to text? " + "Yes");
    }else{
      body.replaceText("{{Text Consent}}", "Ok to text? " + "No");
    }
    if(phoneVoicemailConsent !== ""){  
      body.replaceText("{{Voicemail Consent}}", "Ok to leave a voicemail? " + "Yes");
    }else{
      body.replaceText("{{Voicemail Consent}}", "Ok to leave a voicemail? " + "No");
    }
    if(emailConsent !== ""){
      body.replaceText("{{Email Consent}}", "OK to email? " + "Yes");
    }else{
      body.replaceText("{{Email Consent}}", "OK to email? " + "No");
    } 

  if(dateOfBirth !== ""){
    body.replaceText("{{DOB}}", "Date of Birth: " + dateOfBirth);
  }else{
    body.replaceText("{{DOB}}", "");
  } 

  if(clientAge !== ""){
    body.replaceText("{{Age}}", "Age: " + clientAge);
  }else{
    body.replaceText("{{Age}}", "");
  } 

  if(clientGender !== ""){
    body.replaceText("{{Gender}}", "Gender: " + clientGender);
  }else{
    body.replaceText("{{Gender}}", "");
  } 

  if(referral !== ""){
    body.replaceText("{{Referral}}", "How did you hear about us? " + referral);
  }else{
    body.replaceText("{{Referral}}", "");
  } 

  if(clientPrefName !== ""){
    body.replaceText("{{Preferred Name}}", "Preferred Name: " + clientPrefName);
  }else{
    body.replaceText("{{Preferred Name}}", "");
  } 

  if(iceName !== ""){
    body.replaceText("{{Emergency Contact}}", "Emergency Contact: " + iceName);
    if(iceRelationship !== ""){
      body.replaceText("{{ICE Relationship}}", "Emergency Contact Relationship: " + iceRelationship);
    }else{
      body.replaceText("{{ICE Relationship}}", "");
    }
    if(icePhone1 !== ""){
      body.replaceText("{{ICE Phone1}}", "Emergency Contact Phone Number: " + icePhone1);
    }else{
      body.replaceText("{{ICE Phone1}}", "");
    }
    if(icePhone2 !== ""){
      body.replaceText("{{ICE Phone2}}", "Emergency Contact Alternate Phone Number: " + icePhone2);
    }else{
      body.replaceText("{{ICE Phone2}}", "");
    }
  }else{
     body.replaceText("{{Emergency Contact}}", "");
     if(iceRelationship !== ""){
       body.replaceText("{{ICE Relationship}}", "Emergency Contact Relationship: " + iceRelationship);
     }else{
       body.replaceText("{{ICE Relationship}}", "");
     }
     if(icePhone1 !== ""){
       body.replaceText("{{ICE Phone1}}", "Emergency Contact Phone Number: " + icePhone1);
     }else{
       body.replaceText("{{ICE Phone1}}", "");
     }
     if(icePhone2 !== ""){
       body.replaceText("{{ICE Phone2}}", "Emergency Contact Phone Number: " + icePhone2);
     }else{
       body.replaceText("{{ICE Phone2}}", "");
    }
  } 

  if(maritalStatus !== ""){
    body.replaceText("{{Marital Status}}", "Marital Status: " + maritalStatus);
    if(maritalStatusLength !== ""){
      body.replaceText("{{Marital Status Length}}", "If married, separated, divorced, widowed, or cohabitating, how long? " + maritalStatusLength);
    }else{
      body.replaceText("{{Marital Status Length}}", "");
    }
    if(partnerName !== ""){
      body.replaceText("{{Partner Name}}", "Name of spouse/partner: " + partnerName);
    }else{
      body.replaceText("{{Partner Name}}", "");
    }
    if(partnerDOB !== ""){
      body.replaceText("{{Partner DOB}}", "Spouse/partner's Date of Birth: " + partnerDOB);
    }else{
      body.replaceText("{{Partner DOB}}", "");
    }
  }else{
    body.replaceText("{{Marital Status}}", "");
    body.replaceText("{{Marital Status Length}}", "");
    body.replaceText("{{Partner Name}}", "");
    body.replaceText("{{Partner DOB}}", "");
  }

  if(healthHistory !== ""){       
      var healthHistoryList = healthHistory.replace(/, /g, '\n'); // separate out the answers in multiple checkbox entry to be one per line
      body.replaceText("{{Health}}", healthHistoryTag + healthHistoryList); 
  }else{
    body.replaceText("{{Health}}", "");
  }

  if(pastSixMonths !== ""){
    var pastSixMonthsList = pastSixMonths.replace(/, /g, '\n'); // separate out the answers in multiple checkbox entry to be one per line
    body.replaceText("{{Six Months}}", pastSixMonthsTag + pastSixMonthsList);
  }else{
    body.replaceText("{{Six Months}}", "");
  }
  
  if(childrenYN == "Yes"){
    if(childrenNum !== ""){
      if(childrenNames !== ""){
        body.replaceText("{{Children}}", "Do you have children? Yes\nIf yes, how many? " + childrenNum + "\nNames and ages of children: \n" + childrenNames);
      }else{
        body.replaceText("{{Children}}", "Do you have children? Yes\nIf yes, how many? " + childrenNum);
      }      
    }else{
      body.replaceText("{{Children}}", "Do you have children? Yes");
    }
  }else if(childrenYN == "No"){
    body.replaceText("{{Children}}", "");
  }else{
    body.replaceText("{{Children}}", "");
  }

  if(medsYN == "Yes"){ //  
      body.replaceText("{{Medications}}", medsYNTag + "Yes");
      if(medsList !== ""){
        body.replaceText("{{Medication Details}}", "If yes, please specify, including any current prescription medications: " + medsList);
      }else{
       body.replaceText("{{Medication Details}}", "");
      }
    }else if(medsYN == "No"){
      body.replaceText("{{Medications}}", medsYNTag + "No");
      body.replaceText("{{Medication Details}}", "");
    }else{
      body.replaceText("{{Medications}}", "");
      body.replaceText("{{Medication Details}}", "");
    }

  if(pastTherapyYN == "Yes"){
    body.replaceText("{{Previous Therapy}}", pastTherapyTag + "Yes");
    if(pastTherapyDetails !== ""){
      body.replaceText("{{Previous Therapy Details}}", "If yes, when and why?" + pastTherapyDetails);
    }else{
      body.replaceText("{{Previous Therapy Details}}", "");
    }
  }else if(pastTherapyYN == "No"){
    body.replaceText("{{Previous Therapy}}", "");
    body.replaceText("{{Previous Therapy Details}}", "");
  }else{
    body.replaceText("{{Previous Therapy}}", "");
    body.replaceText("{{Previous Therapy Details}}", "");
  }

  if(suicideAttempt == "Yes"){
    body.replaceText("{{Suicide Attempt}}", suicideAttemptTag + "Yes");
    if(suicideAttemptDetails !== ""){
      body.replaceText("{{Suicide Attempt Details}}", "If yes, when? " + suicideAttemptDetails);
    }else{
      body.replaceText("{{Suicide Attempt Details}}", "");
    }
  }else if(alchoholUse == "No"){
    body.replaceText("{{Suicide Attempt}}", "");
    body.replaceText("{{Suicide Attempt Details}}", "");
  }else{
    body.replaceText("{{Suicide Attempt}}", "");
    body.replaceText("{{Suicide Attempt Details}}", "");
  }

  if(alchoholUse == "Yes"){
    body.replaceText("{{Alcohol}}", "Alcohol use? " + alchoholUse);
  }else if(alchoholUse == "No"){
    body.replaceText("{{Alcohol}}", "");
  }else{
    body.replaceText("{{Alcohol}}", "");
  }

  if(drugUse == "Yes"){
    body.replaceText("{{Drugs}}", "Drug use? " + drugUse);
  }else if(drugUse == "No"){
    body.replaceText("{{Drugs}}", "");
  }else{
    body.replaceText("{{Drugs}}", "");
  }

  if(suicidalThoughts !== ""){
    body.replaceText("{{Suicidal Thoughts}}", suicidalThoughtsTag + suicidalThoughts);
   }else{
    body.replaceText("{{Suicidal Thoughts}}", "");
  }

  if(harmfulThoughts !== ""){
    body.replaceText("{{Harmful}}", "Do you have thoughts or urges to harm others? " + harmfulThoughts);
   }else{
    body.replaceText("{{Harmful}}", "");
  }

  if(familyHistory !== ""){
    body.replaceText("{{Family History}}", "Do you have a family history of mental health? " + familyHistory);
  }else{
    body.replaceText("{{Family History}}", "");
  } 

    if(hospitalPast !== ""){
    body.replaceText("{{Hospital}}", hospitalPastTag + hospitalPast);
   }else{
    body.replaceText("{{Hospital}}", "");
  } 

    if(therapyReason !== ""){
    body.replaceText("{{Reason}}", therapyReasonTag + therapyReason);
   }else{
    body.replaceText("{{Reason}}", "");
  } 

    if(therapyFears !== ""){
    body.replaceText("{{Fears}}", "Fears or concerns about therapy: " + therapyFears);
   }else{
    body.replaceText("{{Fears}}", "");
  } 
  
  if(referral !== ""){
    body.replaceText("{{Referral}}", "How did you hear about us? " + referral);
   }else{
    body.replaceText("{{Referral}}", "");
  } 
    
  // end of replacing text tags in the document
  
  // get rid of extra line breaks... but not all of them
  removeEmptyParagraphs(body);

  doc.saveAndClose();

  // save the doc as a pdf file
  var blobPdf = copy.getAs(MimeType.PDF);
  templateResponseFolder.createFile(blobPdf).setName(clientFullName + " " + "Signed New Client Forms" + " " + formattedDate + " " + dashTime + "-pdf");
  // var newPdf =  // I had this at the front of the previous line, checking to see if the script needs it, I'm pretty sure it doesn't

  // remove the doc and just keep the pdf
  try{
    templateResponseFolder.removeFile(DriveApp.getFileById(copy.getId()));
    console.log("Doc successfully removed."); 
  }catch(err){
    // The ApiException status code indicates the detailed failure reason.
    console.log("Doc not removed. Error: " + err); 
  }

  //
  // send a confirmation email 
  //
  if(sendEmail == "yes"){
    // get just the first name for the greeting
    sigFirstName = consentTreatSigName.split(/\s(.+)/)[0];
    // create the content for the email
    var emailSubject = "Thank you for submitting your new client paperwork!";
    var emailGreeting = "Dear " + sigFirstName + ",\n\n";
    var emailContent = "Thank you for submitting your new client paperwork! We look forward to seeing you in the office soon. \n\nIf you have any questions please feel free to contact us. We recommend contacting your therapist directly, or you may call the number below.";
    var emailSignature = "\n\nSincerely, \nSIGNATURE LINE GOES HERE";
    // send the email - try/catch is for in case they enter an invalid email address
    try {
      if(emailConsent !== ""){   // check for permission first...
        MailApp.sendEmail(emailAddr, emailSubject, emailGreeting + emailContent + emailSignature);
        console.log("Email sent successfully.");
      } 
    }catch (err) {
      // The ApiException status code indicates the detailed failure reason.
      console.log("No email sent: " + err);
    }
  }else{
    console.log("Invalid email address entered, no email sent.");
  }  
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

// a function to remove empty paragraphs from a document
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

// a function to validate the email address
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
