// REQUIREMENTS
const path = require('path');
const upath = require('upath');
const glob = require('glob');

// CODE
/**
 * Generate object of entries for the webpack config (js and scss)
 * @param {string} type
 * @param {string} entryPath
 * @return {object}
 */
function generateEntriesList(type, entryPath) {
    const entries = {};
    const entriesArray = glob.sync(`${entryPath}/**/[!__]*.${type}`);
    if (entriesArray.length !== 0) {
        entriesArray.forEach((entry) => {
            const pathObj = path.parse(entry);
            const normalizedPath = pathObj.dir
                .replace(`${entryPath}`, '')
                .replace(/^\//, '')
                .replace(/\/$/, '')
                .split('/');
            const normalizedNameArray = [];
            if (type === 'js') {
                normalizedNameArray.push('entry');
            }
            if (normalizedPath.length) {
                normalizedPath.forEach((pathSegment) => {
                    normalizedNameArray.push(pathSegment);
                });
            }
            normalizedNameArray.push(pathObj.name);
            entries[normalizedNameArray.filter(Boolean).join('--')] = entry;
        });
    } else {
        throw new Error(`No ${type} entries found under '${entryPath}'`);
    }
    return entries;
}

/**
 * Create the vendor name of a given module
 * @param {object} module
 * @return {string}
 */
function createVendorName(module) {
    const modulePathSegments = upath
        .normalizeSafe(module.identifier())
        .match(/(?:\/node_modules\/)(?:(@)*([\w-.]+)[/]([\w-.]+)[^/])/);
    const isNamespace = modulePathSegments[1];
    const firstSegment = modulePathSegments[2];
    const secondSegment = modulePathSegments[3];

    let name = (isNamespace === undefined)
        ? firstSegment
        : `${firstSegment}-${secondSegment}`;
    name = name.replace('.', '-');

    return `vendor--${name}`;
}

module.exports = {
    generateEntriesList,
    createVendorName,
};
