import * as fs from "fs";
import * as path from "path";
import { APPLICATION_DIR, TEMPLATE_DIR, TEST_FILES_DIR } from "../../constants";

export function compileTestFiles(setupConfig: any) {
  // Step 1: Read the test file template
  const testTemplatePath = path.join(TEMPLATE_DIR, "TemplateApplicationTests");
  let testTemplate = fs.readFileSync(testTemplatePath, "utf8");

  // Replace the placeholder with the application name
  testTemplate = testTemplate
    .replace(/{{ApplicationDirectory}}/g, APPLICATION_DIR)
    .replace(
      /{{AppName}}/g,
      setupConfig.app_name.charAt(0).toUpperCase() +
        setupConfig.app_name.slice(1)
    );

  // Step 2: Generate the output file path for the test class
  const testOutputPath = path.join(
    TEST_FILES_DIR,
    `${
      setupConfig.app_name.charAt(0).toUpperCase() +
      setupConfig.app_name.slice(1)
    }ApplicationTests.java`
  );

  // Create the output directory if it doesn't exist
  fs.mkdirSync(TEST_FILES_DIR, { recursive: true });

  // Step 3: Write the generated test class to the output folder
  fs.writeFileSync(testOutputPath, testTemplate, "utf8");
  console.log(`Generated test file: ${testOutputPath}`);
}
