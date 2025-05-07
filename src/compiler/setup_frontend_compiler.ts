import fs from "fs";
import path from "path";
import {
  frontendFiles,
  frontendFolders,
  frontendRoot,
  frontendTemplateRoot,
} from "./frontend_constants";

export function setupFrontend() {
  // Delete old frontend folder
  if (fs.existsSync(frontendRoot)) {
    fs.rmSync(frontendRoot, { recursive: true, force: true });
  }

  // Recreate frontend folder and subfolders
  fs.mkdirSync(frontendRoot);
  for (const folder of frontendFolders) {
    fs.mkdirSync(path.join(frontendRoot, folder), { recursive: true });
  }

  // Copy files from templates to frontend
  for (const filePath of frontendFiles) {
    const src = path.join(frontendTemplateRoot, filePath);
    const dest = path.join(frontendRoot, filePath);
    fs.copyFileSync(src, dest);
  }

  console.log("✅ Frontend scaffolded successfully.");
}
