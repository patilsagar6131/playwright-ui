import { expect, Locator, Page } from "@playwright/test";

export class ShoppingPage {
    readonly page: Page;
    readonly addToCartBtn : Locator
    readonly headingTxt: Locator
    readonly productPrice : Locator
    readonly productsLabel: Locator
    readonly sortDropdown : Locator

    readonly productAddToCartBtn1 : Locator
    readonly productAddToCartBtn2 : Locator
    readonly productAddToCartBtn3 : Locator
    readonly productAddToCartBtn4 : Locator
    readonly productAddToCartBtn5 : Locator
    readonly productAddToCartBtn6 : Locator

    readonly socialTwitterBtn : Locator
    readonly socialFacebookBtn : Locator
    readonly socialLinkedInBtn : Locator

    readonly cartBadge : Locator  
    readonly burgerMenuBtn : Locator
    readonly closeMenuBtn : Locator
    readonly allItemsLink : Locator
    readonly aboutLink : Locator
    readonly logoutLink : Locator
    readonly resetAppStateLink : Locator

    readonly checkoutBtn : Locator

    readonly firstNameTxtBox: Locator
    readonly lastNameTxtBox: Locator
    readonly zipCodeTxtBox : Locator

    readonly submitBtn : Locator
    readonly checkoutoverview : Locator
    readonly sauceCardTxt: Locator
    readonly finishBtn : Locator
    readonly orderPlaced: Locator

    constructor(page: Page){
        this.page = page;
        this.addToCartBtn = page.locator("(//button[@class='btn_primary btn_inventory'])[1]");
        this.headingTxt = page.locator("(//div[@class='inventory_item_name'])[1]");
        this.productPrice = page.locator("(//div[@class='inventory_item_price'])[1]");
        this.productsLabel = page.locator("//div[@class='inventory_item_name']");
        this.productsLabel = page.locator("//div[@class='product_label']");
        this.sortDropdown = page.locator("//select[@class='product_sort_container']");
        this.productAddToCartBtn1 = page.locator("(//button[@class='btn_primary btn_inventory'])[1]");       
        this.productAddToCartBtn2 = page.locator("(//button[@class='btn_primary btn_inventory'])[2]");
        this.productAddToCartBtn3 = page.locator("(//button[@class='btn_primary btn_inventory'])[3]");
        this.productAddToCartBtn4 = page.locator("(//button[@class='btn_primary btn_inventory'])[4]");
        this.productAddToCartBtn5 = page.locator("(//button[@class='btn_primary btn_inventory'])[5]");
        this.productAddToCartBtn6 = page.locator("(//button[@class='btn_primary btn_inventory'])[6]");

        this.socialTwitterBtn = page.locator("//li[@class='social_twitter']");
        this.socialFacebookBtn = page.locator("//li[@class='social_facebook']");
        this.socialLinkedInBtn = page.locator("//li[@class='social_linkedin']");
        this.cartBadge = page.locator("//a[@href='./cart.html']");
        this.burgerMenuBtn = page.locator("//button[contains(text(),'Open Menu')]");
        this.closeMenuBtn = page.locator("//button[contains(text(),'Close Menu')]");
        this.allItemsLink = page.locator('#inventory_sidebar_link');
        this.aboutLink = page.locator('#about_sidebar_link');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.resetAppStateLink = page.locator('#reset_sidebar_link');
        this.checkoutBtn = page.locator("//a[@class='btn_action checkout_button']");
        this.firstNameTxtBox = page.locator('#first-name')
        this.lastNameTxtBox = page.locator('#last-name')
        this.zipCodeTxtBox = page.locator('#postal-code')
        this.submitBtn = page.locator("//input[@class='btn_primary cart_button']")
        this.checkoutoverview = page.getByText('Checkout: Overview')
        this.sauceCardTxt = page.getByText('SauceCard')
        this.finishBtn = page.getByText('FINISH')
        this.orderPlaced = page.getByText('THANK YOU FOR YOUR ORDER')
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

    async verifySocialMediaLinks(){
        await expect(this.socialTwitterBtn).toBeTruthy();
        await expect(this.socialFacebookBtn).toBeTruthy();
        await expect(this.socialLinkedInBtn).toBeTruthy();
        
    }

    async verifyCartBadge(){
        await expect(this.cartBadge).toBeTruthy();
        await expect(this.cartBadge).toBeEnabled();
    }
    async verifyBurgerMenu(){
        await this.burgerMenuBtn.click();
        await expect(this.allItemsLink).toContainText('All Items');
        await expect(this.aboutLink).toContainText('About');
        await expect(this.logoutLink).toContainText('Logout')
        await expect(this.resetAppStateLink).toContainText('Reset App State')
        await expect(this.allItemsLink).toBeTruthy();
        await expect(this.aboutLink).toBeTruthy();
        await expect(this.logoutLink).toBeTruthy();
        await expect(this.resetAppStateLink).toBeTruthy();
        await this.closeMenuBtn.click();
    }
    async verifyProductHeading(){
        await expect(this.productsLabel).toContainText('Products')
    }

    async verifyProductsVisible(){
        await expect(this.productAddToCartBtn1).toBeTruthy();
        await expect(this.productAddToCartBtn2).toBeTruthy();
        await expect(this.productAddToCartBtn3).toBeTruthy();
        await expect(this.productAddToCartBtn4).toBeTruthy();
        await expect(this.productAddToCartBtn5).toBeTruthy();
        await expect(this.productAddToCartBtn6).toBeTruthy();
        

    }

    async verifySortDropdown(){
        await expect(this.sortDropdown).toBeEnabled();
    }
    async clickCartBadge(){
        await this.cartBadge.click();
    }
    async clickCheckoutBtn(){
        await this.checkoutBtn.click();
    }
    async fillForm(firstName:string, lastName:string,zipCode:string){
        await this.firstNameTxtBox.fill(firstName)
        await this.lastNameTxtBox.fill(lastName)
        await this.zipCodeTxtBox.fill(zipCode)
        await this.submitBtn.click();
    }
    async verifyOrderPlaced(){
        await expect(this.checkoutoverview).toBeVisible();
        await expect(this.sauceCardTxt).toBeVisible();
        await this.finishBtn.click();
        await expect(this.orderPlaced).toBeVisible();
        await expect(this.orderPlaced).toContainText('THANK YOU FOR YOUR ORDER')

    }
}