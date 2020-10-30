function main() {
  
  // find a file by a name passed in as a string
  var file = findFileByName("Setting Up Git Submodules"); 
  
  // get the unique id of the file we found - need to set up a condition if the file wasn't found
  var doc = DocumentApp.openById(file.getId()); 
  Logger.log(doc); // add the file id to the log
  
  // create an array to hold images
  var images = [];
  
  var markdown = convertToMarkdown(doc, images);
  
  // MarkdownGen is what we want the new folder named, true so it will automatically create the folder if it doesn't exist
  var newFolder = getFolder("MarkdownGen", true); 
  
  // clean up the folders inside of the MarkdownGen folder
  // delete any folders older than the 5th one generated  
  cleanUpFolders(newFolder);
  
  // create an output folder inside of our newFolder
  var subFolder = getFolder("Output-"+getTimeStamp(), true, newFolder); 
  
  var totalImages = images.length;
  
  // if there are images to save, create a new folder to save them to
  if(totalImages > 0){
    var imageFolder = getFolder("images", true, subFolder);
    
    for(var i = 0; i < totalImages; i++){
    
      imageFolder.createFile(images[i]);
      
    }
  }
  
  // (name, content, mimeType)
  var newDoc = subFolder.createFile("markdown-test.md", markdown, MimeType.PLAIN_TEXT);    
  
}

