import * as fs from "fs";
import * as path from "path";
import {
  TEMPLATE_DIR,
  APPLICATION_DIR,
  APPLICATION_FILES_DIR,
} from "../constants";

// Function to capitalize the first letter of a string (for class names and methods)
function capitalize(str: string): string {
  if (typeof str !== "string") {
    throw new Error(`Expected a string, but received: ${typeof str}`);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to generate a plural form of a model name for the controller URL
function pluralize(modelName: string): string {
  return modelName.endsWith("s") ? modelName : `${modelName}s`;
}

// Function to compile the controller for each model
export function compileController(modelObjects: any[]) {
  // Read the controller template
  const controllerTemplatePath = path.join(TEMPLATE_DIR, "ControllerTemplate");
  let controllerTemplate = fs.readFileSync(controllerTemplatePath, "utf8");

  const controllersOutputDir = path.join(APPLICATION_FILES_DIR, "controller");
  fs.mkdirSync(controllersOutputDir, { recursive: true });

  // Loop through all the model objects and generate a controller class for each
  modelObjects.forEach((obj) => {
    const className = capitalize(obj.object); // Model name as class name (e.g., Course -> CourseController)
    const lowercaseModelName = obj.object.toLowerCase(); // Model name in lowercase for variable names (e.g., course -> courseService)
    const modelNamePlural = pluralize(lowercaseModelName); // Pluralize the model name (e.g., courses)

    // Replace placeholders in the controller template
    let controllerClassContent = controllerTemplate
      .replace(/{{ModelName}}/g, className) // Replace ModelName with the actual model class name (e.g., Course)
      .replace(/{{modelName}}/g, lowercaseModelName) // Replace modelName with lowercase variable name (e.g., course)
      .replace(/{{modelNamePlural}}/g, modelNamePlural) // Replace modelNamePlural with plural URL part (e.g., courses)
      .replace(/{{ApplicationDirectory}}/g, APPLICATION_DIR); // Replace the application directory placeholder

    // Output file path for the generated controller class
    const controllerOutputPath = path.join(
      controllersOutputDir,
      `${className}Controller.java`
    );

    // Write the generated controller class to the output directory
    fs.writeFileSync(controllerOutputPath, controllerClassContent, "utf8");
    console.log(
      `Generated controller for ${className}: ${controllerOutputPath}`
    );
  });
}
