import { setApplicationName } from "../constants";
import { compileApplicationProperties } from "./setup_compiler/application_properties_compiler";
import { compileMainApplication } from "./setup_compiler/main_application_compiler";
import { compilePom } from "./setup_compiler/pom_compiler";
import {
  copyStaticFiles,
  copyMavenWrapper,
} from "./setup_compiler/static_files_compiler";
import { compileTestFiles } from "./setup_compiler/test_files_compiler";

export function compileSetup(setupConfig: any) {
  setApplicationName(setupConfig.app_name);

  // Step 1: Generate application.properties
  compileApplicationProperties(setupConfig);

  // Step 2: Generate DemoApplication.java
  compileMainApplication(setupConfig);

  // Step 3: Generate pom.xml
  compilePom(setupConfig);

  // Step 4: Copy mvnw, mvnw.cmd, and .mvn/wrapper files
  copyMavenWrapper();

  // Step 5: Copy static files like .gitattributes, .gitignore, HELP.md
  copyStaticFiles();

  // Step 6: Copy static files like .gitattributes, .gitignore, HELP.md
  compileTestFiles(setupConfig);
}
