// src/compiler/main_application_compiler.ts
import * as fs from "fs";
import * as path from "path";
import {
  TEMPLATE_DIR,
  APPLICATION_FILES_DIR,
  APPLICATION_DIR,
} from "../../constants";

function readTemplate(fileName: string): string {
  const filePath = path.join(TEMPLATE_DIR, fileName);
  return fs.readFileSync(filePath, "utf8");
}

function writeOutput(fileName: string, content: string) {
  const outputPath = path.join(APPLICATION_FILES_DIR, fileName);
  fs.writeFileSync(outputPath, content, "utf8");
  console.log(`Generated: ${outputPath}`);
}

export function compileMainApplication(setupConfig: any) {
  const appNameCapitalized =
    setupConfig.app_name.charAt(0).toUpperCase() +
    setupConfig.app_name.slice(1);

  const demoAppTemplate = readTemplate("TemplateApplication")
    .replace("{{ApplicationDirectory}}", APPLICATION_DIR)
    .replace(/{{AppName}}/g, appNameCapitalized);

  const webConfigTemplate = readTemplate("WebConfig").replace(
    "{{ApplicationDirectory}}",
    APPLICATION_DIR
  );

  fs.mkdirSync(APPLICATION_FILES_DIR, { recursive: true });

  writeOutput("DemoApplication.java", demoAppTemplate);
  writeOutput("WebConfig.java", webConfigTemplate);
}
