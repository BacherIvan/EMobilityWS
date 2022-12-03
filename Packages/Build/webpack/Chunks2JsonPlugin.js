/**
 * Chunks2JsonPlugin
 *
 * Plugin for building a dependency tree of all entries which will be written as JSON file.
 * Based on: https://www.npmjs.com/package/chunks-2-json-webpack-plugin
 */

/*
 *  Includes
 */

const fs = require('fs');
const path = require('path');
const upath = require('upath');

const pluginName = 'Chunks2JsonPlugin';

const defaultOptions = {
    outputDir: process.cwd(),
    filename: 'assets.json',
    removePath: '',
    prependPath: '',
};

class Chunks2JsonPlugin {
    constructor(options) {
        // overwrite default options
        this.options = { ...defaultOptions, ...options };
        this.result = {};
    }

    apply(compiler) {
        compiler.hooks.emit.tap(pluginName, (compilation) => {
            if (this.options.type === 'scripts') {
                // process entries
                compilation.entries.forEach((entry) => {
                    const id = upath
                        .normalize(entry.resource.replace(this.options.removePath, ''))
                        .replace(/^\//, '')
                        .replace(/.js/, '');
                    const alias = entry.reasons.map((reason) => reason.dependency.loc.name)[0];
                    if (this.result[id] === undefined) {
                        this.result[id] = {};
                    }
                    this.result[id].alias = alias;
                    this.result[id].file = `${alias}.js`;
                    this.result[id].dependencies = {};
                });

                // process dependencies
                compilation.chunks.forEach((chunk) => {
                    if (chunk.entryModule === undefined) {
                        Array.from(chunk.groupsIterable || []).forEach((group) => {
                            Object.keys(this.result).forEach((entryKey) => {
                                if (this.result[entryKey].alias === group.options.name) {
                                    if (this.result[entryKey].dependencies[chunk.name] === undefined) {
                                        this.result[entryKey].dependencies[chunk.name] = {};
                                    }
                                    this.result[entryKey].dependencies[chunk.name] = `${chunk.name}.js`;
                                }
                            });
                        });
                    }
                });
                // sort the keys
                this.result = Chunks2JsonPlugin.sortNested(this.result);
            } else if (this.options.type === 'styles') {
                // process entries
                compilation.entries.forEach((entry) => {
                    const id = upath
                        .normalize(entry.resource.replace(this.options.removePath, ''))
                        .replace(/^\//, '')
                        .replace(/.scss/, '');
                    const alias = entry.reasons.map((reason) => reason.dependency.loc.name)[0];

                    this.result[id] = `${alias}.css`;
                });
                // sort the keys
                this.result = Chunks2JsonPlugin.sortNested(this.result);
            }

            // save json as file
            this.saveJson();
        });
    }

    /**
     * Save the generated object to a JSON String file
     */
    saveJson() {
        // try to create outputDir folder if it is within project root
        if (Chunks2JsonPlugin.shouldFolderBeCreated(this.options.outputDir) === true) {
            let pathStep = process.cwd();
            // remove relative prefix
            const normalizedOutputPath = Chunks2JsonPlugin
                .normalizeOutputDir(this.options.outputDir);
            normalizedOutputPath.split('/').forEach((folder) => {
                pathStep = path.join(pathStep, folder);
                try {
                    fs.mkdirSync(pathStep);
                } catch (e) {
                    // we don't care if it already exists, just continue...
                }
            });
        }
        const file = path.resolve(this.options.outputDir, this.options.filename);
        try {
            fs.writeFileSync(file, JSON.stringify(this.result, null, 2), { flag: 'w' });
            console.log(`JSON successfully saved - ${file}`);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * We need to make sure, that we can actually create the folder.
     * We can do so, if the desired output is inside project root
     * @param {String} outputDir - path to output directory.
     */
    static shouldFolderBeCreated(outputDir) {
        // this returns absolute path
        // handle absolute path, that points to project
        const isAbsolutePathWithProjectRoot = outputDir.includes(process.cwd());
        // if output is inside the folder, we're all good
        const isPathWithinProjectRoot = !outputDir.startsWith('/');
        return isAbsolutePathWithProjectRoot
            || isPathWithinProjectRoot
            || false;
    }

    /**
     * To create output folder, we need to understand,
     * which folders to create. This function normalizes
     * relative and absolute path, to output we can then
     * work with - e.g.: folder1/folder2/folder3
     * @param {String} outputDir - path to outpurDirectory.
     */
    static normalizeOutputDir(outputDir) {
        const removedRelativePrefix = outputDir.replace(/^\.\//, '');
        return removedRelativePrefix.replace(process.cwd(), '');
    }

    /**
     * @param object
     * @returns {*}
     */
    static sortNested(object) {
        return Object
            .entries(object)
            .sort()
            .reduce((obj, [k, v]) => {
                if (v.dependencies !== undefined) {
                    v.dependencies = Object
                        .entries(v.dependencies)
                        .sort()
                        .reduce((nestedObj, [nk, nv]) => ({
                            ...nestedObj,
                            [nk]: nv,
                        }), {});
                }
                return {
                    ...obj,
                    [k]: v,
                };
            }, {});
    }
}

module.exports = Chunks2JsonPlugin;
