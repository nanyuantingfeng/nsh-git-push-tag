const fs = require("fs")
const path = require('path');

module.exports = async function getFileVersion(fileName) {
    try {
        const name = fileName ? fileName : 'build.gradle'
        const p = path.join(process.cwd(), name);
        const data = await fs.readFileSync(p, "utf-8")
        const array = data.split("\n")
        for (let index = 0; index < array.length; index++) {
            const value = array[index]
            if (value.startsWith('version')) {
                const versions = value.split("=")
                let version = versions.length >= 1 ? versions[1] : 0
                version = version.replace(/"/g, "").replace(/\s+/g, "")
                return version.split('.').length <= 2 ? version + '.0' : version
            }
        }
    } catch (e) {
        console.error(e);
    }
};
