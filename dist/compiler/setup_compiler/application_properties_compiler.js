"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileApplicationProperties = compileApplicationProperties;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const constants_1 = require("../../constants");
function compileApplicationProperties(setupConfig) {
    const appPropertiesTemplatePath = path.join(constants_1.TEMPLATE_DIR, 'application.properties');
    let appPropertiesTemplate = fs.readFileSync(appPropertiesTemplatePath, 'utf8');
    const replacements = {
        '{{PORT}}': setupConfig.port,
        '{{APP_NAME}}': setupConfig.app_name,
        '{{DB_URL}}': setupConfig.db_url,
        '{{DB_USERNAME}}': setupConfig.db_username,
        '{{DB_PASSWORD}}': setupConfig.db_password,
    };
    for (const [placeholder, value] of Object.entries(replacements)) {
        appPropertiesTemplate = appPropertiesTemplate.replace(placeholder, String(value));
    }
    const appPropertiesOutputPath = path.join(constants_1.RESOURCES_FILES_DIR, 'application.properties');
    fs.mkdirSync(constants_1.RESOURCES_FILES_DIR, { recursive: true });
    fs.mkdirSync(`${constants_1.RESOURCES_FILES_DIR}/static`, { recursive: true });
    fs.mkdirSync(`${constants_1.RESOURCES_FILES_DIR}/templates`, { recursive: true });
    fs.writeFileSync(appPropertiesOutputPath, appPropertiesTemplate, 'utf8');
    console.log(`Generated: ${appPropertiesOutputPath}`);
}
//# sourceMappingURL=application_properties_compiler.js.map