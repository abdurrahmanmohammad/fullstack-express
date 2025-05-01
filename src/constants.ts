// src/constants.ts
export let ROOT_DIR: string;
export let INPUT_JSON_PATH: string;
export let TEMPLATE_DIR: string;
export let OUTPUT_DIR: string;
export let APPLICATION_NAME: string;
export let APPLICATION_DIR: string;
export let APPLICATION_FILES_DIR: string;
export let RESOURCES_FILES_DIR: string;
export let TEST_FILES_DIR: string;

export function initializePaths(baseDir: string) {
  ROOT_DIR = baseDir;
  INPUT_JSON_PATH = `${ROOT_DIR}/input.json`;
  TEMPLATE_DIR = `${ROOT_DIR}/javaclass`;
  OUTPUT_DIR = `${ROOT_DIR}/output`;
  RESOURCES_FILES_DIR = `${OUTPUT_DIR}/src/main/resources`;
}

export function setApplicationName(appName: string) {
  APPLICATION_NAME = appName;
  APPLICATION_DIR = `com.example.${APPLICATION_NAME.toLowerCase()}`;
  APPLICATION_FILES_DIR = `${OUTPUT_DIR}/src/main/java/${APPLICATION_DIR.replace(/\./g, '/')}`;
  TEST_FILES_DIR = `${OUTPUT_DIR}/src/test/java/${APPLICATION_DIR.replace(/\./g, '/')}`;
}
