import { Page, Locator } from '@playwright/test'

export class recoverPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }


    async clickForgotPassword() {
        await this.page.getByRole('button', { name: 'Entrar' }).click();
        await this.page.getByText('Esqueceu sua senha?').click();
    }

    async fillEmail(email: string) {
        await this.page.getByRole('textbox', { name: 'Digite seu email' }).click();
        await this.page.getByRole('textbox', { name: 'Digite seu email' }).fill(email);
    }

    async continueButton() {
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }
}
