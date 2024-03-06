import { isDesktopVieport } from "../utilis/isDesctopViewport.js" 

export class Navigation {
   constructor(page) {
       this.page = page

       this.basketCounter = page.locator('[data-qa="header-basket-count"]')
       this.checkoutLick = page.getByRole('link', { name: 'Checkout' })
       this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
   }

   getBasketCount = async () => {
    await this.basketCounter.waitFor()
    const text = await this.basketCounter.innerText()
    return parseInt(text, 10)
 }

 //true if desctop
 //folse if mobile -> reverse false -> !false === true

   goToCheckout = async () => {
    // if mobile viewport, first opne the burger menu
    if (!isDesktopVieport(this.page)) {
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()
    }

    await this.checkoutLick.waitFor()
    await this.checkoutLick.click() 
    await this.page.waitForURL("/basket")


}}