// src/compiler/static_files_compiler.ts
import * as fs from 'fs';
import * as path from 'path';
import { TEMPLATE_DIR, OUTPUT_DIR } from '../../constants';

export function copyStaticFiles() {
  const staticFiles = [
    '.gitattributes',
    '.gitignore',
    'HELP.md'
  ];

  staticFiles.forEach((file) => {
    const sourcePath = path.join(TEMPLATE_DIR, file);
    const destPath = path.join(OUTPUT_DIR, file);

    try {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${file} to ${destPath}`);
    } catch (error) {
      console.error(`Error copying ${file}:`, error);
    }
  });
}

export function copyMavenWrapper() {
  const mvnwPath = path.join(TEMPLATE_DIR, 'mvnw');
  const mvnwCmdPath = path.join(TEMPLATE_DIR, 'mvnw.cmd');
  const mvnwOutputPath = path.join(OUTPUT_DIR, 'mvnw');
  const mvnwCmdOutputPath = path.join(OUTPUT_DIR, 'mvnw.cmd');

  // Copy the mvnw and mvnw.cmd files
  try {
    fs.copyFileSync(mvnwPath, mvnwOutputPath);
    fs.copyFileSync(mvnwCmdPath, mvnwCmdOutputPath);
    console.log(`Copied: mvnw to ${mvnwOutputPath}`);
    console.log(`Copied: mvnw.cmd to ${mvnwCmdOutputPath}`);
  } catch (error) {
    console.error('Error copying mvnw and mvnw.cmd:', error);
  }

  // Copy the .mvn folder and its content
  const mavenWrapperDirPath = path.join(TEMPLATE_DIR, '.mvn', 'wrapper');
  const mavenWrapperDestDirPath = path.join(OUTPUT_DIR, '.mvn', 'wrapper');

  try {
    fs.mkdirSync(path.join(OUTPUT_DIR, '.mvn', 'wrapper'), { recursive: true });
    const mavenWrapperFilePath = path.join(mavenWrapperDirPath, 'maven-wrapper.properties');
    const mavenWrapperDestFilePath = path.join(mavenWrapperDestDirPath, 'maven-wrapper.properties');

    fs.copyFileSync(mavenWrapperFilePath, mavenWrapperDestFilePath);
    console.log(`Copied: maven-wrapper.properties to ${mavenWrapperDestFilePath}`);
  } catch (error) {
    console.error('Error copying Maven wrapper files:', error);
  }
}
