import { Locator, Page } from "@playwright/test";

export class demo_qa {
    

    readonly page : Page;
    readonly elementsLink : Locator;
    readonly radioBtnLink : Locator;
    readonly yesRadioBtn : Locator;
    readonly yesTxt : Locator;
    
    constructor (page : Page){
        this.page = page 
        this.elementsLink = page.locator("//h5[text()='Elements']")
        this.radioBtnLink = page.locator("//span[contains(text(),'Radio Button')]")
        this.yesRadioBtn = page.locator('#yesRadio')
        this.yesTxt = page.getByText("You have selected").nth(0);
    }

    async clickOnElementsLink(){
        await this.elementsLink.click();
    }
    async clickOnradioBtnLink(){
        await this.radioBtnLink.click();
    }
    async clickOnYesRadioBtn(){
        await this.yesRadioBtn.click({force:true});
        await this.yesTxt.textContent().then((text)=>{text?.includes("Yes")});
    }

}