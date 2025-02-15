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

- CRUD
- Auth
- user
- prodeuct
- order
- brand 
- category
- transaction
- review
- chat

## Modules
### Auth
- Register
     - User Register => otp based/link
- Activate
     - via otp, or via link
- Login
     - 2FA
       - Username password
       - otp verify
- User own Profile
     - get profile
- Forgot password
     - verify link send
- Reset password
     - verify link
     - set password
- Logout (optional)
     - logout api
- Refresh
     - renew token api

### Most popular Packages used for validation
- yup
- joi
- zod
- ajv

## Email Service
- SMTP Server
- Production Server
   - sendgrid
   - mailchimp
   - self hosted server
   - gmail
   - mailtrap

## Database
- a permanent storage
- Relational Database
   - data table row and column structure
   - pre defined data structure
   - SQL database
   - eg. mysql, popstgresql, oracle, mssql, sqlite
- Non-relational Database
   - Collection or document
   - json data
   - NoSQL
   - eg. mongodb, cassandra, couchDB

- Program connect => Library
- ORM/ ODM (Object Relational Mapping/OBject Document Mapping)
- SQL db => sequilize, typeorm, prisma
- NoSQL => mongodb(mongoose), self provider

### Atlas mongodb password
- Username => mern-35
- password => SERgAcunRMt4eNDd

### CRUD operation
- #### Create
   - insertOne(), insertMany()
- #### Read
   - find(), findOne()
- #### Update
   - UpdateOne(), UpdateMany()
- #### Delete
   - DeleteOne(), DeleteMany()

### ODM
- .insertOne(), .insertMany(), .UpdateOne(), .UpdateMany(), .find(), .findOne(), .DeleteOne(), .DeleteMany()

## Mongodb Access
- Local DB server
  - `mongosh`

- Atlas server
  - Look into atlas for your cluster connection string
  - mycluster : `mongosh "mongodb+srv://cluster1.02ifz.mongodb.net/" --apiVersion 1 --username mern-35`

  ### Database create / use database
  - `use <dbName>` ==> pick the database, If database cant exist than it create and pick the databse
  -`db` ==> to know the current database

  * Create
  - table -> collection
  - `db.<collection>.insertOne(<jsonObject>)`
  - `db.<collection>.insertMany(<Array of Object>)`
  - eg. `db.users.insertOne({"fullName": "Shivraj Tharu","email": "076bct040.shivraj@sagarmatha.edu.np","password": "$2a$10$1PU.8vT/noKbnWUrHtSjY.WNwLJUaG5tMqMBV3P/PJGd1DGHeSqHK","role": "seller","address": "Kathmandu","phone": "9812345678","gender": "male","image": {"public_url": "https://res.cloudinary.com/du2fkpf7p/image/upload/v1739003221/mern-35/users/pbsmjyhfui5jyvb60qyr.jpg","optimized_url": "https://res.cloudinary.com/du2fkpf7p/image/upload/q_80/v1/mern-35/users/pbsmjyhfui5jyvb60qyr?_a=BAMCkGTG0"},"status": "inactive","activationToken": "o7juXzkmXkCRAoTvdWkk7nwjXxh38iaTQGx8rv1ThuXCR2ptVLupsp1JVKFg8z"},)`


