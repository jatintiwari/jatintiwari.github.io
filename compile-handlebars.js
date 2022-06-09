const fs = require('fs');
const hb = require('handlebars');

const { templateName, jsFileName, cssFileName } = process.env;

console.log(`Compiling -- `, { templateName, jsFileName, cssFileName });

const template = fs.readFileSync(`templates/${templateName}.handlebars`, 'utf8');

// Compile said template
const compiled = hb.compile(template);
const html = compiled({
    js: fs.readFileSync(`dist/${jsFileName}.js`, 'utf8'),
    css: fs.readFileSync(`dist/${cssFileName}.css`, 'utf8'),
});

// Write HTML file
fs.writeFileSync(`${templateName}.html`, html);
