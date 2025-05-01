import * as fs from "fs";
import * as path from "path";
import { TEMPLATE_DIR, APPLICATION_DIR, APPLICATION_FILES_DIR } from "../constants";

// Function to capitalize the first letter of a string (for class names and methods)
function capitalize(str: string): string {
  if (typeof str !== "string") {
    throw new Error(`Expected a string, but received: ${typeof str}`);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to generate the update statements for each field dynamically
function generateFieldUpdateStatements(fields: Record<string, string>, modelName: string): string {
  return Object.keys(fields)
    .map((field) => {
      const capitalizedField = capitalize(field); // Capitalize the field for setter and getter methods
      return `${modelName}.set${capitalizedField}(
        updated${capitalize(modelName)}.get${capitalizedField}());`;
    })
    .join("\n");
}

// Function to compile the service for each model
export function compileService(modelObjects: any[]) {
  // Read the service template
  const serviceTemplatePath = path.join(TEMPLATE_DIR, "ServiceTemplate");
  let serviceTemplate = fs.readFileSync(serviceTemplatePath, "utf8");

  const servicesOutputDir = path.join(APPLICATION_FILES_DIR, "service");
  fs.mkdirSync(servicesOutputDir, { recursive: true });

  // Loop through all the model objects and generate a service class for each
  modelObjects.forEach((obj) => {
    const className = capitalize(obj.object); // Model name as class name (e.g., Course -> CourseService)
    const lowercaseModelName = obj.object.toLowerCase(); // Model name in lowercase for variable names (e.g., course -> courseRepository)

    // Generate the fields' CRUD operations (Create, Read, Update, Delete) dynamically based on the fields of the object
    const fields = obj.fields;

    // Generate the field update statements for the update method
    const fieldUpdateStatements = generateFieldUpdateStatements(fields, lowercaseModelName);

    // Replace placeholders in the service template
    let serviceClassContent = serviceTemplate
      .replace(/{{ModelName}}/g, className) // Replace ModelName with the actual model class name (e.g., Course)
      .replace(/{{modelName}}/g, lowercaseModelName) // Replace modelName with lowercase variable name (e.g., course)
      .replace(/{{ApplicationDirectory}}/g, APPLICATION_DIR) // Replace the application directory placeholder
      .replace(/{{FieldUpdateStatements}}/g, fieldUpdateStatements); // Replace update field statements

    // Output file path for the generated service class
    const serviceOutputPath = path.join(servicesOutputDir, `${className}Service.java`);

    // Write the generated service class to the output directory
    fs.writeFileSync(serviceOutputPath, serviceClassContent, "utf8");
    console.log(`Generated service for ${className}: ${serviceOutputPath}`);
  });
}
