import { test, expect } from '@playwright/test';

test('Validate login screen', async ({ page }) => {

  // await page.goto('https://krupa.rt.gw/members/demo/media/album/');
  await page.goto('https://rtcamp:goodwork@krupa.rt.gw/'); 
  await expect(page.getByText('Howdy, ')).toBeVisible();
  
  await page.close();
});
