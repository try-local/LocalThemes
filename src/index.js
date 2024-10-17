const path = require('path');
const fs = require('fs');

// Path to the themes.json file
const themesPath = path.join(__dirname, 'themes.json');

// Caching themes to avoid re-reading the file on every request
let cachedThemes = null;

// Function to get all available themes
function getAllThemes() {
    // Return cached themes if available
    if (cachedThemes) {
        return cachedThemes;
    }

    try {
        // Read the themes.json file synchronously
        const themes = JSON.parse(fs.readFileSync(themesPath, 'utf-8'));
        
        // Cache the themes
        cachedThemes = themes;

        return themes;
    } catch (error) {
        console.error('Error reading themes.json:', error);
        return [];
    }
}

// Optionally, an async version to avoid blocking the thread
async function getAllThemesAsync() {
    if (cachedThemes) {
        return cachedThemes;
    }

    return new Promise((resolve, reject) => {
        fs.readFile(themesPath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading themes.json:', err);
                return reject([]);
            }

            try {
                const themes = JSON.parse(data);
                cachedThemes = themes;
                resolve(themes);
            } catch (parseError) {
                console.error('Error parsing themes.json:', parseError);
                reject([]);
            }
        });
    });
}

module.exports = {
    getAllThemes,
    getAllThemesAsync
};
