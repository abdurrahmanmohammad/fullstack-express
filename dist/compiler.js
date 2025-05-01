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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const constants_1 = require("./constants");
const model_compiler_1 = require("./compiler/model_compiler");
const setup_compiler_1 = require("./compiler/setup_compiler");
const repository_compiler_1 = require("./compiler/repository_compiler");
const cleanup_compiler_1 = require("./cleanup_compiler");
const service_compiler_1 = require("./compiler/service_compiler");
const controller_compiler_1 = require("./compiler/controller_compiler");
(0, constants_1.initializePaths)(path.join(__dirname, ".."));
(0, cleanup_compiler_1.cleanup)();
const inputData = JSON.parse(fs.readFileSync(constants_1.INPUT_JSON_PATH, "utf8"));
const setupObject = inputData.find((obj) => obj.object === "Setup");
const modelObjects = inputData.filter((obj) => obj.object !== "Setup");
(0, setup_compiler_1.compileSetup)(setupObject);
(0, model_compiler_1.compileModels)(modelObjects);
(0, repository_compiler_1.compileRepositories)(modelObjects);
(0, service_compiler_1.compileService)(modelObjects);
(0, controller_compiler_1.compileController)(modelObjects);
//# sourceMappingURL=compiler.js.map