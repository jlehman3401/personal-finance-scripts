const puppeteer = require('puppeteer');

var username = process.argv[2]
var password = process.argv[3]
var acctNumber = process.argv[4]


(async () => {

	const browser = await puppeteer.launch({headless:false, defaultViewport: null});
	const page = await browser.newPage();
	
	await Promise.all([
      page.goto('https://www.aepohio.com'),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' })
	]);

	await page.click('#globalLoginButton');

	// user name
	await page.waitFor('input[placeholder="User ID"]');
	await page.type('input[placeholder="User ID"]', username);

	// password
	await page.type('input[placeholder="Password"]', password);

	// Submit
	const submitButton = 'input[type=submit]';
	 
	await Promise.all([
		page.click(submitButton),
		page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
	]);

	// Select correct account
	const acctElement = 'select[data-field-type="dropdown"]';

	await page.waitFor(acctElement);
	await page.select(acctElement, acctNumber);
	await page.waitFor(6000);

	// Navigate to View Bill
	const billElement = 'a[id="cphContentMain_ctl00_ctl07_LnkViewBill"]'; 

	await Promise.all([
      page.click(billElement),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
	]);

	await page.waitFor(30000);

	// Download PDF
	await page.click('a[id="download"]')

})();
