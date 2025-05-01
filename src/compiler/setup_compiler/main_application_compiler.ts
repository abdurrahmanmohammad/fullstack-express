// src/compiler/main_application_compiler.ts
import * as fs from "fs";
import * as path from "path";
import {
  TEMPLATE_DIR,
  APPLICATION_FILES_DIR,
  APPLICATION_DIR,
} from "../../constants";

export function compileMainApplication(setupConfig: any) {
  const demoAppTemplatePath = path.join(TEMPLATE_DIR, "TemplateApplication");
  let demoAppTemplate = fs.readFileSync(demoAppTemplatePath, "utf8");

  demoAppTemplate = demoAppTemplate
    .replace("{{ApplicationDirectory}}", APPLICATION_DIR)
    .replace(
      /{{AppName}}/g,
      setupConfig.app_name.charAt(0).toUpperCase() +
        setupConfig.app_name.slice(1)
    );

  fs.mkdirSync(APPLICATION_FILES_DIR, { recursive: true });
  const demoAppOutputPath = path.join(
    APPLICATION_FILES_DIR,
    "DemoApplication.java"
  );
  fs.writeFileSync(demoAppOutputPath, demoAppTemplate, "utf8");
  console.log(`Generated: ${demoAppOutputPath}`);
}
