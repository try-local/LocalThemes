const path = require('path');
const fs = require('fs');

// Path to the themes.json file
const themesPath = path.join(__dirname, 'themes.json');

// Function to get all available themes
function getAllThemes() {
    const themes = JSON.parse(fs.readFileSync(themesPath, 'utf-8'));
    return themes;
}

module.exports = {
    getAllThemes
};
