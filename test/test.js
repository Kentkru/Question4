const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');
var driver;

let container, prev, next, indicators, slide;

const options = new chrome.Options();
options.addArguments(
    'headless'
);

describe('Accrodion test', function() {
    this.timeout(100000);

    before(function(done) {
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        driver.get('http://localhost:8000')
            .then(() => {
                done();
            });
    });

    after(function() {
        driver.quit();
    })

    beforeEach(async function() {
        driver.navigate().refresh();
        item1 = await driver.findElement(By.id("1"));
        item2 = await driver.findElement(By.id("2"));
        item3 = await driver.findElement(By.id("3"));
        item4 = await driver.findElement(By.id("4"));
        item5 = await driver.findElement(By.id("5"));
      
    })


    // it('should test load the page', async function() {
    //     let page = await driver.getPageSource();
    //     driver.takeScreenshot().then(
    //         function(image, err) {
    //             require('fs').writeFile('initial-view.png', image, 'base64', function(err) {});
    //         }
    //     );
    // });

    it('Should show the 1st item expanded by default', async function() {
        let description = await item1.findElement(By.className("description"));
        let descDisplay = await description.getCssValue('display');
        expect(descDisplay).to.equal('block');
        driver.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFile('initial-view.png', image, 'base64', function(err) {});
            }
        );
    });

    it('Clicking on expand icon or title or anywhere in the title section should expand the item', async function() {
        let title = await item2.findElement(By.className("title"));
        let description2 = await item2.findElement(By.className("description"));
        title.click();
        let descDisplay2 = await description2.getCssValue('display');
        expect(descDisplay2).to.equal('block');

        let expandIcon = await item3.findElement(By.className("expand-icon"));
        let description3 = await item3.findElement(By.className("description"));
        expandIcon.click();
        let descDisplay3 = await description3.getCssValue('display');
        expect(descDisplay3).to.equal('block');

        let titleSec = await item4.findElement(By.className("title-section"));
        let description4 = await item4.findElement(By.className("description"));
        titleSec.click();
        let descDisplay4 = await description4.getCssValue('display');
        expect(descDisplay4).to.equal('block');

        descDisplay3 = await description3.getCssValue('display');
        expect(descDisplay3).to.equal('none');
    });

    it('when an item was already expanded should show the collapse icon in the right corner', async function() {
        let expandIcon = await item3.findElement(By.className("expand-icon"));
        let collapseIcon = await item3.findElement(By.className("collapse-icon"));
        let description3 = await item3.findElement(By.className("description"));
        expandIcon.click();
        let descDisplay3 = await description3.getCssValue('display');
        let expandIconDisplay = await expandIcon.getCssValue('display');
        let collapseIconDisplay = await collapseIcon.getCssValue('display');
        expect(descDisplay3).to.equal('block');
        expect(expandIconDisplay).to.equal('none');
        expect(collapseIconDisplay).to.equal('block');
    });

    it('when an item was already collapsed state should show the expand icon in the right corner', async function() {
        let expandIcon = await item3.findElement(By.className("expand-icon"));
        let collapseIcon = await item3.findElement(By.className("collapse-icon"));
        let description3 = await item3.findElement(By.className("description"));
        expandIcon.click();
        collapseIcon.click();
        let descDisplay3 = await description3.getCssValue('display');
        let expandIconDisplay = await expandIcon.getCssValue('display');
        let collapseIconDisplay = await collapseIcon.getCssValue('display');
        expect(descDisplay3).to.equal('none');
        expect(expandIconDisplay).to.equal('block');
        expect(collapseIconDisplay).to.equal('none');
    });

    it('Clicking on collpase icon or title or anywhere in the title section should collapse the item', async function() {
        let title = await item2.findElement(By.className("title"));
        let description2 = await item2.findElement(By.className("description"));
        let collapseIcon = await item2.findElement(By.className("collapse-icon"));
        title.click();
        let descDisplay2 = await description2.getCssValue('display');
        expect(descDisplay2).to.equal('block');

        collapseIcon.click();
        descDisplay2 = await description2.getCssValue('display');
        expect(descDisplay2).to.equal('none');
    });

    it('when an item was already expanded state and clicking same item should collapse the same item', async function() {
        let expandIcon = await item3.findElement(By.className("expand-icon"));
        let collapseIcon = await item3.findElement(By.className("collapse-icon"));
        let title = await item3.findElement(By.className("title"));
        let description3 = await item3.findElement(By.className("description"));
        expandIcon.click();
        let descDisplay3 = await description3.getCssValue('display');
        let expandIconDisplay = await expandIcon.getCssValue('display');
        expect(descDisplay3).to.equal('block');
        expect(expandIconDisplay).to.equal('none');

        title.click();
        descDisplay3 = await description3.getCssValue('display');
        expandIconDisplay = await expandIcon.getCssValue('display');
        let collapseIconDisplay = await collapseIcon.getCssValue('display');
        expect(descDisplay3).to.equal('none');
        expect(expandIconDisplay).to.equal('block');
        expect(collapseIconDisplay).to.equal('none');
    });


});