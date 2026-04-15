import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { registerPage } from '../pages/register';
import { createUser } from '../factories/helper';

test.describe('Registration', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('/');

    })

    test('should register a new user succesfully', async ({ page }) => {

        const user = createUser();
        const profilePicture = page.getByRole('img').nth(5);
        const register = new registerPage(page);

        await register.clickLoginButton()
        await register.clickRegisterButton()
        await register.fillRegistrationForm(user.name, user.email, user.password);
        await register.submitRegistrationButton();
        await profilePicture.click();
        await expect(profilePicture).toBeVisible();

    })

    test('should not register a user with an existing email', async ({ page }) => {

        // const user = createUser();

        const register = new registerPage(page);

        await register.clickLoginButton()
        await register.clickRegisterButton()
        await register.fillRegistrationForm('Usuarioteste1234', 'gustavoteste5@tuamaeaquelaursa.com', 'Teste123@');
        await register.submitRegistrationButton();

        // await register.clickRegisterButton()
        // await register.fillRegistrationForm('AnotherUser', user.email, 'AnotherPassword');
        // await register.submitRegistrationButton();

        await expect(page.getByText('Já existe uma conta com este email')).toBeVisible();
    })

    // test('should not register a user with an invalid email', async ({ page }) => {

    //     const register = new registerPage(page);

    //     await register.clickLoginButton()
    //     await register.clickRegisterButton()
    //     await register.fillRegistrationForm('Exemplodescartavel', 'emailsemarrobagmail.com', 'password');
    //     await register.submitRegistrationButton();

    //     await register.clickRegisterButton()
    //     await register.submitRegistrationButton();

    //     await expect(page.getByText('Deveria conter uma mensagem para indicar ao usuário que o email está incorreto')).toBeVisible();
    // })

    // test('should not register without filling password field', async ({ page }) => {

    //     const register = new registerPage(page);

    //     await register.clickLoginButton()
    //     await register.clickRegisterButton()
    //     await register.fillRegistrationForm('Exemplodescartavel', 'emailsemarrobagmail.com', '');
    //     await register.submitRegistrationButton();

    //     await register.clickRegisterButton()
    //     await register.submitRegistrationButton();

    //     await expect(page.getByText('Deveria conter uma mensagem para indicar ao usuário que o campo de senha é obrigatório')).toBeVisible();
    // })

    // test('should not register without filling email field', async ({ page }) => {

    //     const register = new registerPage(page);

    //     await register.clickLoginButton()
    //     await register.clickRegisterButton()
    //     await register.fillRegistrationForm('Exemplodescartavel', '', 'password');
    //     await register.submitRegistrationButton();

    //     await register.clickRegisterButton()
    //     await register.submitRegistrationButton();

    //     await expect(page.getByText('Deveria conter uma mensagem para indicar ao usuário que o campo de email é obrigatório')).toBeVisible();
    // })

    // test('should not register without filling username field', async ({ page }) => {

    //     const register = new registerPage(page);

    //     await register.clickLoginButton()
    //     await register.clickRegisterButton()
    //     await register.fillRegistrationForm('', 'emailexample@gmail.com', 'password');
    //     await register.submitRegistrationButton();

    //     await register.clickRegisterButton()
    //     await register.submitRegistrationButton();

    //     await expect(page.getByText('Deveria conter uma mensagem para indicar ao usuário que o campo de nome de usuário é obrigatório')).toBeVisible();
    // })
})
