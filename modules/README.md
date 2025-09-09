# Notes for Using node

Each folder will most likely be a different application as the class is worked through. There are some steps to follow when running the node app or when creating a new node app.

## Creating new

- Add new module folder
- Run `npm init` to initialize the folder as a node application, it will auto generate a package.json file
- install nodemon with `npm install --save-dev nodemon` ***This is only needed if you want auto restarting of the node server***
  - add `"start": "nodemon app.js"` to the package.json

## Running node

If you want to run node with nodemon enter `npm start`. Otherwise you can start the node server with `node [default_app_file]`
