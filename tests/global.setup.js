import{ expect, test as setup } from '@playwright/test';
// import { STORAGE_STATE } from './playwright.config';
import { STORAGE_STATE } from '../playwright.config';

setup('Perform Login Action', async({page})=>{

    console.log('from global setup fie');

    await page.goto('https://rtcamp:goodwork@krupa.rt.gw/'); 

    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByLabel('Username or Email Address').fill('demo');
    await page.getByLabel('Password', { exact: true }).fill('demo');
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByText('Howdy, ')).toBeVisible();

    //Save session
    await page.context().storageState({ path: STORAGE_STATE });
    
});