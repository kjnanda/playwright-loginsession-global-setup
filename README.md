# playwright-loginsession-global-setup
This repo is to demonstrate the use of login session management via global setup and project dependacies

This example will show you how to use project dependencies to create a global setup that logins into an application and saves the state in storage state. This is useful if you want to run multiple tests that require a sign sign-in state and you want to avoid login for each test.

Let's understand what is inside this project.

## playwright.config.js File

### Setting up the new project

First we add a new project with the name 'setup'. testMatch property in order to match the file called **global**.setup.ts

### Adding the newly created project as dependancy for exsisting project

Then we add the testProject.dependencies property to our projects that depend on the setup project and pass into the array the name of of our dependency project, which we defined in the previous step

### Exporting STORAGE_STATE

The setup project will write the storage state into an 'playwright/.auth/user.json' (where all the cookies and session data will be stored) file next to your playwright.config. By exporting a const of STORAGE_STATE we can then easily share the location of the storage file between projects with the StorageState method. 

### Creating generic setup file

We then create a setup test, create it within `tests` dir, that logs in to an application and populates the context with the storage state after the login actions have been performed. 

By doing this you only have to log in once and the credentials will be stored in the STORAGE_STATE file, meaning you don't need to log in again for every test. 

Import the STORAGE_STATE from the Playwright config file and then use this as the path to save your storage state to the page's context.

