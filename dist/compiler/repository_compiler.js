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
exports.compileRepositories = compileRepositories;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const constants_1 = require("../constants");
function compileRepositories(models) {
    const templatePath = path.join(constants_1.TEMPLATE_DIR, "RepositoryTemplate");
    const template = fs.readFileSync(templatePath, "utf8");
    const repositoriesOutputDir = path.join(constants_1.APPLICATION_FILES_DIR, "repository");
    fs.mkdirSync(repositoriesOutputDir, { recursive: true });
    models.forEach((model) => {
        const className = capitalize(model.object);
        const repositoryContent = template
            .replace(/{{ApplicationDirectory}}/g, constants_1.APPLICATION_DIR)
            .replace(/{{ClassName}}/g, className);
        const outputPath = path.join(repositoriesOutputDir, `${className}Repository.java`);
        fs.writeFileSync(outputPath, repositoryContent, "utf8");
        console.log(`Generated repository: ${outputPath}`);
    });
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
//# sourceMappingURL=repository_compiler.js.map