```json
[
   {"fullName": "John Doe","email": "john.doe@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "admin","address": "Kathmandu","phone": "9812345678","gender": "male","image": {"public_url": "https://example.com/image1.jpg","optimized_url": "https://example.com/image1_opt.jpg"},"status": "active","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"},
   {"fullName": "Jane Smith","email": "jane.smith@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "seller","address": "Pokhara","phone": "9812345679","gender": "female","image": {"public_url": "https://example.com/image2.jpg","optimized_url": "https://example.com/image2_opt.jpg"},"status": "inactive","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"},
   {"fullName": "Alice Johnson","email": "alice.johnson@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "user","address": "Lalitpur","phone": "9812345680","gender": "female","image": {"public_url": "https://example.com/image3.jpg","optimized_url": "https://example.com/image3_opt.jpg"},"status": "active","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"},
   {"fullName": "Bob Brown","email": "bob.brown@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "admin","address": "Bhaktapur","phone": "9812345681","gender": "male","image": {"public_url": "https://example.com/image4.jpg","optimized_url": "https://example.com/image4_opt.jpg"},"status": "inactive","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"},
   {"fullName": "Charlie Davis","email": "charlie.davis@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "seller","address": "Biratnagar","phone": "9812345682","gender": "other","image": {"public_url": "https://example.com/image5.jpg","optimized_url": "https://example.com/image5_opt.jpg"},"status": "active","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"},
   {"fullName": "David Evans","email": "david.evans@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "user","address": "Dharan","phone": "9812345683","gender": "male","image": {"public_url": "https://example.com/image6.jpg","optimized_url": "https://example.com/image6_opt.jpg"},"status": "inactive","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"},
   {"fullName": "Eve Foster","email": "eve.foster@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "admin","address": "Butwal","phone": "9812345684","gender": "female","image": {"public_url": "https://example.com/image7.jpg","optimized_url": "https://example.com/image7_opt.jpg"},"status": "active","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"},
   {"fullName": "Frank Green","email": "frank.green@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "seller","address": "Hetauda","phone": "9812345685","gender": "male","image": {"public_url": "https://example.com/image8.jpg","optimized_url": "https://example.com/image8_opt.jpg"},"status": "inactive","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"},
   {"fullName": "Grace Harris","email": "grace.harris@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "user","address": "Janakpur","phone": "9812345686","gender": "female","image": {"public_url": "https://example.com/image9.jpg","optimized_url": "https://example.com/image9_opt.jpg"},"status": "active","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"},
   {"fullName": "Hank Irving","email": "hank.irving@example.com","password": "$2a$10$abcdefghijklmnopqrstuv","role": "admin","address": "Nepalgunj","phone": "9812345687","gender": "male","image": {"public_url": "https://example.com/image10.jpg","optimized_url": "https://example.com/image10_opt.jpg"},"status": "inactive","activationToken": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCD"}
]
```

### Data Read (select)
- `db.<collectionName>.findOne(filter, projection, config)`
- `db.<collectionName>.find(filter, projection, config)`

* Filter
- query
- an object data 
- simple complex
- {role: 'admin'}

```json
  {key: value, key1: value, ....}
  => where key = value and key1 = value

  {$op: express}
  {key: {$op: value}}
  age key => 30
  {age: {$gte:30}}

  {$or: [{key:value}, {key:value}]}  => key = "value" or key1 = "value"

  {name: new Regex('s', 'i')}

  {key: value}

//   $gt, $gte, $lt, $lte, $and, $or, $in, $nin, $eq, $ne 

config: {
   sort: {key: direction},  //direction => ASC, DESC
   limit: Number,
   skip: Number,
   
}
  ```

### Update (Update)
- `db.<collection>.updateOne(filter, {$set: <updateData>}, config)`
- `db.<collection>.updateMany(filter, {$set: <updateData>}, config)`

### delete (delete)
- `db.<collection>.deleteOne(filter)`
- `db.<collection>.deleteMany(filter)`

## Package Mongoose
- Handle db in our application
- Server
    - Relational Data
       - Data are stored in table basis  with row and column
    - Non-Relational Data
       - Data are stored in non-tabular format or in document style

- Sql database
  - mySql, postgresql, oracle, mssql, access

- NoSQL database (Not-Only SQL)
  - Mongodb, Couchdb, cassendra

- Most Popular
  - sql => mysql, mariadb, postgresql, mssql, oracle
  - NoSQL => mongodb

### Mongodb
- two way of storage
  a. locally (in your machine)
      - setup your server
  b. Cloud (Atlas Server)
      - we need an account to access

##  Core connection
- Mongodb
## ODM
- mongoose

### Features data
- users
   - fullName, email, password, address, gender, role, status
- banners/ slider (SQL)
- brands
- categories
- products
- orders
- transactions
- inventories
- voucher/coupons
- reviews
- chats

## Model
- Database model

