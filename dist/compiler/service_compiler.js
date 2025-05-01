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
exports.compileService = compileService;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const constants_1 = require("../constants");
function capitalize(str) {
    if (typeof str !== "string") {
        throw new Error(`Expected a string, but received: ${typeof str}`);
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function generateFieldUpdateStatements(fields, modelName) {
    return Object.keys(fields)
        .map((field) => {
        const capitalizedField = capitalize(field);
        return `${modelName}.set${capitalizedField}(
        updated${capitalize(modelName)}.get${capitalizedField}());`;
    })
        .join("\n");
}
function compileService(modelObjects) {
    const serviceTemplatePath = path.join(constants_1.TEMPLATE_DIR, "ServiceTemplate");
    let serviceTemplate = fs.readFileSync(serviceTemplatePath, "utf8");
    const servicesOutputDir = path.join(constants_1.APPLICATION_FILES_DIR, "service");
    fs.mkdirSync(servicesOutputDir, { recursive: true });
    modelObjects.forEach((obj) => {
        const className = capitalize(obj.object);
        const lowercaseModelName = obj.object.toLowerCase();
        const fields = obj.fields;
        const fieldUpdateStatements = generateFieldUpdateStatements(fields, lowercaseModelName);
        let serviceClassContent = serviceTemplate
            .replace(/{{ModelName}}/g, className)
            .replace(/{{modelName}}/g, lowercaseModelName)
            .replace(/{{ApplicationDirectory}}/g, constants_1.APPLICATION_DIR)
            .replace(/{{FieldUpdateStatements}}/g, fieldUpdateStatements);
        const serviceOutputPath = path.join(servicesOutputDir, `${className}Service.java`);
        fs.writeFileSync(serviceOutputPath, serviceClassContent, "utf8");
        console.log(`Generated service for ${className}: ${serviceOutputPath}`);
    });
}
//# sourceMappingURL=service_compiler.js.map