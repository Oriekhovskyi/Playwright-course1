import * as dotenv from "dotenv"
dotenv.config()
import { test } from "@playwright/test"
import { MyAccontPage } from "./../page-objects/MyAccontPage.js"
import { getLoginToken } from "./../api-calls/getLoginToken.js"
import { adminDetails } from "../data/userDetails.js" 

test("My Account using cookie injection and mocking request", async ({ page }) => {
    // Make a request to get login token
const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)

await page.route("**/api/user**", async (route, request) => {
    await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({message:"PlayWright Error From Mocking"}),
    })
})

const myAccount = new MyAccontPage(page)
await myAccount.visit()
await page.evaluate(([loginTokenInsideBrowserCode]) => {
document.cookie = "token=" + loginTokenInsideBrowserCode
}, [loginToken])
await myAccount.visit()
await myAccount.waitForPageHeading()
await myAccount.waitForErrorMessage()
})
