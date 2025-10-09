IS 5700/6700  
Fall 2025  
Midterm Exam 

| Instructions – READ CAREFULLY\!\!\!\! This is a take-home exam and is an individual effort; you may NOT collaborate in any way with other people.  This includes not viewing/sharing answers in any form with current or former students.  Any violation of academic integrity will result in a failing grade and will be reported to the university. You may refer to the textbook, class assignments, online resources, or the instructor for help in answering the questions.  However, your answers must be in your own words, particularly for questions that ask for descriptions or explanations.  Copying text from the textbook, the web, or any other source, even with minor modifications, is plagiarism, and will result in a failing grade. The appropriate use of generative AI (e.g., ChatGPT, GitHub Copilot, etc.) is allowed and encouraged.  However, AI should be used to enhance your learning, not substitute for it.   AI may be used to: Explain a concept or technique and provide examples. Generate website/database content (see text in green throughout the exam for places where AI may be used to generate content). Troubleshoot and debug code written by you. AI may NOT be used to: Generate wholesale answers to exam questions. To complete the exam, download and extract the accompanying zip file.  Inside this extracted folder you will find files and subdirectories that correspond to one or more exam questions (Q1.js, Q2-callback.js, etc.)  Write the necessary code in the provided files as instructed in the questions. This exam requires a significant time investment (estimated 1-hour per question assuming you understand the material).  Use your time wisely and focus on the easier questions first. BE SURE TO SAVE YOUR FILES FREQUENTLY AND BACK THEM UP\!\!  Lost data is not a valid excuse for failing to submit your work on time.  Avoiding data loss is solely your responsibility. Turn in your exam by zipping your exam directory and submitting it to Canvas by the due date.  To save space, you may delete the node\_modules folder (make sure the package.json file contains a list of all application dependencies).  Make sure you have run all code to verify that it works.   HAPPY CODING\!\!\!  |
| :---- |

1. Becoming a proficient Node.js developer requires familiarity with two common JavaScript data structures: arrays and objects.  In the Q1.js file in the midterm exam application, do the following:  
   1. Declare a variable that contains an array of objects representing at least three of your friends.  Each friend object should have the following properties:  firstName (string), lastName (string), birthDate (Date), and favoriteFoods (array of strings).    
   2. Write a function that accepts the array of friend objects as a parameter and logs the following to the console **for each friend** (use any appropriate array looping technique):    
      \<\<firstName\>\> \<\<lastName\>\> is \<\<age\>\> years old and enjoys the following foods:  \<\<favoriteFoods\>\>.

   You may choose to calculate age and build the output string in the function or add suitable methods to each friend object.  Call the function to verify that it works correctly.  
   3. Write a function that accepts a date and the array of friends objects as parameters and returns a *new array* of friends whose birthdays are before (older than) that date.  Call the function and log the resulting array to the console.  
        
2. The callback pattern is a central feature of asynchronous JavaScript programming. However, modern JavaScript also provides the promise-based pattern to handle asynchronous operations.  For this question, complete the following tasks using **both** approaches.  
   1. In the Q2-callback.js file, use asynchronous functions of the [Node *fs* module](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html) and the **callback pattern** to do the following.  Structure your code so that the operations are guaranteed to happen in the prescribed order.  For each operation, log any errors that occur to the console.  
      1. Create a new file called *working.txt* (saved to the same folder) with the contents “Creating new file…”  
      2. Append one or more new lines of text to the file (you choose the content)  
      3. Read the contents of the file and print them to the console  
      4. Rename the file to *complete.txt*  
   2. In the Q2-promise.js file, write code to achieve the same tasks as above, but use **promises** instead of callbacks.  (*Hint:* You can use require(‘fs’).promises to get the promise-based versions of the fs functions.)  Use the .then() and .catch() syntax to ensure operations occur in the correct order. 

For the remaining questions, you will start developing a web application for **Mentor**, an online training company that offers courses in various disciplines. You will start with basic HTML/CSS website template and transform it into a dynamic Node.js application.

In the midterm exam folder, you will find a directory called Q3-10\_mentor, to which you will make changes in the following questions.  These questions are cumulative in nature, so completing them in order is recommended\!

3. ***App Initialization***.  In this step, make the necessary changes to convert the website template files found in the *Q3-10\_mentor* directory to a Node.js web application that follows the MVC architecture.  When you are finished with this step, the following should be complete:  
   1. The *Q3-10\_mentor* root directory should include a (a) package.json file that initializes a Node application, (b) a node\_modules folder with Express, EJS, and Express-EJS-Layouts packages installed as application dependencies, and nodemon installed as a dev dependency, and (c) public, routes, models, views, and controllers directories.  
   2. An app.js file should be created in the *Q3-10\_mentor* directory that requires Express, EJS, and Express-EJS-layouts.  This file should launch an Express web server on port 3000\.   
   3. The assets template folder (containing css, fonts, images, and js folders) should be moved to the proper subdirectory.  Middleware should be added to the app.js file to identify this directory as the home for static resources.  
   4. The .html files should be renamed as .ejs files and moved to the proper directory.  
   5. A layout.ejs file should be created that contains content for the site header and footer (everything before and after \<main class=”main”\> and this element itself but NOT anything inside this element).  All other pages should be modified to use this layout. (Hint:  add a leading /  to any relative path values for href and src attributes to ensure that these resources are loaded correctly with later routes.)    
   6. A home-controller.js file should be created with handler functions to render the appropriate views for the home and about links in the site navigation menu.  These pages will display only static content for now.  
   7. A home-routes.js file should be created that provides routing to the home (/) and about (/about) views.  The app.js file should be modified to register these routes.  Update the links in the navigation menu in layout.ejs to point to “/” and “/about” for the home and about routes, respectively.  **Any clicked link in the navigation menu should be displayed in green text to properly indicate the active page.**  

   

