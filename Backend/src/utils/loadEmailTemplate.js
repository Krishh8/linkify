const fs = require("fs");
const path = require("path");

const loadEmailTemplate = (templateName, data = {}) => {
    try {
        const templatePath = path.join(__dirname, "..", "htmlTemplates", `${templateName}.html`);
        let html = fs.readFileSync(templatePath, "utf8");

        // Replace all placeholders like ${key} with values from data object
        Object.keys(data).forEach((key) => {
            const placeholder = new RegExp(`\\$\\{${key}\\}`, "g");
            html = html.replace(placeholder, data[key]);
        });

        return html;
    } catch (error) {
        console.error(`Error loading email template ${templateName}:`, error);
        throw new Error(`Failed to load email template: ${templateName}`);
    }
};

module.exports = loadEmailTemplate;

