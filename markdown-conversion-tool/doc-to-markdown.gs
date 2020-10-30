// convert the contents of the document into a markdown format

function convertToMarkdown(doc, images) {
  
  // get the active section of the document which is the body of the document
  var activeSection = doc.getBody(); 
  
  // get the text of the document
  var text = ""; 
  
  // get the number of children inside of the active section
  var total = activeSection.getNumChildren();
  
  // iterate through the children
  for (var i = 0; i < total; i++){
    var section = activeSection.getChild(i);
    
      // concatenate each section into the text
      text += parseSection(section, images);  //.getText(); got raw text without return characters or formatting, now parsing it using our function
    
  }
  
  return text;
  
}


// create a function so we can parse each of the sections we pull out from the doc
function parseSection(section, images){
  
  // create an empty text string
  var text = "";
  
  // look at the type of section and its children
  var children = section.getNumChildren();
  
 
  // test if children is greater than zero so we don't get empty lines when we parse the document
  if(children > 0){
    
    // get the section type
    var type = section.getType();
    
    // test to see if the section's type is a paragraph
    // if it is, format the text and add it back in to the text string 
   
    if(type == DocumentApp.ElementType.PARAGRAPH){
      
      // create a switch to see what type of heading we have (a paragraph element contains a heading) 
      // add the proper number of hashtags for the markdown heading format
      switch(section.getHeading()){
        case DocumentApp.ParagraphHeading.HEADING2:
          text += "#";
        case DocumentApp.ParagraphHeading.HEADING1:
          text += "#";
        default:      // no break; as we work backwards through the headings, we'll keep concatenating hashtags to create the correct format type in markdown    
      }
      
      // if the text is not an empty string, it is a paragraph element type, so we have a heading
      // add a space between the markdown heading format and the actual text
      if(text != ""){  
        text += " ";
      }
      
      // get all the children in the section and add each to the text string
      for(var i = 0; i < children; i ++){
      
        var element = section.getChild(i);
        
        text += parseElement(element, images);
      
      }
    }
    
  }
  
  return text + "\n";  // add a line break to the text
}


// create a function so we can parse each of the sections we pull out from the doc



function parseElement(element, images){   // imageCounter and an images array being passed in

  // create an empty text string
  var text = "";
  
  // format the text and add it back in to the text string 
  
  // get the element type
  var type = element.getType();
  
  // if the element is text, add the text to the text string
  // if the element is an image, add [image] to the text string to be a placeholder for the image
  if(type == DocumentApp.ElementType.TEXT){
    
    var font = element.getFontFamily();
    
    // if the font is Courier New, format it as a code block
    if(font == "Courier New"){
    
      // add a string with 5 spaces to tell markdown that it's a code block
      text += "     " + element.getText();  
    
    }else{
    
      text += formatText(element);
      
    } 
            
  }else if(type == DocumentApp.ElementType.INLINE_IMAGE){
    
    var imageBlob = element.getBlob();  // raw data of the item inside the document is the Blob
    
    // make sure we can process this type of image
    var contentType = imageBlob.getContentType();
    var extension = "";
    
    if(/\/png$/.test(contentType)){   // this is a regex expression to identify if this is a png - in the example it's because that is the image type he had in the document
      // if this returns true we know we are dealing with a png
      extension = ".png";        
    }
    
    // test to see if it's a valid image
    if(extension != ""){
    
      // create a new name for the image; a unique image id based on each of the images we come across in the file
      var name = "images/image-"+images.length+extension;
      imageBlob.setName(name);
      
      // pass the imageBlob into the images array
      images.push(imageBlob);
      
      // update the text to the path where the image will be saved
      text += "![image alt text]("+name+")";

    }
    
    
  }
  
  // return the text string with a new line break
  return text += "\n";
  
}


  function formatText(textElement){
  
    var text = textElement.getText();
    
    if(!textElement.getTextAttributeIndices)
      return text;
        
    var offsets = textElement.getTextAttributeIndices();
    var lastOffset = text.length; 
    
    // work backwards through the string, going through each offset and format the text
    for(var i = offsets.length - 1; i >= 0; i --){
      
      var offset = offsets[i];
      var url = textElement.getLinkUrl(offset); // pass in the starting position, decide if it's a url or not
      
      // if it's a url, reformat the text by using substring to pull out the text and concatenate it with the url itself
      if(url){
        
        text = text.substring(0, offset) + "[" + text.substring(offset, lastOffset) + "] (" + url + ")" + text.substring(lastOffset);
      }

      lastOffset = offset; // change the offset for the next loop
      
    }
    
    return text;
  
  }




