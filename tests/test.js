let weatherSearch = (browser, search, result) => {
    browser.setValue('input', search)
        .click('button')
        .waitForElementNotPresent('input', 5000)
        .waitForElementPresent('.current-weather__location', 5000)
        .assert.containsText('.current-weather__location', result)
}

module.exports = {
    beforeEach : browser => {
        browser.url('https://devmountain-qa.github.io/weatherman/build/index.html')
            .waitForElementPresent('body', 5000, 'Checking that the page loaded.')
    },
    after : browser => {
        browser.end()
    },
    // 'My first test' : browser => {
    //     browser.verify.containsText('h1[class="app__title"]', 'WEATHERMAN', 'Checking that the page title is correct.')
    // },
    'Search San Francisco' : browser => {
        weatherSearch(browser, 'San Francisco', 'San Francisco')    
    }, 
    'Istanbul Smoke Test' : browser => {
        browser.setValue('input', 'Istanbul')
            .assert.value('input', 'Istanbul')
            .pause(20000)
            .click('button')
            .waitForElementNotPresent('input', 5000)
            .waitForElementPresent('.current-weather__location', 5000)
            .assert.containsText('.current-weather__location', 'Istanbul', 'Checking that the city name in the results is correct.')
            .click('.current-weather__search-again')
            .waitForElementNotPresent('.current-weather__location', 5000)
            .waitForElementPresent('input', 5000)
            .clearValue('input')
            .click('button')
            .waitForElementNotPresent('input', 5000)
            .waitForElementPresent('.error-message__message', 5000)
            .assert.containsText('.error-message__message', 'There was a problem fetching the weather!', 'Checking that the error message is displayed.')
            .click('button')
            .waitForElementNotPresent('.error-message__message', 5000)
            .waitForElementPresent('input', 5000)
    }
}