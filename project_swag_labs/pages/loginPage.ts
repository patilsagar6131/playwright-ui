import { Page } from "@playwright/test";
import path from "path";

export class LoginPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async login() {
        await this.page.goto(process.env.SWAG_URL!);
        await this.page.locator("//input[@id='user-name']").fill("standard_user");
        await this.page.locator("//input[@id='password']").fill("secret_sauce");
        await this.page.locator("//input[@id='login-button']").click();
    }
}