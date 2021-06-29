exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions

    if (page.path.match(/^\/create-lolly/)) {
        page.matchPath = "/create-lolly/*"

        createPage(page)
    }
}
