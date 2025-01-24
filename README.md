# api-35 - For Ecommerce
## Node Project Initialize
- `npm init` or `npm init -y`

# package.json file
- Package.json will manage the dependencies. 
- It is automatically created by running npm init or npm init -y command
- It is the core file of our project
- Without this file, Our project cannot run
- It can manage the dependencies (install, upgrade, update dependencies)

### Dependency
- Library, Packages which requires to run your project
- express js

## npm (node package manager)
- npm is also a package given by node itself to manage the dependency

# Command to install package
- npm install <package name>  //OR
- npm i <package name>

# command to unstall package
- npm uninstall <package name>

### Three types of packages
1) project based package (dependency)
   - it only used within a project
   - npm install <package name>

2) Dev depndencies
   - it is used in develpoment phase only
   - npm install <package name> --save-dev    // OR
   - npm install <package name> -D

3) Global dependencies
- use in any project globally
- npm install <package name> --global

### Express
- Fast, unopinionated, minimalist web framework for Node.js
- minimalist => It means the features that express js provide are minimal features thats why it is light weight.
- unopinionated => It means it cannot gives complete structure, you have your own opanion to develop this project
- express is a framework
        - Framework is the compilation of the codebase that gives you multiple features in order to complete a project using an stack
- Architecture design (ecommerce)

### Routing
- Defining or Registering url/api/endpoint for process/event/action/trigger
- http://localhost:9005/
- http 80, https 443 => protocol
- localhost/127.0.0.1 => domain 
- :9005 => port
- / => path

## RESTful services
- state is not maintained/stored between the client and server communication so there is no relation between multiple api calls

# following are the RESTful service/ http verbs  => (Asked in interview)
  operations     methods
- Create  ===>   post
- Read    ===>   get
- update  ===>   put/patch
- delete  ===>   delete

## 4 Category
- CRUD
- Create, Read, Update, Delete

## Pattern
- MVC => Model-View-Controller
- View cannot done on Backend.

# Interview question
- what is model?
- what is controller?
- Why we defined MVC pattern?

## MVC Architecture
- client first request goes to the router
- Router can identify which route, which method and what action to be performed
- on the basis of request router send request to the contoller
- controller can handle the business logic(complete operation) such as validation, database query, insert, notify.
- sometimes nth number of operation to be performed by the controller so to reduce the burden of controller we form a middleware between router and controller.
- middleware works as a controller action and has the capability, exactly what a contoller can do.
- In middleware, If the validation is failed then respond to the client, else sends to the contoller.
- Now, the controller can directly interact with model, and model can directly interact with database.
- sometimes same operation should be performed at multiple places, so on that condition a file called "service" should be maintained between controller and model.
- the payload cames at controller might be dissimilar to the structure of database, so for mapping data modeling, data modeling should done on service
- Now service can sends to the model or return back to the controller
- after completion of all operation, controller can responds to the client in the formate of JASON.

## Router are two types:
1) global router
2) module router