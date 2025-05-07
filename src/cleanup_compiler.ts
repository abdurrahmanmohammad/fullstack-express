import * as fs from "fs";
import { FRONTEND_OUTPUT_DIR, OUTPUT_DIR } from "./constants";

// Function to clean up the output directory
export function cleanup() {
  // Check if the output directory exists
  if (fs.existsSync(OUTPUT_DIR)) {
    // Remove the output directory and all its contents
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    console.log(`Cleaned up: ${OUTPUT_DIR}`);
    // Remove the frontend directory and all its contents
    fs.rmSync(FRONTEND_OUTPUT_DIR, { recursive: true, force: true });
    console.log(`Cleaned up: ${FRONTEND_OUTPUT_DIR}`);
  } else {
    console.log("No output directory to clean.");
  }
}
