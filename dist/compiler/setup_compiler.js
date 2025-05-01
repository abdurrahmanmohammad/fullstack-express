"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSetup = compileSetup;
const constants_1 = require("../constants");
const application_properties_compiler_1 = require("./setup_compiler/application_properties_compiler");
const main_application_compiler_1 = require("./setup_compiler/main_application_compiler");
const pom_compiler_1 = require("./setup_compiler/pom_compiler");
const static_files_compiler_1 = require("./setup_compiler/static_files_compiler");
const test_files_compiler_1 = require("./setup_compiler/test_files_compiler");
function compileSetup(setupConfig) {
    (0, constants_1.setApplicationName)(setupConfig.app_name);
    (0, application_properties_compiler_1.compileApplicationProperties)(setupConfig);
    (0, main_application_compiler_1.compileMainApplication)(setupConfig);
    (0, pom_compiler_1.compilePom)(setupConfig);
    (0, static_files_compiler_1.copyMavenWrapper)();
    (0, static_files_compiler_1.copyStaticFiles)();
    (0, test_files_compiler_1.compileTestFiles)(setupConfig);
}
//# sourceMappingURL=setup_compiler.js.map