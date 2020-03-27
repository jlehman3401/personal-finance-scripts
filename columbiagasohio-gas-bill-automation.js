const puppeteer = require('puppeteer');

(async () => {

	const browser = await puppeteer.launch({headless:false, defaultViewport: null});

	const page = await browser.newPage();


	await Promise.all([
      page.goto('https://www.columbiagasohio.com/'),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' })
	]);

	// Log in with email
	await page.waitFor('input#username');
	await page.type('input#username', '_____________');

	// Password
	await page.type('input#password', '_____________');

	await Promise.all([
		page.click('input[type="submit"]'),
		page.waitForNavigation({ waitUntil: 'domcontentloaded' })]);

	await page.waitFor(30000);

	await Promise.all([
		page.click('tr.row-account.row-193446230030003'),
		page.waitForNavigation({ waitUntil: 'domcontentloaded' })]);
	console.log("Account Selected")

	// View Current Bill and Download
	await page.goto('https://myaccount.columbiagasohio.com/bills/latest');

	await page.waitFor(30000);

	// View more Usage Details
	await Promise.all([
		page.goto('https://myaccount.columbiagasohio.com/usage'),
		page.waitForNavigation({ waitUntil: 'domcontentloaded' })]);

	// Download Usage
	await page.click('[data-src="/UsageHistoryCurrentCsv"]');

})();

