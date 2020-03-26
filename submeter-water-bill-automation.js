const puppeteer = require('puppeteer');

(async () => {

	const browser = await puppeteer.launch({headless:false, defaultViewport: null});
	const page = await browser.newPage();

	await page.goto('https://portal.submeter.com/login.php')

	// Selecting radio button option for Email Sign in
	await page.click('input[value="2"]');

	await page.waitFor('input[name=dstEmail]');

	// input username / email address
	await page.type('input[name=dstEmail]', '___________', {delay: 20});

	// input password
	await page.type('input[type=password]', '___________');

	// Log in and navigate to Account Home Page
	await Promise.all([
      page.click("input[type=submit]"),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
	]);

	// Downloads PDF file of bill
	await page.click('a[href="https://portal.submeter.com/tenant/_nes-mybill.php"]');

})();

