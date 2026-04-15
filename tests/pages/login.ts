import { Page, Locator } from '@playwright/test'

export class loginPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async fillLoginForm(email: string, password: string) {

        await this.page.getByPlaceholder('Seu email').fill(email);
        await this.page.getByPlaceholder('Sua senha').fill(password);

    }

    async clickLoginButton() {
        await this.page.getByRole('button', { name: 'Entrar' }).click();

    }

}