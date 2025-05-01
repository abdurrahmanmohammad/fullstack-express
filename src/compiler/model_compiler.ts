import * as fs from "fs";
import * as path from "path";
import {
  TEMPLATE_DIR,
  APPLICATION_DIR,
  APPLICATION_FILES_DIR,
} from "../constants";

// Define the primitive types (adjust this list as needed)
const primitiveTypes = [
  "int",
  "String",
  "boolean",
  "long",
  "float",
  "double",
  "char",
];

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateFields(fields: Record<string, string>): string {
  return Object.entries(fields)
    .map(([name, type]) => {
      // Check if the type is a primitive type
      if (primitiveTypes.includes(type)) {
        return `    private ${type} ${name};`;
      }
      // Check if the type is a collection (List<T>)
      else if (type.startsWith("List<")) {
        const collectionType = type.slice(5, -1); // Extract the type inside List<> (e.g., Course)
        return `    @ManyToMany private List<${collectionType}> ${name};`.trim();
      }
      // Otherwise, treat it as a non-primitive type (like Course, Teacher, etc.)
      else {
        return `    @OneToOne private ${type} ${name};`.trim();
      }
    })
    .join("\n");
}

export function compileModels(objects: any[]) {
  const templatePath = path.join(TEMPLATE_DIR, "ModelTemplate");
  const template = fs.readFileSync(templatePath, "utf8");

  const modelsOutputDir = path.join(APPLICATION_FILES_DIR, "model");
  fs.mkdirSync(modelsOutputDir, { recursive: true });

  for (const obj of objects) {
    const className = capitalize(obj.object);
    const fields = generateFields(obj.fields);

    const classContent = template
      .replace("{{ApplicationDirectory}}", APPLICATION_DIR)
      .replace("{{ClassName}}", className)
      .replace("{{Fields}}", fields);

    const outputPath = path.join(modelsOutputDir, `${className}.java`);
    fs.writeFileSync(outputPath, classContent, "utf8");
    console.log(`Generated model: ${outputPath}`);
  }
}
