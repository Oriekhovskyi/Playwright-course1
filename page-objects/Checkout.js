import { expect } from "@playwright/test"

export class Checkout{
 constructor(page) {
    this.page = page

    this.basketCard = page.locator('[data-qa="basket-card"]')
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
    this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
    this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    
}

  removeCheapestProduct = async () => {
    await this.basketCard.first().waitFor()
    const itemsBeforeRemoval = await this.basketCard.count()

    await this.basketItemPrice.first().waitFor()
    const allPriceTexts = await this.basketItemPrice.allInnerTexts()
    // [ '499$', '599$', '320$' ]
    const justNumbers = allPriceTexts.map((element) =>{
      const withoutDollarSign = element.replace("$", "") // '499$' -> ''499'
      return parseInt(withoutDollarSign, 10)
      console.warn({element})
    })
    //console.warn({allPriceTexts})
    //console.warn({justNumber})
    const smallestPrice = Math.min(...justNumbers)
    const smallestPriceIdx = justNumbers.indexOf(smallestPrice)
    const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIdx)
    await specificRemoveButton.waitFor()
    await specificRemoveButton.click()
    await expect(this.basketCard).toHaveCount(itemsBeforeRemoval - 1)
}

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor()
    await this.continueToCheckoutButton.click()
    await this.page.waitForURL(/\/login/, {timeout: 3000})
  }

  
}