import * as fs from "fs";
import * as path from "path";
import { initializePaths, INPUT_JSON_PATH } from "./constants";
import { compileModels } from "./compiler/model_compiler";
import { compileSetup } from "./compiler/setup_compiler";
import { compileRepositories } from "./compiler/repository_compiler";
import { cleanup } from "./cleanup_compiler";
import { compileService } from "./compiler/service_compiler";
import { compileController } from "./compiler/controller_compiler";

// Initialize global paths
initializePaths(path.join(__dirname, ".."));

// Remove old output files
cleanup();

// Read and parse input.json
const inputData = JSON.parse(fs.readFileSync(INPUT_JSON_PATH, "utf8"));
// Separate setup and model objects
const setupObject = inputData.find((obj: any) => obj.object === "Setup");
// Filter out the "Setup" config object
const modelObjects = inputData.filter((obj: any) => obj.object !== "Setup");

// Call the setup_compiler
compileSetup(setupObject);
// Call the model_compiler
compileModels(modelObjects);
// model_compiler
compileRepositories(modelObjects);

compileService(modelObjects);

compileController(modelObjects);

// repository_compiler
// service_compiler
// controller_compiler
