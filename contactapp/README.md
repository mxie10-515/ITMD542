# ITMD542 

• Ming Xie
• mxie10@hawk.iit.edu
• ITMD542 Lab2 
• https://github.com/mxie10-515/ITMD542

• Project Description:
This web application allows users to manage their contacts efficiently. Here are the key features:
1.Introduction Page:
The home page provides a brief overview of the application.Users can find a link or button to navigate to the main contacts page
2.Contacts List View:
Displays all contacts in a table format.Provides link to create a new contact and link to a ndividual contact.
3.Single Contact View:
Shows detailed information about a specific contact. Allows users to edit or delete the contact.
4 dData Persistence:
Contacts data is stored in a JSON file (contacts.json).
Read from the file on every page load.
Save data back to the file when create a new contact and modify a contact.

• Development Environment:
Operating System: Windows (specific version not specified)
Node.js: version v12.18.2
Editor: Visual Studio Code (VS Code)

• Installation/Running Instructions:
1.Install Node.js
2.Navigate to the Project Directory: cd contactapp
3.Install Dependencies: 
In the project directory, run $ npm install.This command will install all the necessary dependencies listed in the package.json file
4.Update Dependencies:
User can update Dependencies if needed.run 
command to check for outdated dependencies and update them: $ npx npm-check-updates -u.
This will update your package.json with the latest versions of your dependencie
5.Start the Application:
Run the following command to start your Express app:$ npm start
The app will be accessible at http://localhost:3000 (by default).

• Insights and Results:
1.I've learned how to design RESTful API using Express.
2.I've learned how to simulate a database by using js datasture such as map and array and persist the data using a file on the file system.
3.The challenges is to understand to different CRUD operations in RESTful API need corresponding endpoints with url. It'a little difficult to figure it out at the begainning. Finally, I sort out all the urls and routing policy.
