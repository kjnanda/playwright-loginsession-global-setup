# playwright-loginsession-global-setup
This repo is to demonstrate the use of login session management via global setup and project dependencies

This example will show you how to use project dependencies to create a global setup that logins into an application and saves the state in storage state. This is useful if you want to run multiple tests that require a sign sign-in state and you want to avoid login for each test.

Let's understand what is inside this project.

## playwright.config.js File

### Setting up the new project

First we add a new project with the name 'setup'. testMatch property in order to match the file called **global**.setup.ts

```
{
    name: 'setup',
    testMatch: '**/*.setup.js',
    
  },
```
### Adding the newly created project as dependancy for exsisting project

Then we add the testProject.dependencies property to our projects that depend on the setup project and pass into the array the name of of our dependency project, which we defined in the previous step

```
{
    name: 'chromium',
   
    use: { ...devices['Desktop Chrome'],
   },
    dependencies: ['setup'],
  },

```

### Exporting STORAGE_STATE

The setup project will write the storage state into an 'playwright/.auth/user.json' (where all the cookies and session data will be stored) file next to your playwright.config. By exporting a const of STORAGE_STATE we can then easily share the location of the storage file between projects with the StorageState method. 

```
export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/login-data.json');
```

The session data will be stored in login-data.json file once we run the test. Aslo, this  **playwright/.auth/login-data.json** structure will automatically be created at the root of the project.

Now, use the storage state inside the project to retrive session stored in **STORAGE_STATE**

```
{
    name: 'chromium',
   
    use: { ...devices['Desktop Chrome'],
    storageState: STORAGE_STATE,
   },
    testMatch: '**/*.spec.js',
    dependencies: ['setup'],

  }
```

### Creating generic setup file

We then create a setup test, create it within `tests` dir, that logs in to an application and populates the context with the storage state after the login actions have been performed. 

By doing this you only have to log in once and the credentials will be stored in the STORAGE_STATE file, meaning you don't need to log in again for every test. 

Import the STORAGE_STATE from the Playwright config file and then use this as the path to save your storage state to the page's context.

```
import{ expect, test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('Perform Login Action', async({page})=>{

    console.log('from global setup fie');

    await page.goto('/'); //Set URL here 

    await page.getByLabel('Username or Email Address').fill('USER_NAME'); //Enter Username
    await page.getByLabel('Password', { exact: true }).fill('USER_PASS'); //Enter Password
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByText('Howdy, ')).toBeVisible(); //Validate login screen

    await page.context().storageState({ path: STORAGE_STATE }); //Store the session
    
});
```

So with Global setup and project dependency we can reuse the state that we stored in `login-data.jso` file and rest test scenario file `(E.G. example.spec.js)` will use it to further execution.

### Run the test

```npx playwright test tests/example.spec.js```

While running the command make sure you are at the root of your project folder.
