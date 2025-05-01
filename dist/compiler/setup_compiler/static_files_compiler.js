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
exports.copyStaticFiles = copyStaticFiles;
exports.copyMavenWrapper = copyMavenWrapper;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const constants_1 = require("../../constants");
function copyStaticFiles() {
    const staticFiles = [
        '.gitattributes',
        '.gitignore',
        'HELP.md'
    ];
    staticFiles.forEach((file) => {
        const sourcePath = path.join(constants_1.TEMPLATE_DIR, file);
        const destPath = path.join(constants_1.OUTPUT_DIR, file);
        try {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied: ${file} to ${destPath}`);
        }
        catch (error) {
            console.error(`Error copying ${file}:`, error);
        }
    });
}
function copyMavenWrapper() {
    const mvnwPath = path.join(constants_1.TEMPLATE_DIR, 'mvnw');
    const mvnwCmdPath = path.join(constants_1.TEMPLATE_DIR, 'mvnw.cmd');
    const mvnwOutputPath = path.join(constants_1.OUTPUT_DIR, 'mvnw');
    const mvnwCmdOutputPath = path.join(constants_1.OUTPUT_DIR, 'mvnw.cmd');
    try {
        fs.copyFileSync(mvnwPath, mvnwOutputPath);
        fs.copyFileSync(mvnwCmdPath, mvnwCmdOutputPath);
        console.log(`Copied: mvnw to ${mvnwOutputPath}`);
        console.log(`Copied: mvnw.cmd to ${mvnwCmdOutputPath}`);
    }
    catch (error) {
        console.error('Error copying mvnw and mvnw.cmd:', error);
    }
    const mavenWrapperDirPath = path.join(constants_1.TEMPLATE_DIR, '.mvn', 'wrapper');
    const mavenWrapperDestDirPath = path.join(constants_1.OUTPUT_DIR, '.mvn', 'wrapper');
    try {
        fs.mkdirSync(path.join(constants_1.OUTPUT_DIR, '.mvn', 'wrapper'), { recursive: true });
        const mavenWrapperFilePath = path.join(mavenWrapperDirPath, 'maven-wrapper.properties');
        const mavenWrapperDestFilePath = path.join(mavenWrapperDestDirPath, 'maven-wrapper.properties');
        fs.copyFileSync(mavenWrapperFilePath, mavenWrapperDestFilePath);
        console.log(`Copied: maven-wrapper.properties to ${mavenWrapperDestFilePath}`);
    }
    catch (error) {
        console.error('Error copying Maven wrapper files:', error);
    }
}
//# sourceMappingURL=static_files_compiler.js.map