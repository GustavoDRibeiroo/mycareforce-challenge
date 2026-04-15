import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { registerPage } from '../pages/register';
import { createUser } from '../pages/helper';

test.describe('User Registration', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

    })

    test('should register a new user succesfully', async ({ page }) => {

        const user = createUser();

        const register = new registerPage(page);

        await register.clickLoginButton()
        await register.clickRegisterButton()
        await register.fillRegistrationForm(user.name, user.email, user.password);
        await register.submitRegistrationButton();
        await page.getByRole('img').nth(5).click();
        await expect(page.getByRole('img').nth(5)).toBeVisible();

    })
})
