import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { createUser } from '../pages/helper';
import { recoverPage } from '../pages/recover';

test.describe('Recover Password', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

    })

    test('should send a code to an valid email', async ({ page }) => {

        const user = createUser();
        const recover = new recoverPage(page);
        const email = user.email;

        await recover.clickForgotPassword()
        await recover.fillEmail(email);
        await recover.continueButton();
        await expect(page.getByText(`Enviamos um código para ${email}. Informe o código abaixo para recuperar sua conta.`)).toBeVisible();

    })

    test('should not recover password with invalid email', async ({ page }) => {

        const recover = new recoverPage(page);
        const email = 'wrongemail@gmail.com'

        await recover.clickForgotPassword();
        await recover.fillEmail(email);
        await recover.continueButton();
        await expect(page.getByText('Não existe uma conta com este email')).toBeVisible();
    });

    test('continue button should be disabled with empty email', async ({ page }) => {

        const recover = new recoverPage(page);
        const button = page.getByRole('button', { name: 'Continuar' })

        await recover.clickForgotPassword();
        await expect(button).toBeDisabled();

    });
})