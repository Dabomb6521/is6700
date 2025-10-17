<!--- Write a description of the functionality you implemented for question 10 here.  No special formatting is required; however, if desired you can use the basic markdown syntax (https://www.markdownguide.org/cheat-sheet/) and view the result by right-clicking the file and selecting 'Open Preview'. -->

# Admin Contact View Page

I chose to follow the suggestion given in the question which states to allow an admin user to view existing contact requests. Since there was no user implementation in this app yet I chose to just create the admin content keeping in mind the design so that I could hide it behind authentication later.

I chose to put all of the files in a admin sub folder under the respecting folder. Example under routing I created a admin folder and then placed the admin-routes.ejs there. The process was fairly simple, I added a route to the app.js file that points all /admin requests to the admin-routes.js in there I set up a route that would take route requests to /contacts and send them to the admin-contacts-controller.js. This would then invoke a sequelize get all contacts request and renders the admin-contact-requests.ejs file and I order the incoming data by post date so that the most recent appears at the top of the table. This page then has a simple table setup where I loop through the data and apply it to the table dynamically. This page also looks at the responses and shows a badge of yes or no depending on the state of the response. In order to test this I AI generated a json file to import randomized data.

In the future I would like to add a view button where I could go into the contact and be able to view/edit the response.
