import { expect } from "@playwright/test" 
import { Navigation } from "./Navigation.js"
import { isDesktopVieport } from "../utilis/isDesctopViewport.js" 

export class ProductsPage {
   constructor(page) {
       this.page = page
       this.addButtons = page.locator('[data-qa="product-button"]')
       this.basketCounter = page.locator('[data-qa="header-basket-count"]')
       this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
       this.productTitle = page.locator('[data-qa="product-title"]')
   }

   visit = async () => {
       await this.page.goto("/")
   }

   addProductToBasket = async (index) => {
      const specificAddButton = this.addButtons.nth(index)
       await specificAddButton.waitFor()
       await expect(specificAddButton).toHaveText("Add to Basket")
       const navigation = new Navigation(this.page)
       // only desktop vieport
        let basketCountBeforeAdding = 0
       if (isDesktopVieport(this.page)) {
 const basketCountBeforeAdding = await navigation.getBasketCount()
       }
       await specificAddButton.click()
       await expect(specificAddButton).toHaveText("Remove from Basket")
       // only desktop viewport
       if (isDesktopVieport(this.page)) {
        const basketCountAfterAdding = await navigation.getBasketCount()
       expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
       }
       
   }
   
   sortByCheapest = async () => {
     await this.sortDropdown.waitFor()
     // get order of product
     await this.productTitle.first().waitFor()
     const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
     await this.sortDropdown.selectOption("price-asc")
     const productTitleAfterSorting = await this.productTitle.allInnerTexts()
     expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)
     // get order of product
     // expect that this list are defferent
     //await this.page.pause()

   }
}