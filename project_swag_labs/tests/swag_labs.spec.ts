import test, { expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/loginPage"
import { ShoppingPage } from "../pages/ShoppingPage";

let loginPage : LoginPage
let shoppingPage : ShoppingPage
let page: Page
test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page);
    shoppingPage = new ShoppingPage(page);
    await loginPage.login();
    
})
test('verify all elements loads successfully',{tag:['@smoke','@verifyLoading']},async({page})=>{
    await shoppingPage.verifyProductsVisible();
    await shoppingPage.verifyProductHeading();
    await shoppingPage.verifyBurgerMenu();
    await shoppingPage.verifyCartBadge();
    await shoppingPage.verifySocialMediaLinks();
    await shoppingPage.verifySortDropdown();
})

test('verify page loads without any error',{tag:['@smoke','@noError']},async({page})=>{
    await expect(page.locator('[role="alert"]')).toHaveCount(0);
    await expect(page.locator('.error-message')).toBeHidden();

})

test('place order',{tag:['@regression','@noError']},async({page})=>{
    await shoppingPage.clickAddToCart();
    await shoppingPage.clickCartBadge();
    await shoppingPage.clickCheckoutBtn();
    await shoppingPage.fillForm();
    await shoppingPage.verifyOrderPlaced();

})