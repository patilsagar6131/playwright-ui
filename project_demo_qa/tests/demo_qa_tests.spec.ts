import test, { expect } from "@playwright/test";
import { demo_qa } from "../pages/demo_qa";
import { Db, MongoAPIError } from "mongodb";
import { Mongo } from "../utils/mongo";
import { clear } from "console";
import { getVaultSecrets } from "../utils/VaultClient";

let mongo :Mongo;
let testData: any;

test.beforeAll(async () => {
    mongo = new Mongo();
    // testData = await mongo.connectToMongoDB("JIRA-123");
});

test('verify the title',{tag:['@smoke','@title']},async ({page})=>{
    await page.goto(process.env.URL!);
    let title = await page.title()
    await expect(page).toHaveTitle("DEMOQA");
})
test('click on yes radio button',{tag:['@smoke','@radiobtn']},async ({page})=>{
//    test.slow()
   const demoQA = new demo_qa(page);
   await page.goto(process.env.URL!);
   await demoQA.clickOnElementsLink();
   await demoQA.clickOnradioBtnLink();
   await demoQA.clickOnYesRadioBtn();  
})

test('fill the text boxes',{tag:['@regression','@textbox']},async ({page})=>{
    const MONGO_URI = await getVaultSecrets(process.env.VAULT_PATH!,'MONGO_URI');
    console.log('mongo db base url '+ MONGO_URI);
    const testData = await mongo.connectToMongoDB(MONGO_URI,"JIRA-123");
    const demoQA = new demo_qa(page);
    await page.goto(process.env.URL!);
    await demoQA.clickOnElementsLink();
    await demoQA.clickOnTextBoxLink();   
    
})

test('pull secrets from vault',{tag:['@regression','@vault']},async ({page})=>{
    const MONGO_URI = await getVaultSecrets(process.env.VAULT_PATH!,'MONGO_URI')
    console.log('fetching secrets from vault',MONGO_URI);
})

