// src/compiler/pom_compiler.ts
import * as fs from 'fs';
import * as path from 'path';
import { TEMPLATE_DIR, OUTPUT_DIR } from '../../constants';

export function compilePom(setupConfig: any) {
  const pomTemplatePath = path.join(TEMPLATE_DIR, 'pom.xml');
  let pomTemplate = fs.readFileSync(pomTemplatePath, 'utf8');

  pomTemplate = pomTemplate
    .replace(/{{APP_NAME}}/g, setupConfig.app_name)
    .replace(/{{JAVA_VERSION}}/g, setupConfig.java_version);

  const pomOutputPath = path.join(OUTPUT_DIR, 'pom.xml');
  fs.writeFileSync(pomOutputPath, pomTemplate, 'utf8');
  console.log(`Generated: ${pomOutputPath}`);
}
