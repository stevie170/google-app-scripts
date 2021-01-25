# Form Submission to Doc

This Google App Script takes the submissions from a Form and creates a new Google Doc using the information submitted.

[form-submission.gs](../form-submission-to-doc/form-submission.gs)  

## Deployment

The script is attached to the responses spreadsheet for the form, and an event trigger is created to run the script each time the form is submitted.

## Customization

This script would need to be customized based on the questions and answers in the form.

Because of the needs of this particular project, this script also navigates the folders in Google Drive.

## Sample Script

I'm including the basic sample script I created using a tutorial, because it was the very basic starting point for this project.

[sample-script.gs](../form-submission-to-doc/sample-script.gs)

## Project Scripts

This project was for a therapy office, to automate client signatures and other often repeated forms.

As the project evolved, I ended up creating a few different scripts to do different things for different forms. These included scripts are very specific to my project, and among their functions are the navigation of google drive, creating google docs, saving the docs as pdf files, removing the docs once pdfs are created, and confirmation emails including pdf attachments.

[intake-and-consent-form-signatures.gs](../form-submission-to-doc/intake-and-consent-form-signatures.gs)

[Telehealth-consent-signatures.gs](../form-submission-to-doc/Telehealth-consent-signatures.gs)

[school-work-excuse-note.gs](../form-submission-to-doc/school-work-excuse-note.gs)

[session-note-creation.gs](../form-submission-to-doc/session-note-creation.gs)
