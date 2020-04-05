const puppeteer = require('puppeteer');

const username = process.argv[2];
const password = process.argv[3];

(async () => {

	const browser = await puppeteer.launch({headless:false, defaultViewport: null});
	const page = await browser.newPage();

	await page.goto('https://portal.submeter.com/login.php')

	// Selecting radio button option for Email Sign in
	await page.click('input[value="2"]');

	// input username / email address
	const emailElement = 'input[name=dstEmail]';

	await page.waitFor(emailElement);
	await page.type(emailElement, username, {delay: 20});

	// input password
	await page.type('input[type=password]', password);

	// Log in and navigate to Account Home Page
	await Promise.all([
      page.click("input[type=submit]"),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
	]);

	// Downloads PDF file of bill
	const billElement = 'a[href="https://portal.submeter.com/tenant/_nes-mybill.php"]';
	await page.click(billElement);

})();

