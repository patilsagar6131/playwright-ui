import test, { Page } from "@playwright/test";
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
test('add to cart', { tag: ['@smoke','@addToCart'] }, async({page})=>{
    await shoppingPage.clickAddToCart();
    
})

test('get product price',async({page})=>{
    await shoppingPage.getProductPrice();
})

test('get product name',async({page})=>{
    await shoppingPage.getProductName();
})