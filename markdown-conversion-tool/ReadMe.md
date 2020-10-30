# Markdown Conversion Tool

This tool was created as part of a [Lynda.com course](https://www.lynda.com/Developer-tutorials/Google-Apps-Script-JavaScript-Developers/580666-2.html) I used to learn the basics of Google App Scripts.

The course was a few years old so I had to make a few changes as I went based on updates that have been made to Google's libraries, but overall it was a great introduction to Google App Scripts. 

This tool is a standalone script (meaning it is not attached to a specific Sheet or Doc file). It takes a Google Doc and parses the contents of the document to create and format a new markdown file from the contents of the Google Doc. I was fascinated by how it was able to handle images and fonts so well.

[main.gs](main.gs) contains the main function, which calls functions from both [utils.gs](/utils.gs) and [doc-to-markdown.gs](/doc-to-markdown.gs). 
