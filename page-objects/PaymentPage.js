import { Expect } from "@playwright/test" 

import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page){
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput =page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.activateDiscountText = page.locator('[data-qa="discount-active-message"]')
        this.totalDiscountValue = page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner")
        this.creditCardNumberInput = page.getByPlaceholder("Credit card number")
        this.creditCardValidUntilInput = page.getByPlaceholder("Valid until")
        this.creditCardCvcInput = page.getByPlaceholder("Credit card CVC")
        this.payButton = page.locator('[data-qa="pay-button"]')
    }


    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
    
        // Option 1 for loggy inputs: using .fill() with await expect()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        //Optioan 2 for loggy inputs: slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(code)
        // await this.page.pause()

        expect(await this.totalDiscountValue.isVisible()).toBe(false)
        expect(await this.activateDiscountText.isVisible()).toBe(false)
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        // check that it displays "discount" activated"
        await this.activateDiscountText.waitFor()
        // check that there is now a discounted price total showing
        await this.totalDiscountValue.waitFor()
        const totalDiscountValueText = await this.totalDiscountValue.innerText() //"345$"
        const totalDiscountValueOnlyStringNumber = totalDiscountValueText.replace("$", "")
        const totalDiscountValueNumber = parseInt (totalDiscountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText() //"672$"
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt (totalValueOnlyStringNumber, 10)
        // chck that the discount price total is smaller than the regular
        expect (totalDiscountValueNumber).toBeLessThan(totalValueNumber)
    }
    fillPaymentDetails = async (PageaymentDetails) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(PageaymentDetails.owner)
        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(PageaymentDetails.number)
        await this.creditCardValidUntilInput.waitFor()
        await this.creditCardValidUntilInput.fill(PageaymentDetails.validUntil)
        await this.creditCardCvcInput.waitFor()
        await this.creditCardCvcInput.fill(PageaymentDetails.cvc)
    }
    completePayment = async () =>{
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
    }
}
