import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { createUser } from '../pages/helper';
import { loginPage } from '../pages/login';

test.describe('Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

    })

    test('should login with valid credentials', async ({ page }) => {

        const user = createUser();
        const login = new loginPage(page);
        const searchBar = page.getByPlaceholder('Buscar');

        await login.clickLoginButton()
        await login.fillLoginForm(user.email, user.password)
        await expect(searchBar).toBeVisible();

    })

    test('should not login with invalid password', async ({ page }) => {

        const user = createUser();
        const login = new loginPage(page);

        await login.clickLoginButton()
        await login.fillLoginForm(user.email, 'randompassword')
        await login.clickSubmitButton()
        await expect(page.getByText('Assistidos recentemente')).not.toBeVisible();

        await expect(page.getByText('Senha incorreta')).toBeVisible();

    })

    test('should not login with invalid email', async ({ page }) => {

        const login = new loginPage(page);

        await login.clickLoginButton()
        await login.fillLoginForm('randomwrongemail@tuamaeaquelaursa.com', 'Teste@12345')
        await login.clickSubmitButton()
        await expect(page.getByText('Assistidos recentemente')).not.toBeVisible();

        await expect(page.getByText('Email ou senha incorretos')).toBeVisible();

    })

    test('should not login with empty fields', async ({ page }) => {

        const login = new loginPage(page);

        await login.clickLoginButton()
        await login.fillLoginForm('', '')
        await login.clickSubmitButton()
        await expect(page.getByText('Assistidos recentemente')).not.toBeVisible();

        // await expect(page.getByText('Deveria haver um texto informando ao usuário que ele deve preencher os campos')).toBeVisible();

    })
})