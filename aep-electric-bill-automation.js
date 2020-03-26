const puppeteer = require('puppeteer');

(async () => {

	const browser = await puppeteer.launch({headless:false, defaultViewport: null});
	const page = await browser.newPage();
	
	await Promise.all([
      page.goto('https://aepohio.com'),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
	]);

	await page.click('#globalLoginButton');

	// user name
	await page.waitFor('input[placeholder="User ID"]');
	await page.type('input[placeholder="User ID"]', '__________')

	// password
	await page.type('input[placeholder="Password"]', '__________')

	// Submit
	await Promise.all([
      page.click("input[type=submit]"),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
	]);

	// Select correct account
	await page.waitFor('select[data-field-type="dropdown"]');

	await page.select('select[data-field-type="dropdown"]', "1044298657");
	await page.waitFor(30000);

	// Navigate to View Bill
	await Promise.all([
      page.click('a[id="cphContentMain_ctl00_ctl07_LnkViewBill"]'),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
	]);

	await page.waitFor(30000);

	// Download PDF
	await page.click('a[id="download"]')

})();
