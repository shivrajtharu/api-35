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
-express js

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

- 127.0.0.1 => localhost