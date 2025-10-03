import { expect, Locator, Page } from "@playwright/test";
import { time } from "console";
import { TIMEOUT } from "dns";

export class demo_qa {
    

    readonly page : Page;
    readonly elementsLink : Locator;
    readonly radioBtnLink : Locator;
    readonly yesRadioBtn : Locator;
    readonly yesTxt : Locator;
    readonly textBoxLink : Locator;

    readonly fullNameTextBox : Locator;
    readonly emailTextBox : Locator;
    readonly currentAddressTextBox : Locator;
    readonly permanentAddressTextBox : Locator;
    readonly submitBtn : Locator;
    readonly nameText : Locator;
    readonly emailText : Locator;
    readonly currentAddressText : Locator;
    readonly permanentAddressText : Locator;

    constructor (page : Page){
        this.page = page 
        this.elementsLink = page.locator("//h5[text()='Elements']")
        this.radioBtnLink = page.locator("//span[contains(text(),'Radio Button')]")
        this.yesRadioBtn = page.locator('#yesRadio')
        this.yesTxt = page.getByText("You have selected").nth(0);
        this.textBoxLink = page.locator("//span[contains(text(),'Text Box')]")
        this.fullNameTextBox = page.locator('#userName')
        this.emailTextBox = page.locator('#userEmail')
        this.currentAddressTextBox = page.locator('#currentAddress')
        this.permanentAddressTextBox = page.locator('#permanentAddress')  
        this.submitBtn = page.locator('#submit')  
        this.nameText = page.locator('#name')
        this.emailText = page.locator('#email')
        this.currentAddressText = page.locator('p#currentAddress')
        this.permanentAddressText = page.locator('p#permanentAddress')
    }

    async clickOnElementsLink(){
        await this.elementsLink.click();
    }
    async clickOnradioBtnLink(){
        await this.radioBtnLink.click();
    }
    async clickOnYesRadioBtn(){
        await this.yesRadioBtn.click({force:true});
        const yesText = await this.yesTxt.textContent();
        console.log("Text after clicking radio button " + yesText);
        await this.yesTxt.textContent().then((text)=>{text?.includes("Yes")});
    }
    async clickOnTextBoxLink(){
        await this.textBoxLink.click();
    }
    async enterText(fullname: string , emailAddr: string, currentAddr:string, permAddr:string){
        await this.fullNameTextBox.fill(fullname);
        await this.emailTextBox.fill(emailAddr);
        await this.currentAddressTextBox.fill(currentAddr);
        await this.permanentAddressTextBox.fill(permAddr);
        await this.submitBtn.click();
        await this.page.waitForTimeout(3000);
        const name = await this.nameText.textContent();
        console.log("Name text: " + name);
        await expect(this.nameText).toContainText(fullname);
        const email = await this.emailText.textContent();
        console.log("Email text: " + email);
        await expect(this.emailText).toContainText(emailAddr);
        const currentAddress = await this.currentAddressText.textContent();
        console.log("Current Address text: " + currentAddress);
        await expect(this.currentAddressText).toContainText(currentAddr, { timeout: 5000 });
        const permanentAddress = await this.permanentAddressText.textContent();
        console.log("Permanent Address text: " + permanentAddress);
        await expect(this.permanentAddressText).toContainText(permAddr, { timeout: 5000 });

    }

}