4. ***Trainers.***  The trainers.ejs view contains biographical information for six Mentor trainers, but this page is currently static.  In this step, convert this page into a dynamic view that is populated with information from a MySQL database called ***yourUserName\_examproject*** hosted on the class MySQL server (hsb-web-dev.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com) using Sequelize.  Specifically, do the following:  
   1. Create a util directory with a file called *database.js* inside.  Add the necessary code to this file to use Sequelize to connect to your database.  
   2. In the appropriate location within your app, create a Sequelize model for a trainer that contains the following fields:  
      1. id (int, required, primary key, auto-increment)  
      2. name (string, required, 50 characters max)[^1]  
      3. image (string, required, must end with .jpg or .png)[^2]  
      4. expertise (string, required)  
      5. bio (text, required)

   Make this model available to other files in your application. When you have finished creating the model, sync it with the database to create the database table for this model.

   3. Using either the phpMyAdmin web interface or your own bulkCreate code written in a separate file, insert into a *trainers* table a record for each of the six trainers shown on this page.  Use the existing images, but come up with your own names, areas of expertise (e.g., Web Development, Pottery, Yodeling), and short bios (be creative\!).  For the image, store only the image file name (e.g., team-1.jpg) that corresponds with each trainer (see /assets/img/team folder).  
   4. Make the necessary changes so that the content of trainers.ejs is pulled from the database when a GET request is sent to /trainers.  Create a trainer-routes.js and trainer-controller.js module in the appropriate locations.  Create a handler function that queries the database (using the Sequelize model) for all trainers and renders the trainers.ejs view with the appropriate data.   Then, register the necessary route in app.js and update the link on the site navigation menu in index.ejs.  The final trainers.ejs view should look just like the .html version but with your own custom content (different ordering of images is ok).

   

5. ***Events.***   Implement functionality similar to the previous question for the events.ejs view.  Specifically:  
   1. Create a Sequelize model for an event.  Each event should have:  
      1. id (int, required, primary key, auto-increment)  
      2. title (string, required, 50 characters max)  
      3. summary (string, required, 350 characters max)  
      4. image (string, required, must end with .jpg or .png)  
      5. date (date, required)  
   2. Sync the new model with your database. (**BE CAREFUL\!\!**:  If you sync the entire database with the {force: true} flag set, you will wipe out all existing data in the database.  Sync only this table or make sure that you have created a backup script to reinsert the data in the other tables).  
   3. Using phpMyAdmin or a bulkCreate command, populate an appropriately-named table in your database with data for four events (feel free to use the two images provided in the /assets/img folder, and create two more of your own).  
   4. Create event-routes.js and event-controller.js files that will provide all routing and handler functions for route requests related to events.  
   5. Write the necessary code to render each event dynamically on the events.ejs view, which should be served when a GET request is sent to /events.  The page should look exactly like events.html, and should show all the information of the event in the same format.  Events should be displayed in [chronological order](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering-and-grouping) by their date.  Update the Events link in the main navigation menu to render this view.

   

