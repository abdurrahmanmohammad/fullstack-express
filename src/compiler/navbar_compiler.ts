import * as fs from "fs";
import * as path from "path";
import { frontendRoot, frontendTemplateRoot } from "./frontend_constants";

// Capitalizes the first letter of a string
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function compileNavbar(inputData: any[]) {
  const templatePath = path.join(
    frontendTemplateRoot,
    "app/_components/navbar.tsx"
  );

  if (!fs.existsSync(templatePath)) {
    console.error("❌ Template not found:", templatePath);
    return;
  }

  const template = fs.readFileSync(templatePath, "utf8");

  const modelObjects = inputData.filter((obj) => obj.object !== "Setup");

  const navLinksString = modelObjects
    .map((obj) => {
      const plural = obj.object.toLowerCase() + "s"; // e.g., course -> courses
      const name = capitalize(plural); // e.g., Courses
      const href = `/${plural}`; // e.g., /courses
      return `{ name: "${name}", href: "${href}" }`;
    })
    .join(",\n  ");

  const compiledNavbar = template.replace("{{navLinks}}", navLinksString);

  const outputPath = path.join(
    frontendRoot,
    "app",
    "_components",
    "Navbar.tsx"
  );

  console.log("🛠 Writing Navbar to:", outputPath);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, compiledNavbar, "utf8");

  console.log("✅ Navbar compiled to:", outputPath);
}
