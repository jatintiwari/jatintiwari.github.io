'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');

// const css = fs.readFileSync('./thoughts/dist/css/thoughts.css').toString().trim();
// const js = fs.readFileSync('./thoughts/dist/js/thoughts.js').toString();
const template = fs.readFileSync('./thoughts/template.html').toString();

const htmlFolderPath = './thoughts/pages';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:8080');
    const routes = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a.route')).map((node) => node.href);
    });

    await routes.reduce(async (acc = Promise.resolve(), route) => {
        await acc;
        try {
            await page.goto(route);
            await new Promise((r) => setTimeout(r, 5000));
            let body = await page.evaluate(() => {
                return document.body.innerHTML;
            });
            let compiledTemplate = template.replace('htmlContent', body);
            // compiledTemplate = compiledTemplate.replace('cssContent', css);
            // compiledTemplate = compiledTemplate.replace('jsContent', js);
            let title = await page.title();
            fs.writeFileSync(`${htmlFolderPath}/${title.replace(/\t/g, '_')}.html`, compiledTemplate);
        } catch (error) {
            console.error(error.message);
        }
        return new Promise((r) => setTimeout(r, 100));
    }, Promise.resolve());

    await browser.close();
})();
