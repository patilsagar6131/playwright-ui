import test, { expect } from "@playwright/test";
import { demo_qa } from "../pages/demo_qa";

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
