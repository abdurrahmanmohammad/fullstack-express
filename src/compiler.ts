import * as fs from "fs";
import * as path from "path";
import { initializePaths, INPUT_JSON_PATH } from "./constants";
import { compileModels } from "./compiler/model_compiler";
import { compileSetup } from "./compiler/setup_compiler";
import { compileRepositories } from "./compiler/repository_compiler";
import { cleanup } from "./cleanup_compiler";
import { compileService } from "./compiler/service_compiler";
import { compileController } from "./compiler/controller_compiler";
import { compileNavbar } from "./compiler/navbar_compiler";
import { setupFrontend } from "./compiler/setup_frontend_compiler";
import { compilePages } from "./compiler/page_compiler";

// Initialize global paths
initializePaths(path.join(__dirname, ".."));

// Remove old output files
cleanup();

// Read and parse input.json
const inputData = JSON.parse(fs.readFileSync(INPUT_JSON_PATH, "utf8"));

// Separate setup and model objects
const setupObject = inputData.find((obj: any) => obj.object === "Setup");
const modelObjects = inputData.filter((obj: any) => obj.object !== "Setup");

// === Backend Compilation ===
compileSetup(setupObject);
compileModels(modelObjects);
compileRepositories(modelObjects);
compileService(modelObjects);
compileController(modelObjects);

// === Frontend Compilation ===
setupFrontend(); // Copies all template files into /frontend
compileNavbar(modelObjects); // Generates the navbar using model object names
compilePages(inputData); // Compile pages
