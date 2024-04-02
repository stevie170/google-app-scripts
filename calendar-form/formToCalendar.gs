function datesToCalendar(e) {
  // The purpose of this script is to use a Google form to gather dates individuals or families in an organization
  // will be out of town in the summer, for planning purposes.
  // The form provides 3 options to provide date ranges, with the "Go to section based on answer" on for each.
  
  // Don't forget to set up the trigger for the spreasheet to be On Form Submit
  // Approve google permissions when configuring the trigger
  
  // Customize the value variables to match each column on the submission spreadsheet for the form
  var timestamp = e.values[0]; // don't need to use this
  var nameOrFamilyName = e.values[1]; // asked for name or family name if multiple family members
  var outOfTown1 = e.values[2]; // Yes, No, Don't know yet
  var dateLeaving1 = e.values[3]; 
  var dateReturning1 = e.values[4]; 
  var comments1 = e.values[5]; // optional
  var outOfTown2 = e.values[6];
  var dateLeaving2 = e.values[7];
  var dateReturning2 = e.values[8];
  var comments2 = e.values[9]; // optional
  var outOfTown3 = e.values[10];
  var dateLeaving3 = e.values[11];
  var dateReturning3 = e.values[12];
  var comments3 = e.values[13]; // optional
  var outOfTown4 = e.values[14];

  // open the shared calendar
  const calendar = CalendarApp.getCalendarById('calendarIdGoesHere'); // the calendar ID can be found in the calendar settings
  // see https://developers.google.com/apps-script/reference/calendar/calendar#getid
  // check the calendar
  const calendarName = calendar.getName(); 
  console.log("calendar name:" + calendarName); 

  // comments
  if(comments1 == ""){
    comments1a = "";
  }else{
    comments1a = " - " + comments1;
  }
  if(comments2 == ""){
    comments2a = "";
  }else{
    comments2a = " - " + comments2;
  }
  if(comments3 == ""){
    comments3a = "";
  }else{
    comments3a = " - " + comments3;
  }

  // if they won't be out of town at all
  // do nothing

  // if they will be out of town
  // add dates to calendar
  if(outOfTown1 == "Yes"){
    var event1 = calendar.createAllDayEvent(nameOrFamilyName + ' out of town' + comments1a,
      new Date(dateLeaving1),
      new Date(dateReturning1));
    console.log("Event 1 ID: " + event1.getId());
  }else{
    console.log("No Event 1: " + outOfTown1);
  }

  // if they will be out of town a second time
  // add dates to calendar
  if(outOfTown2 == "Yes"){
    var event2 = calendar.createAllDayEvent(nameOrFamilyName + ' out of town' + comments2a,
      new Date(dateLeaving2),
      new Date(dateReturning2));
    console.log("Event 2 ID: " + event2.getId());
  }else{
    console.log("No Event 2: " + outOfTown2);
  }

  // if they will be out of town a third time
  // add dates to calendar
  // if they will be out of town a second time
  // add dates to calendar
  if(outOfTown3 == "Yes"){
    var event3 = calendar.createAllDayEvent(nameOrFamilyName + ' out of town' + comments3a,
      new Date(dateLeaving3),
      new Date(dateReturning3));
    console.log("Event 3 ID: " + event3.getId());
  }else{
    console.log("No Event 3: " + outOfTown3);
  }

  // if they will be out of town so many times
  // send me an email so I can follow up
  if(outOfTown4 == "Yes"){
    // create the content for the email
      var emailAddr = "test@test.com"; // customize this with the email you want to send notification to
      var emailFrom = "Summer 2024 out of town dates";
      var emailSubject = "Follow up with " + nameOrFamilyName;
      var emailContent = nameOrFamilyName + " has indicated they will be out of town more than the form could hold. \n\nFollow up to see when they will be out of town and add it to the summer calendar.";
      // send the email - try/catch is for in case there is an error
      try {
        MailApp.sendEmail(emailAddr, emailSubject, emailContent, {name: emailFrom});
        console.log("Email sent successfully.");
      }catch (err) {
        // The ApiException status code indicates the detailed failure reason.
        console.log("No email sent: " + err);
      }
  }else{
    console.log("No Excessive Out of Town Email needed!");
  }
}
