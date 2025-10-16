import { Locator, Page } from "@playwright/test";

export class ShoppingPage {
    readonly page: Page;
    readonly addToCartBtn : Locator
    readonly headingTxt: Locator
    readonly productPrice : Locator
    constructor(page: Page){
        this.page = page;
        this.addToCartBtn = page.locator("(//button[@class='btn_primary btn_inventory'])[1]");
        this.headingTxt = page.locator("(//div[@class='inventory_item_name'])[1]");
        this.productPrice = page.locator("(//div[@class='inventory_item_price'])[1]");
    }

    async clickAddToCart(){
        await this.addToCartBtn.click();
    }

    async getProductName(){
        const productName = await this.headingTxt.textContent();
        console.log("Product added to cart is: " + productName);

    }

    async getProductPrice(){
        const price = await this.productPrice.textContent();
        console.log("Product price is: " + price);
    }
}