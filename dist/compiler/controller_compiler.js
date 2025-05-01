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
exports.compileController = compileController;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const constants_1 = require("../constants");
function capitalize(str) {
    if (typeof str !== "string") {
        throw new Error(`Expected a string, but received: ${typeof str}`);
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function pluralize(modelName) {
    return modelName.endsWith("s") ? modelName : `${modelName}s`;
}
function compileController(modelObjects) {
    const controllerTemplatePath = path.join(constants_1.TEMPLATE_DIR, "ControllerTemplate");
    let controllerTemplate = fs.readFileSync(controllerTemplatePath, "utf8");
    const controllersOutputDir = path.join(constants_1.APPLICATION_FILES_DIR, "controller");
    fs.mkdirSync(controllersOutputDir, { recursive: true });
    modelObjects.forEach((obj) => {
        const className = capitalize(obj.object);
        const lowercaseModelName = obj.object.toLowerCase();
        const modelNamePlural = pluralize(lowercaseModelName);
        let controllerClassContent = controllerTemplate
            .replace(/{{ModelName}}/g, className)
            .replace(/{{modelName}}/g, lowercaseModelName)
            .replace(/{{modelNamePlural}}/g, modelNamePlural)
            .replace(/{{ApplicationDirectory}}/g, constants_1.APPLICATION_DIR);
        const controllerOutputPath = path.join(controllersOutputDir, `${className}Controller.java`);
        fs.writeFileSync(controllerOutputPath, controllerClassContent, "utf8");
        console.log(`Generated controller for ${className}: ${controllerOutputPath}`);
    });
}
//# sourceMappingURL=controller_compiler.js.map