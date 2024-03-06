export const isDesktopVieport = (page) => {
    const size = page.viewportSize()
    return size.width >= 600
    //return true of false
    
    }