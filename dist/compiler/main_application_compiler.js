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
exports.compileMainApplication = compileMainApplication;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const constants_1 = require("../constants");
function compileMainApplication(setupConfig) {
    const demoAppTemplatePath = path.join(constants_1.TEMPLATE_DIR, 'TemplateApplication');
    let demoAppTemplate = fs.readFileSync(demoAppTemplatePath, 'utf8');
    demoAppTemplate = demoAppTemplate.replace(/{{AppName}}/g, setupConfig.app_name.charAt(0).toUpperCase() + setupConfig.app_name.slice(1));
    const demoAppOutputPath = path.join(constants_1.OUTPUT_DIR, 'DemoApplication.java');
    fs.writeFileSync(demoAppOutputPath, demoAppTemplate, 'utf8');
    console.log(`Generated: ${demoAppOutputPath}`);
}
//# sourceMappingURL=main_application_compiler.js.map