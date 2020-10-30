// This collection of utilities will wrap the native set of api's in our own api's


// a function to find a File by passing in a filename
//       returns null if there is no file found to match
//       returns the file if there is a file found to match

function findFileByName(name){
   
  var files = DriveApp.getFilesByName(name);
  
  if(files.hasNext()){
    return files.next();
  }
  
  return null;
  
}

// a function to get a timestamp and return it in milliseconds
function getTimeStamp(){
  return Math.round(new Date().getTime()/1000);  
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

// supply a root folder where we should search for the names of the folders inside of it
function getFolderNames(root){
  
  var folderIter = root.getFolders(); // this will return a reference to each folder inside of the root folder
  var folderNames =  [];  // create an array of folder names
  
  // iterate through the folder iterator
  // this while loop will continue as long as hasNext returns true
  while(folderIter.hasNext()){
   
    var folder = folderIter.next();  // returns the reference to the next folder
    var name = folder.getName();
    
    folderNames.push(name);
    
  }
  
  return folderNames;
  
}

// clean up the folders
// parameters: root folder; total = value 
function cleanUpFolders(root, total){

  // make sure the total equals a value we can use to count the number of folders
  // if total is null or total is not a number, set the total to 5
  if(total == null || total == NaN){
    total = 5;
  }
  
  var names = getFolderNames(root);  // get all the names of the folders inside of the root folder
  
  // reorder the array in descending order
  // call names.sort, pass in a function for a and b that returns b-a
  names.sort(function(a, b) {return b-a});
  
  var folderTotal = names.length;  // total number of folders
  
  // if the total number of folders is greater than the number of folders we want to keep
  // delete all the folders in the array after the number we want to keep
  if(folderTotal > total){
  
    for(var i = total-1; i < folderTotal; i++){ // for folders in the array after the total number of folders we want to keep
      var folder = getFolder(names[i], false, root); // get a reference to the folder, false = don't create a new folder
      // if folder doesn't equal null, delete the folder
      if(folder != null){
        folder.setTrashed(true); // flag a file as part of the trash
      }
    }
  
  }
  
}