6. ***Courses and Course Detail***.  For this question, implement functionality similar to the previous questions, but for courses.  In addition, you will also implement a course detail view.  Do the following:    
   1. In the appropriate location within your app, create a Sequelize model for a course that contains the following fields:  
      1. id (int, required, primary key, auto-increment)  
      2. title (string, required, 50 characters max)[^3]  
      3. image (string, required, must end with .jpg or .png)[^4]  
      4. summary(string, required)  
      5. description (text, required)  
      6. price (decimal, required)  
      7. capacity (int, required)  
      8. registrants (int, default 0\)  
      9. likes (int, default 0\)  
      10. trainer (int; should reference the id from the trainer model)  
      11. titleSlug (string, required, should be automatically set using the [slugify package](https://www.npmjs.com/package/slugify) when the title is set/updated)

   Make this model available to other files in your application. When you have finished creating the model, sync it with the database to create the database table for this model.

   2. Using either the phpMyAdmin web interface or your own bulkCreate code written in a separate file, insert into the *courses* table in the database at least six records that represent courses to be shown on this page.  Come up with your own values for each of the courses (be creative, but short is fine).  For images, you can use the three existing course images in the /assets/img folder and create three of your own.  Store only the image file name (e.g., course-1.jpg) that corresponds with each course.  
   3. Make the necessary changes so that the content of courses.ejs is pulled from the database when a GET request is sent to /courses.  Create course-routes.js and course-controller.js modules in the appropriate locations and add a handler function that queries the database (using the Sequelize model) for all courses and renders the courses.ejs view with the appropriate data.  Each course title should be a link to /courses/:titleSlug, where :titleSlug is the slug of the course.  Then, create the necessary route in app.js and update the link on the site navigation menu.  The final courses.ejs view should look just like the .html version except with your own course content.  
   4. When the user clicks on a course title, a GET request is sent to /courses/:titleSlug.  Implement the necessary code to show a more detailed view of a course by making the necessary changes in app.js, course-controller.js, and course-detail.ejs.  The view should look exactly like course-detail.html in the template.

7. ***Contact Requests***.  In this step, implement functionality to allow users to submit a new contact request (contact.ejs).  Specifically, do the following:  
   1. Create a Sequelize model for contact requests.  Each contact request should have:  
      1. id (int, required, primary key, auto-increment)  
      2. name (string, required, 50 characters max)  
      3. email (string, required, should be in valid email format)  
      4. subject (string, required)  
      5. message (text, required)  
      6. postDate (Date, required)  
      7. response (string, default value null)  
      8. responseDate (Date, default value null)  
   2. Sync the new model with your database, being careful not to wipe out data inserted previously.  
   3. Create contact-routes.js and contact-controller.js files that will provide all handler functions for route requests related to contacts.  
   4. Add the necessary code in app.js, contact-routes.js and contact-controller.js to serve up the contact.ejs view when a GET request is sent to contacts/new.  
   5. Write the necessary code in app.js, contactsController.js, and contact.ejs to insert a new contact request into an appropriately named table in the database when the user submits the form on contact.ejs.  The form should be submitted to contacts/create using an http POST request.  Create a new view called thanks.ejs and redirect the user to this view upon successful submission of the form.

   

8. **Index and About Views.**  With routing and controller functions in place for the primary parts of the application, go back and finalize the index.ejs and about.ejs views as follows:  
   1. index.ejs:  
      1. The *about section* on this page can be reused on the About Us view, although with a different image. Move this section into a partial and include the partial in the same location on the index view.  In the handler function that renders the index.ejs view, pass the name of the image to be displayed to make it dynamic.  
      2. The *counts section* on this page can also be reused on the About Us View.  This section should also be moved into a partial.  The handler function should pass in values for the number of courses, events, and trainers in the database (the number of students can be left as a hard-coded value for now).  (Hint: consider using the [count method](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#count) of the models.)  
      3. The *courses section* on this page should display **three** of the available courses from the database (use any criteria you wish to select three).  Each of the course titles should be a link to the course details view for that course.  Use an existing handler function or write a new function in the course-controller.js module to supply this data.  
      4. The *trainers section* on this page should display three of the trainers in the database.  (use any criteria you wish to select three).  Use an existing handler function or write a new function in the trainer-controller.js module to supply this data.  
   2. about.ejs  
      1. This page should include the partials for the *about section* and the *counts section*.    
      2. For the *testimonials section*, create a new Sequelize model for testimonials and sync the model to your database.  You can design the model as you wish, but it should include fields for the name and title of the customer, a numeric star rating, and the testimonial text.  Add at least six testimonials to your database and then make the necessary changes to render the testimonials dynamically on the about.ejs view.

      

9. ***Middleware***.  For this question, use the [morgan package](https://www.npmjs.com/package/morgan) to create middleware that will log each incoming request to the app.  Create a new file called *middleware.js* in the root directory of your app.  Inside this file, write a middleware function that will log requests to a file called *logRequests.txt*, which should be stored in a log directory within the Mentor root directory.  Each request should be logged in the predefined *dev* format offered by the morgan package.  (Consult the documentation on this package for information on [how to write log requests to a file](https://www.npmjs.com/package/morgan#write-logs-to-a-file).)  Modify the app.js file to use this middleware for all incoming requests.  The log function should execute first and then call the next function in the request handler sequence.


10. ***Create\!***  For this final step, come up with your own additional functionality that you can add to the Mentor application.  This functionality should either (a) require the creation of an additional view that interfaces with the database, (b) require the implementation of a new npm package, or (c) both.  For example, you could create a view (with associated routing functions) that allows an admin user to view existing contact requests.  Alternatively, you might use a package such as [nodemailer](https://nodemailer.com/about/) to create a middleware function that sends an email to an administrator whenever a new contact request is sent (see Chapter 16 for guidance on sending emails).  For this question, implement your new functionality and then describe what you did in the *Q10-description.md* file.  

Deep Thought:

"If you're in a war, instead of throwing a hand grenade at the enemy, throw one of those small pumpkins. Maybe it'll make everyone think how stupid war is, and while they are thinking, you can throw a real grenade at them."

\-Jack Handey

[^1]:  Check the Sequelize documentation on [validations and constraints](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/) to restrict values

[^2]:  Hint:  Use the [is validator](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations) with a [JavaScript regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)

[^3]:  Check the Sequelize documentation on [validations and constraints](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/) to restrict values

[^4]:  Hint:  Use the [is validator](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations) with a [JavaScript regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)