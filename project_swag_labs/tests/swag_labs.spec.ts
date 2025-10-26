import test, { expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/loginPage"
import { ShoppingPage } from "../pages/ShoppingPage";
import { Mongo } from "../../utils/Mongo";
import {getVaultSecrets} from "../../utils/VaultClient"

let loginPage : LoginPage
let shoppingPage : ShoppingPage
let page: Page
let mongo: Mongo
let testData:any
test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page);
    mongo = new Mongo();
    shoppingPage = new ShoppingPage(page);
    await loginPage.login();      
    let mongoURI = await getVaultSecrets(process.env.SECRET_PATH!,'mongoURI',process.env.VAULT_URL!,process.env.VAULT_TOKEN_NUMBER!)
    testData = await mongo.connectToMongoDB(mongoURI,'JIRA-234');    
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
    await shoppingPage.verifyProductHeading();
    await expect(page.locator('[role="alert"]')).toHaveCount(0);
    await expect(page.locator('.error-message')).toBeHidden();
})

test('place order',{tag:['@regression','@noError']},async({page})=>{
    await shoppingPage.clickAddToCart();
    await shoppingPage.clickCartBadge();
    await shoppingPage.clickCheckoutBtn();
    await shoppingPage.fillForm(testData.firstName,testData.lastName,testData.zipCode);
    await shoppingPage.verifyOrderPlaced();
})