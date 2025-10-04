import test, { expect } from "@playwright/test";
import { demo_qa } from "../pages/demo_qa";
import { Db, MongoAPIError } from "mongodb";
import { Mongo } from "../utils/mongo";





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
    const testData = await mongo.connectToMongoDB("JIRA-123");
    const demoQA = new demo_qa(page);
    await page.goto(process.env.URL!);
    await demoQA.clickOnElementsLink();
    await demoQA.clickOnTextBoxLink();   
    
})