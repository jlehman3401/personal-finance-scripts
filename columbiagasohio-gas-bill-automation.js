const puppeteer = require('puppeteer');

const username = process.argv[2];
const password = process.argv[3];

(async () => {

	const browser = await puppeteer.launch({headless:false, defaultViewport: null});

	const page = await browser.newPage();


	await Promise.all([
      page.goto('https://www.columbiagasohio.com'),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' })
	]);

	// Log in with email
	const usernameElement = 'input#username'; 

	await page.waitFor(usernameElement);
	await page.type(usernameElement, username);

	// Password
	await page.type('input#password', password);

	await Promise.all([
		page.click('input[type="submit"]'),
		page.waitForNavigation({ waitUntil: 'domcontentloaded' })]);

	await page.waitFor(8000);

	await Promise.all([
		page.click('tr.row-account.row-193446230030003'),
		page.waitForNavigation({ waitUntil: 'domcontentloaded' })]);
	console.log("Account Selected")

	// View Current Bill and Download
	await page.goto('https://myaccount.columbiagasohio.com/bills/latest');

	await page.waitFor(8000);

	// View more Usage Details
	await Promise.all([
		page.goto('https://myaccount.columbiagasohio.com/usage'),
		page.waitForNavigation({ waitUntil: 'domcontentloaded' })]);

	// Download Usage
	await page.click('[data-src="/UsageHistoryCurrentCsv"]');

})();

