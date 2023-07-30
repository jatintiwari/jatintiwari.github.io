const fs = require('fs');

const markdownFolderPath = './thoughts/src/markdown';
const routesFilePath = './thoughts/src/routes.js';

const importTemplate = (fileName, title, date) => `{
    "path": "/${fileName.replace('.md', '')}",
    "name": "${title}",
    "date": "${date}",
    "component": () => import('./markdown/${fileName}'),
},`;

const fileNames = fs.readdirSync(markdownFolderPath);

const getFileMeta = (fileName) => {
    let date = '',
        title = '';
    const fileContent = fs.readFileSync(`${markdownFolderPath}/${fileName}`).toString();
    const titleIndexStart = fileContent.indexOf('<title>');
    const titleIndexEnd = fileContent.indexOf('</title>');
    const dateIndexStart = fileContent.indexOf('<date>');
    const dateIndexEnd = fileContent.indexOf('</date>');
    if (titleIndexEnd > -1 && titleIndexStart > -1) {
        title = fileContent.slice(titleIndexStart + 7, titleIndexEnd);
    }
    if (dateIndexStart > -1 && dateIndexEnd > -1) {
        date = fileContent.slice(dateIndexStart + 6, dateIndexEnd);
    }
    return { title, date };
};

const importsArray = fileNames
    .reduce((acc, fileName) => {
        const stat = fs.lstatSync(`${markdownFolderPath}/${fileName}`);
        if (stat.isFile()) {
            acc.push({ fileName, ...getFileMeta(fileName) });
        }
        return acc;
    }, [])
    .sort((a, b) => {
        const diff = new Date(a.date) - new Date(b.date);
        console.log(diff);
        if (diff > 0) {
            return -1;
        }
        return 1;
    })
    .map((file) => {
        return importTemplate(file.fileName, file.title, file.date)
    });
console.log({ importsArray });

fs.writeFileSync(routesFilePath, `export default [${importsArray.join('')}]`);
