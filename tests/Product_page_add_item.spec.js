import { test, expect } from "@playwright/test"

test.skip("Product Page Add To Basket",async ({page}) => {
    await page.goto("/")


    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basketCount = page.locator('[data-qa="header-basket-count"]')

    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText("Add to Basket")
    await expect(basketCount).toHaveText("0")

    await addToBasketButton.click()

    await expect(addToBasketButton).toHaveText("Remove from Basket")
    await expect(basketCount).toHaveText("1")

    const checkoutLick = page.getByRole('link', { name: 'Checkout' })
    await checkoutLick.waitFor()
    await checkoutLick.click() 
    await page.waitForURL("/basket")
})

