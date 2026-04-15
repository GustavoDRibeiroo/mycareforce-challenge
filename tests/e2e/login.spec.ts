import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { createUser } from '../pages/helper';
import { loginPage } from '../pages/login';

test.describe('Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');


    })

    test('should login with valid credentials', async ({ page }) => {

        const login = new loginPage(page);

        await login.clickLoginButton()
        await login.fillLoginForm('gustavoteste5@tuamaeaquelaursa.com', 'Teste@123')
        await expect(page.getByText('Assistidos recentemente')).toBeVisible();

    })

    test('should not login with invalid password', async ({ page }) => {

        const login = new loginPage(page);

        await login.clickLoginButton()
        await login.fillLoginForm('gustavoteste5@tuamaeaquelaursa.com', 'Teste@12345')
        await expect(page.getByText('Assistidos recentemente')).not.toBeVisible();

        await expect(page.getByText('Email ou senha incorretos')).toBeVisible();

    })

    test('should not login with empty fields', async ({ page }) => {

        const login = new loginPage(page);

        await login.clickLoginButton()
        await login.fillLoginForm('', '')
        await expect(page.getByText('Assistidos recentemente')).not.toBeVisible();

        await expect(page.getByText('Deveria haver um texto informando ao usuário que ele deve preencher os campos')).toBeVisible();

    })
})