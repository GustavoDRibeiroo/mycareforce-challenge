import { Page, Locator } from '@playwright/test'
import { faker } from '@faker-js/faker';

export class registerPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async fillRegistrationForm(name: string, email: string, password: string) {

        await this.page.getByPlaceholder('Seu nome de usuário').fill(name);
        await this.page.getByPlaceholder('Seu email').fill(email);
        await this.page.getByPlaceholder('Sua senha').fill(password);

    }

    async submitRegistrationButton() {
        await this.page.getByRole('button', { name: 'Criar conta' }).click();
    }

    async clickLoginButton() {
        await this.page.getByRole('button', { name: 'Entrar' }).click();
    }

    async clickRegisterButton() {
        await this.page.getByRole('link', { name: 'Criar conta' }).click();
    }

}