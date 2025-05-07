import * as fs from "fs";
import * as path from "path";
import { frontendRoot, frontendTemplateRoot } from "./frontend_constants";

// Capitalizes the first letter of a string
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function compilePages(inputData: any[]) {
  const templatePath = path.join(
    frontendTemplateRoot,
    "app/_components/page.tsx"
  );

  if (!fs.existsSync(templatePath)) {
    console.error("❌ Page template not found at:", templatePath);
    return;
  }

  const template = fs.readFileSync(templatePath, "utf8");

  inputData.forEach((obj) => {
    if (obj.object === "Setup") return;

    const modelName = capitalize(obj.object); // e.g., Course -> CoursePage
    const endpoint = obj.object.toLowerCase(); // e.g., course -> courses
    const modelNamePlural = endpoint + "s"; // e.g., course -> courses

    const compiled = template
      .replace(/{{ModelName}}/g, modelName)
      .replace(/{{ModelNamePlural}}/g, modelNamePlural)
      .replace(/{{endpoint}}/g, endpoint);

    const modelDir = path.join(frontendRoot, "app", modelNamePlural);
    const outputPath = path.join(modelDir, "page.tsx");

    fs.mkdirSync(modelDir, { recursive: true });
    fs.writeFileSync(outputPath, compiled, "utf8");

    console.log(`✅ Page for ${modelName} compiled to: ${outputPath}`);
  });
}
