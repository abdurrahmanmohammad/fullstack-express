import * as fs from "fs";
import * as path from "path";
import {
  APPLICATION_DIR,
  APPLICATION_FILES_DIR,
  TEMPLATE_DIR,
} from "../constants";

export function compileRepositories(models: any[]) {
  const templatePath = path.join(TEMPLATE_DIR, "RepositoryTemplate");
  const template = fs.readFileSync(templatePath, "utf8");

  const repositoriesOutputDir = path.join(APPLICATION_FILES_DIR, "repository");
  fs.mkdirSync(repositoriesOutputDir, { recursive: true });

  models.forEach((model: any) => {
    const className = capitalize(model.object);
    const repositoryContent = template
      .replace(/{{ApplicationDirectory}}/g, APPLICATION_DIR)
      .replace(/{{ClassName}}/g, className);

    const outputPath = path.join(
      repositoriesOutputDir,
      `${className}Repository.java`
    );
    fs.writeFileSync(outputPath, repositoryContent, "utf8");
    console.log(`Generated repository: ${outputPath}`);
  });
}

// Capitalize the first letter of the class name
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
