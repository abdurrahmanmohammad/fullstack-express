"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_FILES_DIR = exports.RESOURCES_FILES_DIR = exports.APPLICATION_FILES_DIR = exports.APPLICATION_DIR = exports.APPLICATION_NAME = exports.OUTPUT_DIR = exports.TEMPLATE_DIR = exports.INPUT_JSON_PATH = exports.ROOT_DIR = void 0;
exports.initializePaths = initializePaths;
exports.setApplicationName = setApplicationName;
function initializePaths(baseDir) {
    exports.ROOT_DIR = baseDir;
    exports.INPUT_JSON_PATH = `${exports.ROOT_DIR}/input.json`;
    exports.TEMPLATE_DIR = `${exports.ROOT_DIR}/javaclass`;
    exports.OUTPUT_DIR = `${exports.ROOT_DIR}/output`;
    exports.RESOURCES_FILES_DIR = `${exports.OUTPUT_DIR}/src/main/resources`;
}
function setApplicationName(appName) {
    exports.APPLICATION_NAME = appName;
    exports.APPLICATION_DIR = `com.example.${exports.APPLICATION_NAME.toLowerCase()}`;
    exports.APPLICATION_FILES_DIR = `${exports.OUTPUT_DIR}/src/main/java/${exports.APPLICATION_DIR.replace(/\./g, '/')}`;
    exports.TEST_FILES_DIR = `${exports.OUTPUT_DIR}/src/test/java/${exports.APPLICATION_DIR.replace(/\./g, '/')}`;
}
//# sourceMappingURL=constants.js.map