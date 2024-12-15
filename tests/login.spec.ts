import { test, expect } from '@playwright/test';
import { url } from 'inspector';

let root_url = 'https://automationpratice.com.br';
let valid_email = 'teste@gmail.com';
let valid_password = '123456';

//test.beforeAll(async ({page}) => {
//    await page.goto(root_url);
//});

test('Sucessful login', async ({ page }) => {
  await page.goto(root_url);

  await page.getByRole('link', { name: ' Login' }).click();

  await page.locator('#user').fill(valid_email);
  await page.locator('#password').fill(valid_password);

  await page.getByRole('button', { name: 'login' }).click();

  await expect(page.url()).toBe(`${root_url}/my-account`);
  await expect(page.getByRole('heading', { name: 'Login realizado' })).toBeVisible();
  await expect(page.getByText(`Olá, ${valid_email}`)).toBeVisible();
});

test('Login without email', async ({ page }) => {
    await page.goto(root_url);
  
    await page.getByRole('link', { name: ' Login' }).click();
  
    await page.locator('#password').fill(valid_password);
  
    await page.getByRole('button', { name: 'login' }).click();
  
    await expect(page.getByText('E-mail inválido.')).toBeVisible();
  });

test('Login without password', async ({ page }) => {
    await page.goto(root_url);

    await page.getByRole('link', { name: ' Login' }).click();

    await page.locator('#user').fill(valid_email);

    await page.getByRole('button', { name: 'login' }).click();

    await expect(page.getByText('Senha inválida.')).toBeVisible();
});