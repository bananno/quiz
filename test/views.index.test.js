const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

// puppeteer options
const opts = {
  headless: false,
  slowMo: 100,
  timeout: 10000
};

// expose variables
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after (function () {
  browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});

describe('Index view', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:4300');
  });

  after (async function () {
    await page.close();
  })

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Login | Quiz');
  });

  it('should have a heading', async function () {
    const HEADING_SELECTOR = 'h1';
    let heading;

    await page.waitFor(HEADING_SELECTOR);
    heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText);

    expect(heading).to.eql('Quiz');
  });

  it('should have a login section', async function () {
    await page.waitFor('#login-form');

    expect(await page.$$('#login-form')).to.have.lengthOf(1);
  });

  it('should have a signup section', async function () {
    await page.waitFor('#signup-form');

    expect(await page.$$('#signup-form')).to.have.lengthOf(1);
  });
});
